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
/** The role the character plays in the media */
export type CharacterRole =
  /** A background character in the media */
  | 'BACKGROUND'
  /** A primary character role in the media */
  | 'MAIN'
  /** A supporting character role in the media */
  | 'SUPPORTING';

export type ExternalLinkType = 'INFO' | 'SOCIAL' | 'STREAMING';

/** The format the media was released in */
export type MediaFormat =
  /** Professionally published manga with more than one chapter */
  | 'MANGA'
  /** Anime movies with a theatrical release */
  | 'MOVIE'
  /** Short anime released as a music video */
  | 'MUSIC'
  /** Written books released as a series of light novels */
  | 'NOVEL'
  /** (Original Net Animation) Anime that have been originally released online or are only available through streaming services. */
  | 'ONA'
  /** Manga with just one chapter */
  | 'ONE_SHOT'
  /** (Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast */
  | 'OVA'
  /** Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc */
  | 'SPECIAL'
  /** Anime broadcast on television */
  | 'TV'
  /** Anime which are under 15 minutes in length and broadcast on television */
  | 'TV_SHORT';

/** Type of relation media has to its parent. */
export type MediaRelation =
  /** An adaption of this media into a different format */
  | 'ADAPTATION'
  /** An alternative version of the same media */
  | 'ALTERNATIVE'
  /** Shares at least 1 character */
  | 'CHARACTER'
  /** Version 2 only. */
  | 'COMPILATION'
  /** Version 2 only. */
  | 'CONTAINS'
  /** Other */
  | 'OTHER'
  /** The media a side story is from */
  | 'PARENT'
  /** Released before the relation */
  | 'PREQUEL'
  /** Version 3 only. The media is set in the same universe as another media */
  | 'SAME_UNIVERSE'
  /** Released after the relation */
  | 'SEQUEL'
  /** A side story of the parent media */
  | 'SIDE_STORY'
  /** Version 2 only. The source material the media was adapted from */
  | 'SOURCE'
  /** An alternative version of the media with a different primary focus */
  | 'SPIN_OFF'
  /** A shortened and summarized version */
  | 'SUMMARY';

export type MediaSeason =
  /** Predominantly started airing between October and November */
  | 'FALL'
  /** Predominantly started airing between April and June */
  | 'SPRING'
  /** Predominantly started airing between July and September */
  | 'SUMMER'
  /** Predominantly started airing between January and March */
  | 'WINTER';

/** Media sort enums */
export type MediaSort =
  | 'CHAPTERS'
  | 'CHAPTERS_DESC'
  | 'DURATION'
  | 'DURATION_DESC'
  | 'END_DATE'
  | 'END_DATE_DESC'
  | 'EPISODES'
  | 'EPISODES_DESC'
  | 'FAVOURITES'
  | 'FAVOURITES_DESC'
  | 'FORMAT'
  | 'FORMAT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'POPULARITY'
  | 'POPULARITY_DESC'
  | 'SCORE'
  | 'SCORE_DESC'
  | 'SEARCH_MATCH'
  | 'START_DATE'
  | 'START_DATE_DESC'
  | 'STATUS'
  | 'STATUS_DESC'
  | 'TITLE_ENGLISH'
  | 'TITLE_ENGLISH_DESC'
  | 'TITLE_NATIVE'
  | 'TITLE_NATIVE_DESC'
  | 'TITLE_ROMAJI'
  | 'TITLE_ROMAJI_DESC'
  | 'TRENDING'
  | 'TRENDING_DESC'
  | 'TYPE'
  | 'TYPE_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC'
  | 'VOLUMES'
  | 'VOLUMES_DESC';

/** The current releasing status of the media */
export type MediaStatus =
  /** Ended before the work could be finished */
  | 'CANCELLED'
  /** Has completed and is no longer being released */
  | 'FINISHED'
  /** Version 2 only. Is currently paused from releasing and will resume at a later date */
  | 'HIATUS'
  /** To be released at a later date */
  | 'NOT_YET_RELEASED'
  /** Currently releasing */
  | 'RELEASING';

