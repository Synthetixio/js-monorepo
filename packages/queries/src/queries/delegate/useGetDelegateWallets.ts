import { useQuery, UseQueryOptions } from 'react-query';
import { DelegationWallet } from '../../types';

import { QueryContext } from '../../context';
import { useGetDelegatedWallets } from '../../../generated/mainSubgraphQueries';

const useGetDelegateWallets = (
	ctx: QueryContext,
	authorizerAddress: string,
	options?: UseQueryOptions<[DelegationWallet]>
) => {
	const getDelegatedWalletsQuery = useGetDelegatedWallets(ctx.subgraphEndpoints.subgraph, {
		first: 100,
		where: { authoriser: authorizerAddress },
		...options,
	});
	return useQuery([getDelegatedWalletsQuery.isFetching], async () => {
		if (!getDelegatedWalletsQuery.data) return undefined;
		return getDelegatedWalletsQuery.data
			.filter(
				({ canMint, canBurn, canClaim, canExchange }) =>
					canMint || canBurn || canClaim || canExchange
			)
			.map(({ delegate, canMint, canBurn, canClaim, canExchange }) => ({
				address: delegate,
				canAll: canMint && canBurn && canClaim && canExchange,
				canMint,
				canBurn,
				canClaim,
				canExchange,
			}));
	});
};

export default useGetDelegateWallets;
