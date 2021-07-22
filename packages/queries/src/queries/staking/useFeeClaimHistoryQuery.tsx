import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';

import { HistoricalStakingTransaction } from './types';

const useFeeClaimHistoryQuery = (ctx: QueryContext, walletAddress: string | undefined, options?: UseQueryOptions<HistoricalStakingTransaction[]>) => {
	return useQuery<HistoricalStakingTransaction[]>(
		['staking', 'feesClaimed', ctx.networkId, walletAddress],
		async () => {
			const feesClaimed = (await ctx.snxData!.feesClaimed({
				account: walletAddress,
			})) || [] as HistoricalStakingTransaction[];
			const burned = (await ctx.snxData!.burned({
				account: walletAddress,
			})) || [] as HistoricalStakingTransaction[];
			const issued = (await ctx.snxData!.issued({
				account: walletAddress,
			})) || [] as HistoricalStakingTransaction[];

			return [...feesClaimed, ...burned, ...issued];
		},
		{
			enabled: ctx.snxData != null && !!walletAddress,
			...options,
		}
	);
};

export default useFeeClaimHistoryQuery;
