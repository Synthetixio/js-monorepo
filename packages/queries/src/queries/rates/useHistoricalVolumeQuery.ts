import { useQuery, UseQueryOptions } from 'react-query';
import { wei } from '@synthetixio/wei';

import { PERIOD_IN_HOURS, Period } from '../../constants';

import { calculateTimestampForPeriod } from './utils';
import { QueryContext } from '../../context';
import { HistoricalVolume } from '../../types';
import { CurrencyKey } from '../../currency';

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
			}))! as {
				fromCurrencyKey: CurrencyKey;
				toCurrencyKey: CurrencyKey;
				fromAmountInUSD: number;
				toAmountInUSD: number;
			}[];

			return exchanges.reduce(
				(totalVol, { fromCurrencyKey, toCurrencyKey, fromAmountInUSD, toAmountInUSD }) => {
					if (totalVol[fromCurrencyKey] != null) {
						totalVol[fromCurrencyKey] = totalVol[fromCurrencyKey].add(fromAmountInUSD);
					} else {
						totalVol[fromCurrencyKey] = wei(fromAmountInUSD);
					}
					if (totalVol[toCurrencyKey] != null) {
						totalVol[toCurrencyKey] = totalVol[toCurrencyKey].add(toAmountInUSD);
					} else {
						totalVol[toCurrencyKey] = wei(toAmountInUSD);
					}
					return totalVol;
				},
				{} as HistoricalVolume
			);
		},
		{
			enabled: !!ctx.snxData,
			...options,
		}
	);
};

export default useHistoricalVolumeQuery;
