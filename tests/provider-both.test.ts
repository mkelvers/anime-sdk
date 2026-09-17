import { describe, expect, it } from 'vitest';
import { BaseProvider, CallOptions } from '../src/providers/BaseProvider';
import {
  ContentLanguage,
  IContentUnit,
  IMediaSearchResult,
  MediaCatalogType,
  ResolvedMediaStream,
} from '../src/types/index';

class TestProvider extends BaseProvider {
  public readonly id = 'test';
  public readonly supportedTypes: MediaCatalogType[] = ['ANIME'];

  constructor(private readonly failLanguage?: ContentLanguage) {
    super({} as never);
  }

  protected async searchRaw(_query: string): Promise<IMediaSearchResult[]> {
    return [];
  }

  protected async fetchContentUnitsRaw(
    _mediaId: string,
  ): Promise<IContentUnit[]> {
    return [];
  }

  protected async resolveStreamRaw(
    unitId: string,
    language: ContentLanguage = 'sub',
    _options?: CallOptions,
  ): Promise<ResolvedMediaStream> {
    if (language === this.failLanguage) {
      throw new Error(`${language} failed`);
    }

    return {
      type: 'video',
      streams: [
        {
          sourceUrl: `https://media.example.test/${unitId}/${language}.m3u8`,
          isHLS: true,
          quality: 'auto',
          language,
        },
      ],
    };
  }
}

describe('BaseProvider resolveStream', () => {
  it('resolves both languages into one grouped result', async () => {
    const streams = await new TestProvider().resolveStream(
      'test:episode',
      'both',
    );

    expect(streams.sub.type).toBe('video');
    expect(streams.dub.type).toBe('video');
    expect(streams.sub.streams[0].language).toBe('sub');
    expect(streams.dub.streams[0].language).toBe('dub');
  });

  it('returns null for a language that fails in both mode', async () => {
    const streams = await new TestProvider('dub').resolveStream(
      'test:episode',
      'both',
    );

    expect(streams.sub).not.toBeNull();
    expect(streams.dub).toBeNull();
  });
});
