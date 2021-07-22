import { useQuery, UseQueryOptions } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';

export type FeePoolData = {
	feePeriodDuration: number;
	startTime: number;
	feesToDistribute: number;
	feesClaimed: number;
	rewardsToDistribute: number;
	rewardsToDistributeBN: Wei;
	rewardsClaimed: number;
};

const useGetFeePoolDataQuery = (ctx: QueryContext, period: string, options?: UseQueryOptions<FeePoolData>) => {
	return useQuery<FeePoolData>(
		['staking', 'feePool', ctx.networkId],
		async () => {
			const {
				contracts: { FeePool },
				utils: { formatEther },
			} = ctx.snxjs!;
			const feePeriod = await FeePool.recentFeePeriods(period);
			const feePeriodDuration = await FeePool.feePeriodDuration();
			return {
				feePeriodDuration: Number(feePeriodDuration),
				startTime: Number(feePeriod.startTime) || 0,
				feesToDistribute: Number(formatEther(feePeriod.feesToDistribute)) || 0,
				feesClaimed: Number(formatEther(feePeriod.feesClaimed)) || 0,
				rewardsToDistribute: Number(formatEther(feePeriod.rewardsToDistribute)) || 0,
				rewardsToDistributeBN: wei(formatEther(feePeriod.rewardsToDistribute)),
				rewardsClaimed: Number(formatEther(feePeriod.rewardsClaimed)) || 0,
			};
		},
		{
			enabled: ctx.snxjs != null && !!period,
			...options,
		}
	);
};

export default useGetFeePoolDataQuery;
