import { describe, expect, it } from 'vitest';
import {
  contentLanguageSchema,
  parseOptionalQueryValue,
  proxyHeadersSchema,
} from '../src/utils/validation';

describe('runtime validation', () => {
  it('accepts known optional query values and preserves missing values', () => {
    expect(
      parseOptionalQueryValue('language', 'dub', contentLanguageSchema),
    ).toEqual({
      value: 'dub',
    });
    expect(
      parseOptionalQueryValue('language', null, contentLanguageSchema),
    ).toEqual({
      value: undefined,
    });
  });

  it('rejects unknown query values instead of trusting a cast', () => {
    expect(
      parseOptionalQueryValue('language', 'admin', contentLanguageSchema),
    ).toEqual({
      value: undefined,
      error: 'Param `language` has an invalid value',
    });
  });

  it('only accepts string-to-string proxy headers', () => {
    expect(
      proxyHeadersSchema.safeParse({ Referer: 'https://example.test/' })
        .success,
    ).toBe(true);
    expect(proxyHeadersSchema.safeParse({ Range: 42 }).success).toBe(false);
    expect(proxyHeadersSchema.safeParse(['not headers']).success).toBe(false);
  });
});
