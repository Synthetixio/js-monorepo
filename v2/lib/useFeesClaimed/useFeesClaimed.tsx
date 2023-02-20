import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';
import { MAINNET_URL, OPTIMISM_URL } from '@snx-v2/Constants';
import { wei } from '@synthetixio/wei';

type FeesClaimedQueryResult = {
  __typename?: 'Query';
  feesClaimeds: Array<{
    id: string;
    account: string;
    value: string;
    rewards?: string;
    timestamp: string;
  }>;
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
      id
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
      const schedarReleaseDate = Math.floor(new Date('2023-02-15T09:29:25.000Z').getTime() / 1000);

      return json.data.feesClaimeds.map((x) => {
        const value = parseFloat(x.timestamp) < schedarReleaseDate ? x.value : '0';
        return {
          ...x,
          value: wei(value),
          rewards: wei(x.rewards || '0'),
          timestamp: wei(x.timestamp),
        };
      });
    },
    { enabled: Boolean(networkId && walletAddress), staleTime: 10000 }
  );
};
