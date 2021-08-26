import { useQuery, UseQueryOptions } from 'react-query';

import { PERIOD_IN_HOURS, Period } from '../../constants';
import { QueryContext } from '../../context';
import { calculateTimestampForPeriod } from './utils';

const useSynthExchangesSinceQuery = (
	ctx: QueryContext,
	period: Period = Period.ONE_DAY,
	options?: UseQueryOptions
) => {
	const periodInHours = PERIOD_IN_HOURS[period];

	return useQuery(
		['rates', 'synthExchangesSince', ctx.networkId, period],
		async () => {
			return (await ctx.snxData!.synthExchanges({
				minTimestamp: calculateTimestampForPeriod(periodInHours),
			}))!;
		},
		{
			enabled: !!ctx.snxData,
			...options,
		}
	);
};

export default useSynthExchangesSinceQuery;
