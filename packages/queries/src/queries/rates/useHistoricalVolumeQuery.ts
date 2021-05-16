import { useQuery, QueryConfig } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';

import QUERY_KEYS from '../../queryKeys';
import { CurrencyKey } from '../../currency';
import { PERIOD_IN_HOURS, Period } from '../../constants';

import { calculateTimestampForPeriod } from './utils';
import { SynthExchanges } from './types';
import { QueryContext } from '../../context';

type HistoricalVolume = Record<CurrencyKey, Wei>;

const useHistoricalVolumeQuery = (
	ctx: QueryContext,
	period: Period = Period.ONE_DAY,
	options?: QueryConfig<HistoricalVolume>
) => {
	const periodInHours = PERIOD_IN_HOURS[period];

	return useQuery<HistoricalVolume>(
		QUERY_KEYS.Rates.HistoricalVolume(period),
		async () => {
			const exchanges = (await ctx.snxData.exchanges.since({
				minTimestamp: calculateTimestampForPeriod(periodInHours),
			})) as SynthExchanges;

			return exchanges.reduce((totalVol, { fromCurrencyKey, toCurrencyKey, fromAmountInUSD }) => {
				if (totalVol[fromCurrencyKey] != null) {
					totalVol[fromCurrencyKey] = totalVol[fromCurrencyKey].plus(fromAmountInUSD);
				} else {
					totalVol[fromCurrencyKey] = wei(0);
				}
				if (totalVol[toCurrencyKey] != null) {
					totalVol[toCurrencyKey] = totalVol[toCurrencyKey].plus(fromAmountInUSD);
				} else {
					totalVol[toCurrencyKey] = wei(0);
				}
				return totalVol;
			}, {} as HistoricalVolume);
		},
		options
	);
};

export default useHistoricalVolumeQuery;
