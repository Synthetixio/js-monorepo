// !!! DO NOT EDIT !!! Automatically generated file

import * as Types from '../../schema.graphql';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch('https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix', {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
export type IssuedsQueryVariables = Types.Exact<{
  account?: Types.InputMaybe<Types.Scalars['Bytes']>;
}>;

export type IssuedsQuery = {
  __typename?: 'Query';
  issueds: Array<{ __typename?: 'Issued'; account: any; value: any; timestamp: any }>;
};

export const IssuedsDocument = `
    query issueds($account: Bytes) {
  issueds(where: {account: $account}) {
    account
    value
    timestamp
  }
}
    `;
export const useIssuedsQuery = <TData = IssuedsQuery, TError = unknown>(
  variables?: IssuedsQueryVariables,
  options?: UseQueryOptions<IssuedsQuery, TError, TData>
) =>
  useQuery<IssuedsQuery, TError, TData>(
    variables === undefined ? ['issueds'] : ['issueds', variables],
    fetcher<IssuedsQuery, IssuedsQueryVariables>(IssuedsDocument, variables),
    options
  );
