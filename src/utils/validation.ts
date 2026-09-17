import { z } from 'zod';
import type { BrowseKind } from '../meta/BaseMetadataProvider';
import type { ContentLanguage, MediaCatalogType, MediaFormat, MediaSeason } from '../types/index';

/**
 * Runtime schemas for values that cross an SDK boundary.
 *
 * The public interfaces remain the readable TypeScript contract. These
 * schemas protect the same contract when values arrive from HTTP, JSON, or
 * query strings, where TypeScript types no longer exist at runtime.
 */
export const contentLanguageSchema = z.enum(['sub', 'dub', 'raw']);
export const browseKindSchema = z.enum(['trending', 'popular', 'seasonal', 'top']);
export const mediaCatalogTypeSchema = z.enum(['ANIME', 'MOVIE', 'TV', 'MANGA']);
export const mediaFormatSchema = z.enum([
  'TV',
  'TV_SHORT',
  'MOVIE',
  'SPECIAL',
  'OVA',
  'ONA',
  'MUSIC',
  'MANGA',
  'NOVEL',
  'ONE_SHOT',
  'UNKNOWN',
]);
export const mediaSeasonSchema = z.enum(['WINTER', 'SPRING', 'SUMMER', 'FALL']);

export const proxyHeadersSchema = z.record(z.string(), z.string());

export interface ParsedQueryValue<T> {
  value: T | undefined;
  error?: string;
}

/** Parse an optional query parameter without turning a client error into a cast. */
export function parseOptionalQueryValue<T>(
  name: string,
  raw: string | null,
  schema: z.ZodType<T>,
): ParsedQueryValue<T> {
  const result = schema.optional().safeParse(raw ?? undefined);
  if (!result.success) {
    return { value: undefined, error: `Param \`${name}\` has an invalid value` };
  }
  return { value: result.data };
}

/** Keep the relationship to the public interfaces explicit at call sites. */
export type ParsedContentLanguage = ContentLanguage;
export type ParsedBrowseKind = BrowseKind;
export type ParsedMediaCatalogType = MediaCatalogType;
export type ParsedMediaFormat = MediaFormat;
export type ParsedMediaSeason = MediaSeason;
