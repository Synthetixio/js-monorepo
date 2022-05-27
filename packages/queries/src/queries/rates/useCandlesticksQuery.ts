import { Period, PERIOD_IN_HOURS } from '../../constants';
import request, { gql } from 'graphql-request';
import { useQuery, UseQueryOptions } from 'react-query';
import { Candle } from '../../types';
import { QueryContext } from '../../context';

import { calculateTimestampForPeriod } from './utils';

const RATES_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-rates';

const useCandlesticksQuery = (
	ctx: QueryContext,
	currencyKey: string | null,
	period: Period = Period.ONE_DAY,
	options?: UseQueryOptions<Array<Candle>>
) => {
	const periodInHours = PERIOD_IN_HOURS[period];

	// TODO: move to data library in js monorepo once L2 branch is merged
	return useQuery<Array<Candle>>(
		['rates', 'candlesticks', ctx.networkId, currencyKey, period],
		async () => {
			const candleGranularity = 'daily';
			const response = (await request(
				RATES_ENDPOINT,
				gql`
					query ${candleGranularity}Candles($synth: String!, $minTimestamp: BigInt!) {
						${candleGranularity}Candles(
							where: { synth: $synth, timestamp_gt: $minTimestamp }
							orderBy: id
							orderDirection: desc
						) {
							id
							synth
							open
							high
							low
							close
							timestamp
						}
					}
				`,
				{
					synth: currencyKey,
					minTimestamp: calculateTimestampForPeriod(periodInHours),
				}
			)) as {
				[key: string]: Array<Candle>;
			};
			return response[`${candleGranularity}Candles`].reverse();
		},
		{
			enabled: !!currencyKey,
			...options,
		}
	);
};

export default useCandlesticksQuery;
