import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';

type IssuedsQuery = {
  __typename?: 'Query';
  issueds: Array<{ __typename?: 'Issued'; account: string; value: string }>;
};

const gql = (data: any) => data[0];
const IssuedsDocument = gql`
  query issueds($account: Bytes) {
    issueds(where: { account: $account }) {
      account
      value
    }
  }
`;

export const useTotalIssuedDebt = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const url =
    networkId === 1
      ? 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix'
      : 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-main';

  return useQuery(
    ['useTotalIssuedDebt', networkId, walletAddress],
    async () => {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ query: IssuedsDocument, variables: { account: walletAddress } }),
      });
      const json: { data: IssuedsQuery; errors: Error[] } = await res.json();
      if (json.errors) {
        const { message } = json.errors[0];
        throw new Error(message);
      }
      return json.data.issueds.reduce((acc, val) => {
        acc = acc + parseFloat(val.value);
        return acc;
      }, 0);
    },
    { enabled: Boolean(networkId && walletAddress) }
  );
};
