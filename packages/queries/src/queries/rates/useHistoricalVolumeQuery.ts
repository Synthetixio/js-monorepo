import { useQuery, UseQueryOptions } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';

import { CurrencyKey } from '../../currency';
import { PERIOD_IN_HOURS, Period } from '../../constants';

import { calculateTimestampForPeriod } from './utils';
import { QueryContext } from '../../context';

type HistoricalVolume = Record<CurrencyKey, Wei>;

const useHistoricalVolumeQuery = (
	ctx: QueryContext,
	period: Period = Period.ONE_DAY,
	options?: UseQueryOptions<HistoricalVolume>
) => {
	const periodInHours = PERIOD_IN_HOURS[period];

	return useQuery<HistoricalVolume>(
		['rates', 'historicalVolume', ctx.networkId, period],
		async () => {
			const exchanges = (await ctx.snxData!.synthExchanges({
				minTimestamp: calculateTimestampForPeriod(periodInHours),
			}))!;

			return exchanges.reduce((totalVol, { fromCurrencyKey, toCurrencyKey, fromAmountInUSD }) => {
				if (totalVol[fromCurrencyKey] != null) {
					totalVol[fromCurrencyKey] = totalVol[fromCurrencyKey].add(fromAmountInUSD);
				} else {
					totalVol[fromCurrencyKey] = wei(0);
				}
				if (totalVol[toCurrencyKey] != null) {
					totalVol[toCurrencyKey] = totalVol[toCurrencyKey].add(fromAmountInUSD);
				} else {
					totalVol[toCurrencyKey] = wei(0);
				}
				return totalVol;
			}, {} as HistoricalVolume);
		},
		{
			enabled: !!ctx.snxData,
			...options
		}
	);
};

export default useHistoricalVolumeQuery;
