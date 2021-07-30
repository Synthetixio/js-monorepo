import { useQuery, UseQueryOptions } from 'react-query';
import { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';
import { FeePoolData } from '../../types';

const useGetFeePoolDataQuery = (ctx: QueryContext, period: string, options?: UseQueryOptions<FeePoolData>) => {
	return useQuery<FeePoolData>(
		['staking', 'feePool', ctx.networkId],
		async () => {
			const {
				contracts: { FeePool },
			} = ctx.snxjs!;
			const feePeriod = await FeePool.recentFeePeriods(period);
			const feePeriodDuration = await FeePool.feePeriodDuration();
			return {
				feePeriodDuration: Number(feePeriodDuration),
				startTime: Number(feePeriod.startTime || 0),
				feesToDistribute: wei(feePeriod.feesToDistribute || 0),
				feesClaimed: wei(feePeriod.feesClaimed || 0),
				rewardsToDistribute: wei(feePeriod.rewardsToDistribute || 0),
				rewardsClaimed: wei(feePeriod.rewardsClaimed || 0),
			};
		},
		{
			enabled: ctx.snxjs != null && !!period,
			...options,
		}
	);
};

export default useGetFeePoolDataQuery;
