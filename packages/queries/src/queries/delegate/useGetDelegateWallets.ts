import { useQuery, UseQueryOptions } from 'react-query';
import { DelegationWallet } from '../../types';

import { QueryContext } from '../../context';
import { useGetDelegatedWallets } from '../../../generated/mainSubgraphQueries';

const useGetDelegateWallets = (
	ctx: QueryContext,
	authorizerAddress: string,
	options?: UseQueryOptions<[DelegationWallet]>
) => {
	const getDelegatedWalletsQuery = useGetDelegatedWallets(
		ctx.subgraphEndpoints.subgraph,
		{
			first: 100,
			where: { authoriser: authorizerAddress },
			...options,
		},
		{ canMint: true, canBurn: true, canClaim: true, canExchange: true, delegate: true }
	);
	return useQuery([getDelegatedWalletsQuery.isFetching], async () => {
		if (!getDelegatedWalletsQuery.data) return undefined;
		return getDelegatedWalletsQuery.data
			.filter(
				({ canMint, canBurn, canClaim, canExchange }) =>
					canMint || canBurn || canClaim || canExchange
			)
			.map(({ delegate, canMint, canBurn, canClaim, canExchange }) => ({
				address: delegate,
				canAll: Boolean(canMint && canBurn && canClaim && canExchange),
				canMint: Boolean(canMint),
				canBurn: Boolean(canBurn),
				canClaim: Boolean(canClaim),
				canExchange: Boolean(canExchange),
			}));
	});
};

export default useGetDelegateWallets;
