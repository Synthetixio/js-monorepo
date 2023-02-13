import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';
import { MAINNET_URL, OPTIMISM_URL } from '@snx-v2/Constants';

type AuthorisedWalletsQueryResult = {
  __typename?: 'Query';
  delegatedWallets: Array<{
    canMint: boolean;
    canBurn: boolean;
    canClaim: boolean;
    canExchange: boolean;
    authoriser: string;
  }>;
};

const gql = (data: TemplateStringsArray) => data[0];
const AuthorizedWalletsDocument = gql`
  query delegatedWallets($delegate: Bytes) {
    delegatedWallets(where: { delegate: $delegate }, first: 100) {
      canMint
      canBurn
      canClaim
      canExchange
      authoriser
    }
  }
`;

export const useAuthorisedWallets = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const url = networkId === 1 ? MAINNET_URL : OPTIMISM_URL;

  return useQuery(
    ['useAuthorizedWallets', networkId, walletAddress],
    async () => {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          query: AuthorizedWalletsDocument,
          variables: { delegate: walletAddress },
        }),
      });
      const json: { data: AuthorisedWalletsQueryResult; errors: Error[] } = await res.json();
      if (json.errors) {
        const { message } = json.errors[0];
        throw new Error(message);
      }
      return json.data.delegatedWallets
        .filter(
          ({ canMint, canBurn, canClaim, canExchange }) =>
            canMint || canBurn || canClaim || canExchange
        )
        .map(({ authoriser, canMint, canBurn, canClaim, canExchange }) => ({
          address: authoriser,
          authoriser: authoriser,
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
