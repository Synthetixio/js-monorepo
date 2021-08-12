import { useQuery, UseQueryOptions } from 'react-query';
import { DailyTotalActiveStakers } from '@synthetixio/data/build/node/src/types';
import { QueryContext } from '../../context';

export const useDailyTotalActiveStakersQuery = (
	ctx: QueryContext,
	args: any,
	options?: UseQueryOptions<DailyTotalActiveStakers[] | null>
) => {
	return useQuery<DailyTotalActiveStakers[] | null>(
		['staking', 'dailyTotalActiveStakers', args],
		() => ctx.snxData!.dailyTotalActiveStakers(args),
		{
			enabled: ctx.snxData != null,
			...options,
		}
	);
};

export default useDailyTotalActiveStakersQuery;
