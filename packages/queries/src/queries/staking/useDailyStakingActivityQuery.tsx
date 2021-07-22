import { useQuery, UseQueryOptions } from 'react-query';

import { DailyStakingRecord } from './types';
import { QueryContext } from '../../context';

const useDailyBurnedQuery = (ctx: QueryContext, options?: UseQueryOptions<[DailyStakingRecord[], DailyStakingRecord[]]>) => {

	const SECONDS_PER_DAY = 86400;
	const DAYS_TO_QUERY = 180;

	return useQuery<[DailyStakingRecord[], DailyStakingRecord[]]>(
		['staking', 'dailyActivity', ctx.networkId],
		async () => {
			const now = new Date();
			const minTimestamp = now.getTime() / 1000 - DAYS_TO_QUERY * SECONDS_PER_DAY;
			const dailyIssueds = await ctx.snxData!.dailyIssued({ max: DAYS_TO_QUERY, minTimestamp });
			const dailyBurneds = await ctx.snxData!.dailyBurned({ max: DAYS_TO_QUERY, minTimestamp });
			return [dailyIssueds, dailyBurneds];
		},
		{
			enabled: ctx.snxData != null,
			...options,
		}
	);
};

export default useDailyBurnedQuery;
