import { print } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { z } from 'zod';
import { HttpClient } from '../transport/http';

export interface GraphQLResponse<TResult> {
  data?: TResult;
  errors?: ReadonlyArray<{
    message: string;
  }>;
}

function graphQLResponseSchema<TResult>() {
  return z.object({
    data: z.custom<TResult>().optional(),
    errors: z
      .array(
        z.object({
          message: z.string(),
        }),
      )
      .optional(),
  });
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

  const body = graphQLResponseSchema<TResult>().parse(await response.json());

  return {
    response,
    body,
  };
}
