import { UseQueryOptions } from 'react-query';
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
	if (!getDelegatedWalletsQuery.data) return undefined;

	return {
		...getDelegatedWalletsQuery,
		data: getDelegatedWalletsQuery.data
			.filter(({ canMint, canBurn, canClaim }) => canMint || canBurn || canClaim)
			.map(({ authoriser, canMint, canBurn, canClaim, canExchange }) => ({
				address: authoriser,
				canAll: Boolean(canMint && canBurn && canClaim && canExchange),
				canMint: Boolean(canMint),
				canBurn: Boolean(canBurn),
				canClaim: Boolean(canClaim),
				canExchange: Boolean(canExchange),
			})),
	};
};
export default useGetAuthoriserWallets;
