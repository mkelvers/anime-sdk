import { BaseProvider, CallOptions } from './BaseProvider';
import { z } from 'zod';
import { HttpClient } from '../transport/http';
import {
  IMediaSearchResult,
  IContentUnit,
  ResolvedMediaStream,
  MediaCatalogType,
  IUnitTracks,
} from '../types/index';
import { normalizeSubtitleEntries } from '../utils/subtitles';
import { parseJson } from '../utils/validation';

const API_BASE = 'https://api.animeparadise.moe';
const STREAM_BASE = 'https://stream.animeparadise.moe';

const animeParadiseSearchResponseSchema = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      title: z.string(),
      alternativeTitle: z
        .object({
          english: z.string().nullish(),
        })
        .nullish(),
      posterImage: z
        .object({
          medium: z.string().nullish(),
          large: z.string().nullish(),
        })
        .nullish(),
      year: z.number().nullish(),
      released: z.string().nullish(),
    }),
  ),
});

const animeParadiseEpisodesResponseSchema = z.object({
  data: z.array(
    z.object({
      uid: z.string(),
      title: z.string().nullish(),
      number: z.coerce.number(),
    }),
  ),
});

const animeParadiseEpisodeResponseSchema = z.object({
  data: z
    .object({
      episode: z
        .object({
          streamLink: z.string().nullish(),
          subData: z.unknown().optional(),
        })
        .nullish(),
    })
    .nullish(),
});

export class AnimeParadiseProvider extends BaseProvider {
  public readonly id = 'animeparadise';
  public readonly supportedTypes: MediaCatalogType[] = ['ANIME'];

  constructor(http: HttpClient) {
    super(http);
  }

  protected async searchRaw(
    query: string,
    options: CallOptions = {},
  ): Promise<IMediaSearchResult[]> {
    const response = await this.http.get(
      `${API_BASE}/search?q=${encodeURIComponent(query)}&limit=20`,
      {
        signal: options.signal,
      },
    );
    const json = await parseJson(response, animeParadiseSearchResponseSchema);
    const items = json.data;
    return items.map((item) => ({
      id: item._id,
      title: item.alternativeTitle?.english ?? item.title,
      thumbnailUrl:
        item.posterImage?.medium ?? item.posterImage?.large ?? undefined,
      catalogType: 'ANIME' as const,
      providerId: this.id,
      year:
        item.year ??
        (item.released ? new Date(item.released).getUTCFullYear() : undefined),
    }));
  }

  protected async fetchContentUnitsRaw(
    mediaId: string,
    options: CallOptions = {},
  ): Promise<IContentUnit[]> {
    const response = await this.http.get(
      `${API_BASE}/anime/${mediaId}/episode`,
      {
        signal: options.signal,
      },
    );
    const json = await parseJson(response, animeParadiseEpisodesResponseSchema);
    const episodes = json.data;
    return episodes.map((ep) => ({
      // encode uid and animeId so resolveStream can call /ep/{uid}?origin={animeId}
      id: `${ep.uid}:${mediaId}`,
      title: ep.title ?? `Episode ${ep.number}`,
      number: ep.number,
      availableLanguages: ['sub'] as const,
    }));
  }

  protected async resolveStreamRaw(
    unitId: string,
    _language?: import('../types/index').ContentLanguage,
    options: CallOptions = {},
  ): Promise<ResolvedMediaStream> {
    const sep = unitId.lastIndexOf(':');
    if (sep < 0) {
      throw new Error(`AnimeParadise: invalid unitId "${unitId}"`);
    }
    const uid = unitId.slice(0, sep);
    const animeId = unitId.slice(sep + 1);

    const response = await this.http.get(
      `${API_BASE}/ep/${uid}?origin=${animeId}`,
      {
        signal: options.signal,
      },
    );
    const json = await parseJson(response, animeParadiseEpisodeResponseSchema);
    const episode = json.data?.episode;
    if (!episode?.streamLink) {
      throw new Error('AnimeParadise: no streamLink in response');
    }

    const streamUrl = `${STREAM_BASE}/m3u8?url=${encodeURIComponent(episode.streamLink)}`;
    const subtitles = normalizeSubtitleEntries(episode.subData);

    return {
      type: 'video',
      streams: [
        {
          sourceUrl: streamUrl,
          isHLS: true,
          quality: 'auto',
          language: 'sub',
          headers: { Referer: 'https://animeparadise.moe/' },
          ...(subtitles.length > 0 ? { subtitles } : {}),
        },
      ],
    };
  }

  /**
   * Fetch the subtitle/quality availability for a unit without resolving the
   * stream itself. AnimeParadise exposes `subData` on the `/ep/:uid` response,
   * so this is one cheap round-trip — useful for populating a subtitle selector
   * before the user hits play.
   */
  protected async fetchUnitTracksRaw(
    unitId: string,
    _language?: import('../types/index').ContentLanguage,
    options: CallOptions = {},
  ): Promise<IUnitTracks> {
    const sep = unitId.lastIndexOf(':');
    if (sep < 0) {
      throw new Error(`AnimeParadise: invalid unitId "${unitId}"`);
    }
    const uid = unitId.slice(0, sep);
    const animeId = unitId.slice(sep + 1);

    const response = await this.http.get(
      `${API_BASE}/ep/${uid}?origin=${animeId}`,
      {
        signal: options.signal,
      },
    );
    const json = await parseJson(response, animeParadiseEpisodeResponseSchema);
    const subtitles = normalizeSubtitleEntries(json?.data?.episode?.subData);
    // AnimeParadise serves a single auto-ladder HLS manifest per episode — we
    // don't know the rendition list without fetching the master, so 'auto' is
    // the only signal we can give up-front.
    return {
      subtitles,
      qualities: ['auto'],
      headers: { Referer: 'https://animeparadise.moe/' },
    };
  }
}
