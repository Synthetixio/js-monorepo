import { useQuery, UseQueryOptions } from 'react-query';

import QUERY_KEYS from '../../queryKeys';
import { PERIOD_IN_HOURS, Period } from '../../constants';

import { calculateTimestampForPeriod } from './utils';
import { SynthExchanges } from './types';
import { QueryContext } from '../../context';

const useSynthExchangesSinceQuery = (
	ctx: QueryContext,
	period: Period = Period.ONE_DAY,
	options?: UseQueryOptions<SynthExchanges>
) => {
	const periodInHours = PERIOD_IN_HOURS[period];

	return useQuery<SynthExchanges>(
		QUERY_KEYS.Rates.SynthExchanges(period),
		async () =>
			ctx.snxData.exchanges.since({
				minTimestamp: calculateTimestampForPeriod(periodInHours),
			}),
		{
			...options,
		}
	);
};

export default useSynthExchangesSinceQuery;
