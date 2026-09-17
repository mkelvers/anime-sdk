/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  'query AllAnimeSearch($search: SearchInput, $limit: Int, $page: Int, $countryOrigin: VaildCountryOriginEnumType) {\n  shows(\n    search: $search\n    limit: $limit\n    page: $page\n    countryOrigin: $countryOrigin\n  ) {\n    edges {\n      _id\n      name\n      englishName\n      availableEpisodes\n      __typename\n    }\n  }\n}\n\nquery AllAnimeShow($showId: String!) {\n  show(_id: $showId) {\n    _id\n    availableEpisodesDetail\n  }\n}\n\nquery AllAnimeEpisodeSources($showId: String!, $translationType: VaildTranslationTypeEnumType!, $episodeString: String!) {\n  episode(\n    showId: $showId\n    translationType: $translationType\n    episodeString: $episodeString\n  ) {\n    episodeString\n    sourceUrls\n  }\n}': typeof types.AllAnimeSearchDocument;
};
const documents: Documents = {
  'query AllAnimeSearch($search: SearchInput, $limit: Int, $page: Int, $countryOrigin: VaildCountryOriginEnumType) {\n  shows(\n    search: $search\n    limit: $limit\n    page: $page\n    countryOrigin: $countryOrigin\n  ) {\n    edges {\n      _id\n      name\n      englishName\n      availableEpisodes\n      __typename\n    }\n  }\n}\n\nquery AllAnimeShow($showId: String!) {\n  show(_id: $showId) {\n    _id\n    availableEpisodesDetail\n  }\n}\n\nquery AllAnimeEpisodeSources($showId: String!, $translationType: VaildTranslationTypeEnumType!, $episodeString: String!) {\n  episode(\n    showId: $showId\n    translationType: $translationType\n    episodeString: $episodeString\n  ) {\n    episodeString\n    sourceUrls\n  }\n}':
    types.AllAnimeSearchDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query AllAnimeSearch($search: SearchInput, $limit: Int, $page: Int, $countryOrigin: VaildCountryOriginEnumType) {\n  shows(\n    search: $search\n    limit: $limit\n    page: $page\n    countryOrigin: $countryOrigin\n  ) {\n    edges {\n      _id\n      name\n      englishName\n      availableEpisodes\n      __typename\n    }\n  }\n}\n\nquery AllAnimeShow($showId: String!) {\n  show(_id: $showId) {\n    _id\n    availableEpisodesDetail\n  }\n}\n\nquery AllAnimeEpisodeSources($showId: String!, $translationType: VaildTranslationTypeEnumType!, $episodeString: String!) {\n  episode(\n    showId: $showId\n    translationType: $translationType\n    episodeString: $episodeString\n  ) {\n    episodeString\n    sourceUrls\n  }\n}',
): (typeof documents)['query AllAnimeSearch($search: SearchInput, $limit: Int, $page: Int, $countryOrigin: VaildCountryOriginEnumType) {\n  shows(\n    search: $search\n    limit: $limit\n    page: $page\n    countryOrigin: $countryOrigin\n  ) {\n    edges {\n      _id\n      name\n      englishName\n      availableEpisodes\n      __typename\n    }\n  }\n}\n\nquery AllAnimeShow($showId: String!) {\n  show(_id: $showId) {\n    _id\n    availableEpisodesDetail\n  }\n}\n\nquery AllAnimeEpisodeSources($showId: String!, $translationType: VaildTranslationTypeEnumType!, $episodeString: String!) {\n  episode(\n    showId: $showId\n    translationType: $translationType\n    episodeString: $episodeString\n  ) {\n    episodeString\n    sourceUrls\n  }\n}'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
