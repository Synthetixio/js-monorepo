import { useQuery, UseQueryOptions } from 'react-query';
import { DebtSnapshot } from '@synthetixio/data/build/node/generated/graphql';

import { QueryContext } from '../../context';

const useGetDebtSnapshotQuery = (
	ctx: QueryContext,
	walletAddress: string | null,
	options?: UseQueryOptions<DebtSnapshot[] | null>
) => {
	return useQuery<DebtSnapshot[] | null>(
		['debt', 'snapshot', ctx.networkId, walletAddress],
		async () => {
			return await ctx.snxData!.debtSnapshots({ account: walletAddress!, max: 1000 });
		},
		{
			enabled: ctx.networkId != null && !!walletAddress,
			...options,
		}
	);
};

export default useGetDebtSnapshotQuery;
