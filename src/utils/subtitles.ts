import * as crypto from 'node:crypto';
import { z } from 'zod';
import { ISubtitleTrack } from '@/types';

const LABEL_TO_BCP47: Record<string, string> = {
  english: 'en',
  portuguese: 'pt',
  'portuguese-brazil': 'pt-BR',
  spanish: 'es',
  italian: 'it',
  french: 'fr',
  german: 'de',
  japanese: 'ja',
  arabic: 'ar',
  russian: 'ru',
  chinese: 'zh',
  korean: 'ko',
  dutch: 'nl',
  polish: 'pl',
  turkish: 'tr',
  indonesian: 'id',
  thai: 'th',
  vietnamese: 'vi',
};
const subtitleUrlSchema = z
  .string()
  .url()
  .refine((value) => /^https?:\/\//i.test(value));
const subtitleLabelSchema = z.string().trim().min(1);
const subtitleLanguageSchema = z.string().trim().min(1);
const subtitleFormatSchema = z.enum(['vtt', 'srt', 'ass']);

/**
 * Normalize whatever a provider hands us into `ISubtitleTrack[]`. We accept
 * any shape with `src`/`url`, `label`, and `type`/`format`; entries whose URL
 * isn't an `http(s)` URL get dropped (they're typically auth-walled identifiers
 * like Google Drive IDs, which can't be fetched server-side).
 */
export function normalizeSubtitleEntries(entries: unknown): ISubtitleTrack[] {
  if (!Array.isArray(entries)) {
    return [];
  }
  const out: ISubtitleTrack[] = [];
  for (const item of entries) {
    const recordResult = z.record(z.string(), z.unknown()).safeParse(item);
    if (!recordResult.success) {
      continue;
    }
    const rec = recordResult.data;
    const rawUrl = rec.url ?? rec.src ?? rec.file;
    const urlResult = subtitleUrlSchema.safeParse(rawUrl);
    if (!urlResult.success) {
      continue;
    }
    const url = urlResult.data;

    const rawLabel = rec.label ?? rec.name ?? rec.language;
    const labelResult = subtitleLabelSchema.safeParse(rawLabel);
    const label = labelResult.success ? labelResult.data : 'Unknown';

    const rawType = rec.format ?? rec.type;
    const typeResult = subtitleFormatSchema.safeParse(rawType);
    const format: ISubtitleTrack['format'] | undefined = typeResult.success
      ? typeResult.data
      : inferFormatFromUrl(url);
    const languageResult = subtitleLanguageSchema.safeParse(rec.language);

    out.push({
      url,
      label,
      language: languageResult.success
        ? languageResult.data
        : (LABEL_TO_BCP47[label.toLowerCase()] ??
          label.slice(0, 2).toLowerCase()),
      ...(format
        ? {
            format,
          }
        : {}),
    });
  }
  return out;
}

function inferFormatFromUrl(url: string): ISubtitleTrack['format'] | undefined {
  const path = url.split('?')[0].toLowerCase();
  if (path.endsWith('.vtt')) {
    return 'vtt';
  }
  if (path.endsWith('.srt')) {
    return 'srt';
  }
  if (path.endsWith('.ass') || path.endsWith('.ssa')) {
    return 'ass';
  }
  return undefined;
}

export interface ProxifySubtitleOptions {
  /** Optional headers the proxy should attach when fetching upstream. */
  headers?: Record<string, string>;
  /** Override Content-Type on the proxy response (defaults to `text/vtt` for VTT). */
  contentType?: string;
  /**
   * When set, append an HMAC-SHA256 `sig` parameter computed over `url`
   * (and `h=` payload, when present) keyed by this secret. Matches the
   * scheme used by the server's `/proxy` endpoint when `proxySignSecret`
   * is configured.
   */
  signSecret?: string;
}

/**
 * Wrap a subtitle URL to flow through the SDK's `/proxy` endpoint.
 *
 * This is the same encoding `startServer({ proxy: true })` uses internally;
 * exported so consumers that run their own HTTP layer (or call `resolveStream`
 * directly in Node) can rewrite subtitle URLs the same way.
 */
export function proxifySubtitleUrl(
  proxyBase: string,
  track: ISubtitleTrack,
  options: ProxifySubtitleOptions = {},
): string {
  const ct =
    options.contentType ??
    (track.format === 'vtt' ||
    (!track.format && /\.vtt(?:\?|$)/i.test(track.url))
      ? 'text/vtt'
      : undefined);
  const hParam =
    options.headers && Object.keys(options.headers).length > 0
      ? Buffer.from(JSON.stringify(options.headers)).toString('base64')
      : undefined;
  const parts = [`url=${encodeURIComponent(track.url)}`];
  if (ct) {
    parts.push(`ct=${encodeURIComponent(ct)}`);
  }
  if (hParam) {
    parts.push(`h=${encodeURIComponent(hParam)}`);
  }
  if (options.signSecret) {
    const h = crypto.createHmac('sha256', options.signSecret);
    h.update(track.url);
    if (hParam) {
      h.update('|h=' + hParam);
    }
    parts.push(`sig=${h.digest('hex')}`);
  }
  return `${proxyBase}?${parts.join('&')}`;
}
