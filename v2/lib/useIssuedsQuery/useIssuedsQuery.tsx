import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { MainnetTypes, OptimismTypes } from '@snx-v2/subgraph';

type InputMaybe<T> = MainnetTypes.InputMaybe<T> | OptimismTypes.InputMaybe<T>;
type Scalars = MainnetTypes.Scalars | OptimismTypes.Scalars;

export type IssuedsQuery = {
  __typename?: 'Query';
  issueds: Array<{ __typename?: 'Issued'; account: any; value: any; timestamp: any }>;
};

const gql = (data: any) => data[0];
export const IssuedsDocument = gql`
  query issueds($account: Bytes) {
    issueds(where: { account: $account }) {
      account
      value
      timestamp
    }
  }
`;

export const useIssuedsQuery = <TData = IssuedsQuery, TError = unknown>(
  account?: InputMaybe<Scalars['Bytes']>,
  options?: UseQueryOptions<IssuedsQuery, TError, TData>
) => {
  const { networkId } = useContext(ContractContext);
  const url =
    networkId === 1
      ? 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix'
      : 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-main';

  return useQuery<IssuedsQuery, TError, TData>(
    ['issueds', networkId, account],
    async () => {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ query: IssuedsDocument, variables: { account } }),
      });
      const json = await res.json();
      if (json.errors) {
        const { message } = json.errors[0];
        throw new Error(message);
      }
      return json.data;
    },
    options
  );
};
