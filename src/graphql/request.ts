import { print } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { HttpClient } from '../transport/http';

export interface GraphQLResponse<TResult> {
  data?: TResult;
  errors?: ReadonlyArray<{
    message: string;
  }>;
}

export async function postGraphQL<TResult, TVariables>(
  http: HttpClient,
  url: string,
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
  options: RequestInit = {},
): Promise<{ response: Response; body: GraphQLResponse<TResult> }> {
  const response = await http.post(
    url,
    {
      query: print(document),
      variables,
    },
    options,
  );

  return {
    response,
    body: (await response.json()) as GraphQLResponse<TResult>,
  };
}
