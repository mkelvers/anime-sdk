/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type SearchInput = {
  allowAdult?: boolean | null | undefined;
  allowUnknown?: boolean | null | undefined;
  query?: string | null | undefined;
};

export type VaildCountryOriginEnumType = 'ALL';

export type VaildTranslationTypeEnumType = 'dub' | 'raw' | 'sub';

export type AllAnimeSearchQueryVariables = Exact<{
  search?: SearchInput | null | undefined;
  limit?: number | null | undefined;
  page?: number | null | undefined;
  countryOrigin?: VaildCountryOriginEnumType | null | undefined;
}>;

export type AllAnimeSearchQuery = {
  shows: {
    edges: Array<{
      __typename: 'ShowEdge';
      _id: string;
      name: string | null;
      englishName: string | null;
      availableEpisodes: unknown;
    }>;
  } | null;
};

export type AllAnimeShowQueryVariables = Exact<{
  showId: string;
}>;

export type AllAnimeShowQuery = {
  show: { _id: string; availableEpisodesDetail: unknown } | null;
};

export type AllAnimeEpisodeSourcesQueryVariables = Exact<{
  showId: string;
  translationType: VaildTranslationTypeEnumType;
  episodeString: string;
}>;

export type AllAnimeEpisodeSourcesQuery = {
  episode: { episodeString: string | null; sourceUrls: unknown } | null;
};

export const AllAnimeSearchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AllAnimeSearch' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SearchInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'countryOrigin' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'VaildCountryOriginEnumType' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shows' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'countryOrigin' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'countryOrigin' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'englishName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'availableEpisodes' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllAnimeSearchQuery, AllAnimeSearchQueryVariables>;
export const AllAnimeShowDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AllAnimeShow' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'showId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'show' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'showId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'availableEpisodesDetail' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllAnimeShowQuery, AllAnimeShowQueryVariables>;
export const AllAnimeEpisodeSourcesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AllAnimeEpisodeSources' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'showId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'translationType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'VaildTranslationTypeEnumType' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'episodeString' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'episode' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'showId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'showId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'translationType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'translationType' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'episodeString' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'episodeString' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'episodeString' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'sourceUrls' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AllAnimeEpisodeSourcesQuery,
  AllAnimeEpisodeSourcesQueryVariables
>;