/** Media type enum, anime or manga. */
export type MediaType =
  /** Japanese Anime */
  | 'ANIME'
  /** Asian comic */
  | 'MANGA';

export type AniListMediaSummaryFragment = {
  id: number;
  type: MediaType | null;
  format: MediaFormat | null;
  seasonYear: number | null;
  averageScore: number | null;
  isAdult: boolean | null;
  idMal: number | null;
  episodes: number | null;
  startDate: { year: number | null } | null;
  title: {
    romaji: string | null;
    english: string | null;
    native: string | null;
    userPreferred: string | null;
  } | null;
  coverImage: {
    extraLarge: string | null;
    large: string | null;
    medium: string | null;
    color: string | null;
  } | null;
};

export type AniListBrowseQueryVariables = Exact<{
  page?: number | null | undefined;
  perPage?: number | null | undefined;
  type?: MediaType | null | undefined;
  sort?: Array<MediaSort | null | undefined> | MediaSort | null | undefined;
  season?: MediaSeason | null | undefined;
  seasonYear?: number | null | undefined;
  format?: MediaFormat | null | undefined;
}>;

export type AniListBrowseQuery = {
  Page: {
    media: Array<{
      id: number;
      type: MediaType | null;
      format: MediaFormat | null;
      seasonYear: number | null;
      averageScore: number | null;
      isAdult: boolean | null;
      idMal: number | null;
      episodes: number | null;
      startDate: { year: number | null } | null;
      title: {
        romaji: string | null;
        english: string | null;
        native: string | null;
        userPreferred: string | null;
      } | null;
      coverImage: {
        extraLarge: string | null;
        large: string | null;
        medium: string | null;
        color: string | null;
      } | null;
    } | null> | null;
  } | null;
};

export type AniListSearchQueryVariables = Exact<{
  search?: string | null | undefined;
  perPage?: number | null | undefined;
  type?: MediaType | null | undefined;
  sort?: Array<MediaSort | null | undefined> | MediaSort | null | undefined;
}>;

export type AniListSearchQuery = {
  Page: {
    media: Array<{
      id: number;
      type: MediaType | null;
      format: MediaFormat | null;
      seasonYear: number | null;
      averageScore: number | null;
      isAdult: boolean | null;
      idMal: number | null;
      episodes: number | null;
      startDate: { year: number | null } | null;
      title: {
        romaji: string | null;
        english: string | null;
        native: string | null;
        userPreferred: string | null;
      } | null;
      coverImage: {
        extraLarge: string | null;
        large: string | null;
        medium: string | null;
        color: string | null;
      } | null;
    } | null> | null;
  } | null;
};

export type AniListMediaQueryVariables = Exact<{
  id?: number | null | undefined;
}>;

