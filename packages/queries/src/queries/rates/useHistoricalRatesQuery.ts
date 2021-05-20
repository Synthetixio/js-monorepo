import { useQuery, UseQueryOptions } from 'react-query';

import { CurrencyKey, Synths, sUSD_EXCHANGE_RATE } from '../../currency';
import { PERIOD_IN_HOURS, Period } from '../../constants';

import {
	calculateTimestampForPeriod,
	getMinAndMaxRate,
	calculateRateChange,
	mockHistoricalRates,
} from './utils';
import { HistoricalRatesUpdates } from './types';
import { QueryContext } from '../../context';

const useHistoricalRatesQuery = (
	ctx: QueryContext,
	currencyKey: CurrencyKey | null,
	period: Period = Period.ONE_DAY,
	options?: UseQueryOptions<HistoricalRatesUpdates>
) => {
	const periodInHours = PERIOD_IN_HOURS[period];

	return useQuery<HistoricalRatesUpdates>(
		['rates', 'historicalRates', ctx.networkId, currencyKey, period],
		async () => {
			if (currencyKey === Synths.sUSD) {
				return {
					rates: mockHistoricalRates(periodInHours, sUSD_EXCHANGE_RATE),
					low: sUSD_EXCHANGE_RATE,
					high: sUSD_EXCHANGE_RATE,
					change: 0,
				};
			} else {
				const rates = (await ctx.snxData!.rateUpdates({
					synth: currencyKey as string,
					// maxTimestamp: Math.trunc(now / 1000),
					minTimestamp: calculateTimestampForPeriod(periodInHours),
					max: 6000,
				}))!;

				const [low, high] = getMinAndMaxRate(rates);
				const change = calculateRateChange(rates);

				return {
					rates: rates.reverse(),
					low,
					high,
					change,
				};
			}
		},
		{
			enabled: !!ctx.snxData && !!currencyKey,
			...options,
		}
	);
};

export default useHistoricalRatesQuery;
