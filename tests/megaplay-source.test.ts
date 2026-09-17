import { describe, expect, it } from 'vitest';
import { aesEncrypt } from '../src/utils/crypto';
import {
  extractMegaPlayFileId,
  parseMegaPlaySource,
} from '../src/providers/MegaPlayProvider';

const key = 'i?LMTAx0Q6,:}50U' + '\0'.repeat(16);
const iv = "W0;27ToaUpl_P%'c";

describe('MegaPlay source payloads', () => {
  it('extracts the file ID from the current data-id embed markup', () => {
    expect(
      extractMegaPlayFileId('<div id="megaplay-player" data-id="18980"></div>'),
    ).toBe('18980');
  });

  it('parses the encrypted source payload returned by getSources', async () => {
    const encrypted = await aesEncrypt(
      JSON.stringify({
        file: 'https://media.example.test/episode/master.m3u8',
      }),
      key,
      iv,
    );
    const enc = encrypted
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await expect(parseMegaPlaySource({ enc, tracks: [] })).resolves.toEqual({
      file: 'https://media.example.test/episode/master.m3u8',
      tracks: [],
    });
  });
});