export type AniListMediaQuery = {
  Media: {
    id: number;
    type: MediaType | null;
    format: MediaFormat | null;
    status: MediaStatus | null;
    episodes: number | null;
    chapters: number | null;
    duration: number | null;
    season: MediaSeason | null;
    seasonYear: number | null;
    averageScore: number | null;
    isAdult: boolean | null;
    idMal: number | null;
    description: string | null;
    synonyms: Array<string | null> | null;
    genres: Array<string | null> | null;
    bannerImage: string | null;
    startDate: {
      year: number | null;
      month: number | null;
      day: number | null;
    } | null;
    endDate: {
      year: number | null;
      month: number | null;
      day: number | null;
    } | null;
    studios: { nodes: Array<{ name: string } | null> | null } | null;
    tags: Array<{ name: string; rank: number | null } | null> | null;
    title: {
      romaji: string | null;
      english: string | null;
      native: string | null;
      userPreferred: string | null;
    } | null;
    coverImage: {
      extraLarge: string | null;
      large: string | null;
      medium: string | null;
      color: string | null;
    } | null;
    trailer: { id: string | null; site: string | null } | null;
    externalLinks: Array<{
      site: string;
      url: string | null;
      language: string | null;
      type: ExternalLinkType | null;
    } | null> | null;
    streamingEpisodes: Array<{
      title: string | null;
      thumbnail: string | null;
      url: string | null;
      site: string | null;
    } | null> | null;
    relations: {
      edges: Array<{
        relationType: MediaRelation | null;
        node: {
          id: number;
          type: MediaType | null;
          format: MediaFormat | null;
          status: MediaStatus | null;
          title: {
            romaji: string | null;
            english: string | null;
            native: string | null;
            userPreferred: string | null;
          } | null;
          coverImage: {
            extraLarge: string | null;
            large: string | null;
            medium: string | null;
            color: string | null;
          } | null;
        } | null;
      } | null> | null;
    } | null;
    characters: {
      edges: Array<{
        role: CharacterRole | null;
        node: {
          id: number;
          name: { full: string | null; native: string | null } | null;
          image: { large: string | null; medium: string | null } | null;
        } | null;
        voiceActors: Array<{
          id: number;
          language: string | null;
          name: { full: string | null; native: string | null } | null;
          image: { large: string | null; medium: string | null } | null;
        } | null> | null;
      } | null> | null;
    } | null;
    staff: {
      edges: Array<{
        role: string | null;
        node: {
          id: number;
          name: { full: string | null; native: string | null } | null;
          image: { large: string | null; medium: string | null } | null;
        } | null;
      } | null> | null;
    } | null;
    recommendations: {
      nodes: Array<{
        rating: number | null;
        mediaRecommendation: {
          id: number;
          type: MediaType | null;
          format: MediaFormat | null;
          title: {
            romaji: string | null;
            english: string | null;
            native: string | null;
            userPreferred: string | null;
          } | null;
          coverImage: {
            extraLarge: string | null;
            large: string | null;
            medium: string | null;
            color: string | null;
          } | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type AniListMediaEpisodesQueryVariables = Exact<{
  id?: number | null | undefined;
}>;

export type AniListMediaEpisodesQuery = {
  Media: { episodes: number | null } | null;
};

export const AniListMediaSummaryFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AniListMediaSummary' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Media' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'format' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seasonYear' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'startDate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'averageScore' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isAdult' } },
          { kind: 'Field', name: { kind: 'Name', value: 'idMal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'episodes' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'title' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'romaji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'english' } },
                { kind: 'Field', name: { kind: 'Name', value: 'native' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userPreferred' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'coverImage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'extraLarge' } },
                { kind: 'Field', name: { kind: 'Name', value: 'large' } },
                { kind: 'Field', name: { kind: 'Name', value: 'medium' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AniListMediaSummaryFragment, unknown>;
export const AniListBrowseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AniListBrowse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'perPage' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'MediaType' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'MediaSort' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'season' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'MediaSeason' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'seasonYear' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'format' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'MediaFormat' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Page' },
            arguments: [
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
                name: { kind: 'Name', value: 'perPage' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'perPage' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'media' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'type' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'sort' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'sort' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'season' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'season' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'seasonYear' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'seasonYear' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'format' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'format' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AniListMediaSummary' },
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AniListMediaSummary' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Media' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'format' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seasonYear' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'startDate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'averageScore' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isAdult' } },
          { kind: 'Field', name: { kind: 'Name', value: 'idMal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'episodes' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'title' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'romaji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'english' } },
                { kind: 'Field', name: { kind: 'Name', value: 'native' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userPreferred' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'coverImage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'extraLarge' } },
                { kind: 'Field', name: { kind: 'Name', value: 'large' } },
                { kind: 'Field', name: { kind: 'Name', value: 'medium' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AniListBrowseQuery, AniListBrowseQueryVariables>;
export const AniListSearchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AniListSearch' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'perPage' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'MediaType' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'MediaSort' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Page' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'IntValue', value: '1' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'perPage' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'perPage' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'media' },
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
                      name: { kind: 'Name', value: 'sort' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'sort' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'type' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AniListMediaSummary' },
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AniListMediaSummary' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Media' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'format' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seasonYear' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'startDate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'averageScore' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isAdult' } },
          { kind: 'Field', name: { kind: 'Name', value: 'idMal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'episodes' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'title' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'romaji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'english' } },
                { kind: 'Field', name: { kind: 'Name', value: 'native' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userPreferred' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'coverImage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'extraLarge' } },
                { kind: 'Field', name: { kind: 'Name', value: 'large' } },
                { kind: 'Field', name: { kind: 'Name', value: 'medium' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AniListSearchQuery, AniListSearchQueryVariables>;
export const AniListMediaDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AniListMedia' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Media' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'format' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'episodes' } },
                { kind: 'Field', name: { kind: 'Name', value: 'chapters' } },
                { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
                { kind: 'Field', name: { kind: 'Name', value: 'season' } },
                { kind: 'Field', name: { kind: 'Name', value: 'seasonYear' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'startDate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'month' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'day' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'endDate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'month' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'day' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'averageScore' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isAdult' } },
                { kind: 'Field', name: { kind: 'Name', value: 'idMal' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'description' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'asHtml' },
                      value: { kind: 'BooleanValue', value: false },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'synonyms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'genres' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'studios' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'isMain' },
                      value: { kind: 'BooleanValue', value: true },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nodes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tags' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'title' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'romaji' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'english' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'native' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'userPreferred' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'coverImage' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'extraLarge' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'large' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'bannerImage' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'trailer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'site' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'externalLinks' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'site' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'language' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'streamingEpisodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'thumbnail' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'site' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'relations' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'relationType' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'version' },
                                  value: { kind: 'IntValue', value: '2' },
                                },
                              ],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'type' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'format' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'status' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'romaji',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'english',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'native',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'userPreferred',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'coverImage' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'extraLarge',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'large',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'medium',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'color',
                                          },
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
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'characters' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'sort' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          { kind: 'EnumValue', value: 'ROLE' },
                          { kind: 'EnumValue', value: 'RELEVANCE' },
                          { kind: 'EnumValue', value: 'ID' },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'perPage' },
                      value: { kind: 'IntValue', value: '25' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'role' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'full' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'native',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'large',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'medium',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'voiceActors' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'sort' },
                                  value: {
                                    kind: 'ListValue',
                                    values: [
                                      { kind: 'EnumValue', value: 'RELEVANCE' },
                                      { kind: 'EnumValue', value: 'ID' },
                                    ],
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'full' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'native',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'language' },
                                    name: { kind: 'Name', value: 'languageV2' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'large',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'medium',
                                          },
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
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'staff' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'sort' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          { kind: 'EnumValue', value: 'RELEVANCE' },
                          { kind: 'EnumValue', value: 'ID' },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'perPage' },
                      value: { kind: 'IntValue', value: '25' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'role' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'full' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'native',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'large',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'medium',
                                          },
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
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'recommendations' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'sort' },
                      value: {
                        kind: 'ListValue',
                        values: [{ kind: 'EnumValue', value: 'RATING_DESC' }],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'perPage' },
                      value: { kind: 'IntValue', value: '12' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nodes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rating' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'mediaRecommendation',
                              },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'type' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'format' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'romaji',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'english',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'native',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'userPreferred',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'coverImage' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'extraLarge',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'large',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'medium',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'color',
                                          },
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
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AniListMediaQuery, AniListMediaQueryVariables>;
export const AniListMediaEpisodesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AniListMediaEpisodes' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Media' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'episodes' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AniListMediaEpisodesQuery,
  AniListMediaEpisodesQueryVariables
>;
