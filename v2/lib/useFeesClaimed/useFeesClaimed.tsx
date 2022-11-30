import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';
import { MAINNET_URL, OPTIMISM_URL } from '@snx-v2/Constants';

type FeesClaimedQueryResult = {
  __typename?: 'Query';
  feesClaimeds: Array<{ account: string; value: string; rewards?: string; timestamp: string }>;
};

const gql = (data: TemplateStringsArray) => data[0];
const FeesClaimedDocument = gql`
  query feesClaimeds($account: Bytes) {
    feesClaimeds(
      where: { account: $account }
      orderBy: timestamp
      orderDirection: desc
      first: 1000
    ) {
      rewards
      value
      timestamp
      account
    }
  }
`;

export const useFeesClaimed = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const url = networkId === 1 ? MAINNET_URL : OPTIMISM_URL;

  return useQuery(
    ['useFeesClaimed', networkId, walletAddress],
    async () => {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ query: FeesClaimedDocument, variables: { account: walletAddress } }),
      });
      const json: { data: FeesClaimedQueryResult; errors: Error[] } = await res.json();
      if (json.errors) {
        const { message } = json.errors[0];
        throw new Error(message);
      }
      return json.data.feesClaimeds.map((x) => ({
        ...x,
        value: parseFloat(x.value),
        rewards: parseFloat(x.rewards || '0'),
        timestamp: parseFloat(x.timestamp),
      }));
    },
    { enabled: Boolean(networkId && walletAddress), staleTime: 10000 }
  );
};
