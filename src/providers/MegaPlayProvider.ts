import { BaseProvider, CallOptions } from './BaseProvider';
import { z } from 'zod';
import { HttpClient } from '../transport/http';
import { DomRegistry } from '../transport/dom';
import { aesDecrypt } from '../utils/crypto';
import {
  IMediaSearchResult,
  IContentUnit,
  IMediaMappings,
  ResolvedMediaStream,
  MediaCatalogType,
  ContentLanguage,
  IVideoPayload,
  ISubtitleTrack,
} from '@/types';
import { parseJson } from '../utils/validation';
import {
  AniListMediaEpisodesDocument,
  AniListSearchDocument,
} from '../graphql/anilist/generated/graphql';
import { postGraphQL } from '../graphql/request';

export interface MegaPlayOptions {
  baseUrl?: string;
}

interface MegaPlaySourceTrack {
  file: string;
  label: string;
  kind: string;
}

interface MegaPlaySource {
  file: string;
  tracks: MegaPlaySourceTrack[];
}

const megaPlayTrackSchema = z.object({
  file: z.string(),
  label: z.string(),
  kind: z.string(),
});

const megaPlayPayloadSchema = z.object({
  sources: z
    .object({
      file: z.string().optional(),
    })
    .optional(),
  enc: z.string().optional(),
  tracks: z.array(megaPlayTrackSchema).optional(),
});

const megaPlayDecryptedSourceSchema = z.object({
  file: z.string(),
});

const megaPlayEncryptionKey = 'i?LMTAx0Q6,:}50U' + '\0'.repeat(16);
const megaPlayEncryptionIv = "W0;27ToaUpl_P%'c";

export function extractMegaPlayFileId(embedPage: string): string | null {
  return (
    embedPage.match(/\bdata-id=["'](\d+)["']/i)?.[1] ??
    embedPage.match(/File\s+(\d+)\s+-/i)?.[1] ??
    null
  );
}

/** Parse both the legacy clear source and current encrypted MegaPlay payloads. */
export async function parseMegaPlaySource(
  payload: unknown,
): Promise<MegaPlaySource | null> {
  const parsed = megaPlayPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return null;
  }

  let file = parsed.data.sources?.file;

  if (!file && parsed.data.enc) {
    try {
      const base64 = parsed.data.enc.replace(/-/g, '+').replace(/_/g, '/');
      const decrypted = await aesDecrypt(
        base64 + '='.repeat((4 - (base64.length % 4)) % 4),
        megaPlayEncryptionKey,
        megaPlayEncryptionIv,
      );
      file = megaPlayDecryptedSourceSchema.parse(JSON.parse(decrypted)).file;
    } catch {
      return null;
    }
  }

  if (!file) {
    return null;
  }

  return {
    file,
    tracks: parsed.data.tracks ?? [],
  };
}

export class MegaPlayProvider extends BaseProvider {
  public override readonly id = 'megaplay';
  public readonly name = 'MegaPlay';
  public override readonly supportedTypes: MediaCatalogType[] = ['ANIME'];

  /**
   * MegaPlay indexes its catalogue by AniList ID directly — its internal
   * `mediaId` IS the AniList ID. Surface that to `MappingClient` so it
   * can skip MALSync/Anify/fuzzy entirely when the meta record knows the
   * AniList ID.
   */
  public override async lookupByMapping(
    mappings: IMediaMappings,
  ): Promise<string | null> {
    return mappings.anilist != null ? String(mappings.anilist) : null;
  }

  private readonly baseUrl: string;
  private readonly anilistApi = 'https://graphql.anilist.co';

  constructor(http: HttpClient, options: MegaPlayOptions = {}) {
    super(http);
    this.baseUrl = options.baseUrl || 'https://megaplay.buzz';
    if (!this.http.getDefaultHeaders()['User-Agent']) {
      this.http.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      );
    }
  }

  protected override async searchRaw(
    query: string,
    options: CallOptions = {},
  ): Promise<IMediaSearchResult[]> {
    const { response, body } = await postGraphQL(
      this.http,
      this.anilistApi,
      AniListSearchDocument,
      {
        search: query,
        perPage: 15,
        type: 'ANIME',
      },
      {
        signal: options.signal,
      },
    );

    if (response.status !== 200 || !body.data?.Page) {
      return [];
    }

    return (body.data.Page.media ?? [])
      .filter((media) => media !== null)
      .map((media): IMediaSearchResult => ({
        id: String(media.id),
        title: media.title?.english ?? media.title?.romaji ?? String(media.id),
        thumbnailUrl: media.coverImage?.large ?? undefined,
        catalogType: 'ANIME',
        providerId: this.id,
      }));
  }

  protected override async fetchContentUnitsRaw(
    mediaId: string,
    options: CallOptions = {},
  ): Promise<IContentUnit[]> {
    // Fetch episode count from AniList if not provided
    const { body } = await postGraphQL(
      this.http,
      this.anilistApi,
      AniListMediaEpisodesDocument,
      { id: parseInt(mediaId) },
      {
        signal: options.signal,
      },
    );

    const episodesCount = body.data?.Media?.episodes ?? 1;

    const units: IContentUnit[] = [];
    for (let i = 1; i <= episodesCount; i++) {
      units.push({
        id: `${mediaId}:${i}`,
        title: `Episode ${i}`,
        number: i,
        availableLanguages: ['sub', 'dub'],
      });
    }

    return units;
  }

  protected override async resolveStreamRaw(
    unitId: string,
    language: ContentLanguage = 'sub',
    options: CallOptions = {},
  ): Promise<ResolvedMediaStream> {
    const [aniId, epNum] = unitId.split(':');
    const embedUrl = `${this.baseUrl}/stream/ani/${aniId}/${epNum}/${language}`;

    // Step 1: Fetch the embed page to get the file ID
    // Note: referer is important for some endpoints
    const embedResponse = await this.http.get(embedUrl, {
      signal: options.signal,
      headers: {
        Referer: this.baseUrl,
      },
    });
    const embedPage = await embedResponse.text();

    if (embedPage.includes('<title>Error - MegaPlay</title>')) {
      throw new Error(
        `MegaPlay has no mapping for AniList ID ${aniId} episode ${epNum} (${language})`,
      );
    }

    // The file ID is in the title: <title>File 174608 - MegaPlay</title>
    const fileId = extractMegaPlayFileId(embedPage);
    if (!fileId) {
      throw new Error('Could not find file ID on megaplay embed page');
    }

    // Step 2: Fetch the sources using the file ID
    const sourcesResponse = await this.http.get(
      `${this.baseUrl}/stream/getSources?id=${fileId}`,
      {
        signal: options.signal,
        headers: {
          Referer: `${this.baseUrl}/stream/ani/${aniId}/${epNum}/${language}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      },
    );

    const source = await parseMegaPlaySource(await sourcesResponse.json());
    if (!source) {
      throw new Error('No video sources found in megaplay response');
    }

    const streams: IVideoPayload[] = [
      {
        sourceUrl: source.file,
        isHLS: source.file.includes('.m3u8'),
        quality: 'auto',
        language,
        headers: {
          Referer: `${this.baseUrl}/`,
        },
      },
    ];

    const subtitles: ISubtitleTrack[] = source.tracks
      .filter((track) => track.kind === 'captions')
      .map((track) => ({
        url: track.file,
        label: track.label,
        language: track.label.toLowerCase(),
        format: track.file.endsWith('.vtt') ? 'vtt' : 'srt',
      }));

    if (subtitles.length > 0) {
      streams[0].subtitles = subtitles;
    }

    return {
      type: 'video',
      streams,
    };
  }
}
