import { UseQueryOptions, UseQueryResult } from 'react-query';
import { DelegationWallet } from '../../types';

import { QueryContext } from '../../context';
import { useGetDelegatedWallets } from '../../subgraph/mainSubgraphQueries';

const useGetDelegateWallets = (
  ctx: QueryContext,
  authorizerAddress: string,
  options?: UseQueryOptions
) => {
  return useGetDelegatedWallets(
    ctx.subgraphEndpoints.subgraph,
    {
      first: 100,
      where: { authoriser: authorizerAddress },
      ...options,
    },
    { canMint: true, canBurn: true, canClaim: true, canExchange: true, delegate: true },
    {
      select: (data) => {
        if (!data) return data;
        return data
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
    }
  ) as UseQueryResult<DelegationWallet[], unknown>; // The type declaration with select is not working properly so we need to use `as` here
};

export default useGetDelegateWallets;
