import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';
import { MAINNET_URL, OPTIMISM_URL } from '@snx-v2/Constants';

type DelegatedWalletsQueryResult = {
  __typename?: 'Query';
  delegatedWallets: Array<{
    canMint: boolean;
    canBurn: boolean;
    canClaim: boolean;
    canExchange: boolean;
    delegate: string;
  }>;
};

const gql = (data: TemplateStringsArray) => data[0];
const DelegatedWalletsDocument = gql`
  query delegatedWallets($authoriser: Bytes) {
    delegatedWallets(where: { authoriser: $authoriser }, first: 100) {
      canMint
      canBurn
      canClaim
      canExchange
      delegate
    }
  }
`;

export const useDelegateWallets = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const url = networkId === 1 ? MAINNET_URL : OPTIMISM_URL;

  return useQuery(
    ['useDelegateWallets', networkId, walletAddress],
    async () => {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          query: DelegatedWalletsDocument,
          variables: { authoriser: walletAddress },
        }),
      });
      const json: { data: DelegatedWalletsQueryResult; errors: Error[] } = await res.json();
      if (json.errors) {
        const { message } = json.errors[0];
        throw new Error(message);
      }
      console.log(json);
      return json.data.delegatedWallets
        .filter(
          ({ canMint, canBurn, canClaim, canExchange }) =>
            canMint || canBurn || canClaim || canExchange
        )
        .map(({ delegate, canMint, canBurn, canClaim, canExchange }) => ({
          address: delegate,
          delegate,
          canAll: Boolean(canMint && canBurn && canClaim && canExchange),
          canMint: Boolean(canMint),
          canBurn: Boolean(canBurn),
          canClaim: Boolean(canClaim),
          canExchange: Boolean(canExchange),
        }));
    },
    { enabled: Boolean(networkId && walletAddress), staleTime: 10000 }
  );
};
