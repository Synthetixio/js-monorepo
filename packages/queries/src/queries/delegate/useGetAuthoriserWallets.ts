import { useQuery, UseQueryOptions } from 'react-query';
import { DelegationWallet } from '../../types';
import { QueryContext } from '../../context';
import { useGetDelegatedWallets } from '../../../generated/mainSubgraphQueries';

const useGetAuthoriserWallets = (
	ctx: QueryContext,
	delegationWallet: string,
	options?: UseQueryOptions<[DelegationWallet]>
) => {
	const getDelegatedWalletsQuery = useGetDelegatedWallets(ctx.subgraphEndpoints.subgraph, {
		first: 100,
		where: { delegate: delegationWallet },
		...options,
	});
	return useQuery([getDelegatedWalletsQuery.isFetching], async () => {
		if (!getDelegatedWalletsQuery.data) return undefined;
		return getDelegatedWalletsQuery.data
			.filter(({ canMint, canBurn, canClaim }) => canMint || canBurn || canClaim)
			.map(({ authoriser, canMint, canBurn, canClaim }) => ({
				address: authoriser,
				canMint,
				canBurn,
				canClaim,
			}));
	});
};
export default useGetAuthoriserWallets;
