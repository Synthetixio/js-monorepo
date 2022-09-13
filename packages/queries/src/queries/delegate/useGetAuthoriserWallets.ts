import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { DelegationWallet } from '../../types';
import { QueryContext } from '../../context';
import { useGetDelegatedWallets } from '../../subgraph/mainSubgraphQueries';

const useGetAuthoriserWallets = (
  ctx: QueryContext,
  delegationWallet: string,
  options?: UseQueryOptions
) => {
  return useGetDelegatedWallets(
    ctx.subgraphEndpoints.subgraph,
    {
      first: 100,
      where: { delegate: delegationWallet },
      ...options,
    },
    { canMint: true, canBurn: true, canClaim: true, canExchange: true, authoriser: true },
    {
      select: (data) => {
        if (!data) return data;
        return data
          .filter(
            ({ canMint, canBurn, canClaim, canExchange }) =>
              canMint || canBurn || canClaim || canExchange
          )
          .map(({ authoriser, canMint, canBurn, canClaim, canExchange }) => ({
            address: authoriser,
            authoriser,
            canAll: Boolean(canMint && canBurn && canClaim && canExchange),
            canMint: Boolean(canMint),
            canBurn: Boolean(canBurn),
            canClaim: Boolean(canClaim),
            canExchange: Boolean(canExchange),
          }));
      },
    }
  ) as UseQueryResult<DelegationWallet[], unknown>; // The type declaration with select is not working properly so we need to use `as` here
};
export default useGetAuthoriserWallets;
