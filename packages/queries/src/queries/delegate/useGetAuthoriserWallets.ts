import { useQuery, UseQueryOptions } from 'react-query';
import { DelegationWallet } from '../../types';
import { QueryContext } from '../../context';
import { useGetDelegatedWallets } from '../../../generated/mainSubgraphQueries';

const useGetAuthoriserWallets = (
	ctx: QueryContext,
	delegationWallet: string,
	options?: UseQueryOptions<[DelegationWallet]>
) => {
	const getDelegatedWalletsQuery = useGetDelegatedWallets(
		ctx.subgraphEndpoints.subgraph,
		{
			first: 100,
			where: { delegate: delegationWallet },
			...options,
		},
		{ canMint: true, canBurn: true, canClaim: true, canExchange: true, authoriser: true }
	);
	return useQuery([getDelegatedWalletsQuery.isFetching], async () => {
		if (!getDelegatedWalletsQuery.data) return undefined;
		return getDelegatedWalletsQuery.data
			.filter(({ canMint, canBurn, canClaim }) => canMint || canBurn || canClaim)
			.map(({ authoriser, canMint, canBurn, canClaim, canExchange }) => ({
				address: authoriser,
				canAll: canMint && canBurn && canClaim && canExchange,
				canMint,
				canBurn,
				canClaim,
			}));
	});
};
export default useGetAuthoriserWallets;
