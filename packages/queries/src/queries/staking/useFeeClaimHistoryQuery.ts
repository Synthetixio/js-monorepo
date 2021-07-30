import { orderBy } from 'lodash';
import { useQuery, UseQueryOptions } from 'react-query';
import { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';

import { HistoricalStakingTransaction, StakingTransactionType } from '../../types';

const useFeeClaimHistoryQuery = (ctx: QueryContext, walletAddress: string | null, options?: UseQueryOptions<HistoricalStakingTransaction[]>) => {
	return useQuery<HistoricalStakingTransaction[]>(
		['staking', 'feesClaimed', ctx.networkId, walletAddress],
		async () => {
			const feesClaimed: HistoricalStakingTransaction[] = (await ctx.snxData!.feesClaimed({
				account: walletAddress!,
			}))!.map((e) => ({
				account: walletAddress!,
				block: e.block,
				hash: '',
				value: wei(e.value),
				timestamp: e.timestamp,
				type: StakingTransactionType.FeesClaimed,
				totalIssuedSUSD: wei(0)
			}));
			const burned: HistoricalStakingTransaction[] = (await ctx.snxData!.burned({
				account: walletAddress!,
			}))!.map((e) => ({
				account: walletAddress!,
				block: e.block,
				hash: '',
				value: wei(e.value),
				timestamp: e.timestamp,
				type: StakingTransactionType.Issued,
				totalIssuedSUSD: wei(e.value)
			}));
			const issued: HistoricalStakingTransaction[] = (await ctx.snxData!.issued({
				account: walletAddress!,
			}))!.map((e) => ({
				account: walletAddress!,
				block: e.block,
				hash: '',
				value: wei(e.value),
				timestamp: e.timestamp,
				type: StakingTransactionType.Burned,
				totalIssuedSUSD: wei(e.value)
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
