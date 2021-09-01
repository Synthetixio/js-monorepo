import { gql } from 'graphql-request';
import { ExchangeTotalsParams } from '../../src/types';
import { createGQLBlockNumberString } from '../../src/utils';

export const ENTITY_MAP: Record<string, string> = {
	'1d': 'dailyTotals',
	'15m': 'fifteenMinuteTotals',
	all: 'totals',
};

export const createExchangeTotalsQuery = (params: ExchangeTotalsParams): string => {
	const query = getExchangeTotalsQueryResponseAttr(params.timeSeries); // throw if undefined?
	return gql`
		query ${query}($autoGeneratedPaginationField: Int, $max: Int) {
			${query}(
				first: $max${createGQLBlockNumberString(params?.blockNumber ?? null)}
				orderBy: id
				orderDirection: desc
			) {
				id
				trades
				exchangers
				exchangeUSDTally
				totalFeesGeneratedInUSD
			}
		}
	`;
};

export function getExchangeTotalsQueryResponseAttr(timeSeries: string): string {
	return ENTITY_MAP[timeSeries];
}
