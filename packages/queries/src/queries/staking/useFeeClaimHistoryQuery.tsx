import { orderBy } from 'lodash';
import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';

import { HistoricalStakingTransaction, StakingTransactionType } from './types';

const useFeeClaimHistoryQuery = (ctx: QueryContext, walletAddress: string | undefined, options?: UseQueryOptions<HistoricalStakingTransaction[]>) => {
	return useQuery<HistoricalStakingTransaction[]>(
		['staking', 'feesClaimed', ctx.networkId, walletAddress],
		async () => {
			const feesClaimed: HistoricalStakingTransaction[] = (await ctx.snxData!.feesClaimed({
				account: walletAddress,
			}))!.map((e) => ({
				account: walletAddress!,
				block: e.block,
				hash: '',
				value: e.value,
				timestamp: e.timestamp,
				type: StakingTransactionType.FeesClaimed,
				totalIssuedSUSD: 0
			}));
			const burned: HistoricalStakingTransaction[] = (await ctx.snxData!.burned({
				account: walletAddress,
			}))!.map((e) => ({
				account: walletAddress!,
				block: e.block,
				hash: '',
				value: e.value,
				timestamp: e.timestamp,
				type: StakingTransactionType.Issued,
				totalIssuedSUSD: e.value
			}));
			const issued: HistoricalStakingTransaction[] = (await ctx.snxData!.issued({
				account: walletAddress,
			}))!.map((e) => ({
				account: walletAddress!,
				block: e.block,
				hash: '',
				value: e.value,
				timestamp: e.timestamp,
				type: StakingTransactionType.Burned,
				totalIssuedSUSD: e.value
			}));



			return orderBy([...feesClaimed, ...burned, ...issued], ['timestamp'], ['asc']);
		},
		{
			enabled: ctx.snxData != null && !!walletAddress,
			...options,
		}
	);
};

export default useFeeClaimHistoryQuery;
