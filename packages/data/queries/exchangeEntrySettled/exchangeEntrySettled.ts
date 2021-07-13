import { gql } from 'graphql-request';
import { ExchangeEntrySettledParams } from '../../src/types';
import { createGQLWhereString, createGQLBlockNumberString } from '../../src/utils';

export const createExchangeEntrySettledQuery = (params?: ExchangeEntrySettledParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			from: (params?.from ?? null) != null ? 'from' : null,
			exchangeTimestamp_gte:
				(params?.minExchangeTimestamp ?? null) != null ? 'minExchangeTimestamp' : null,
			exchangeTimestamp_lte:
				(params?.maxExchangeTimestamp ?? null) != null ? 'maxExchangeTimestamp' : null,
		})
	);

	return gql`
		query exchangeEntrySettleds($from: String, $minExchangeTimestamp: Int, $maxExchangeTimestamp: Int) {
			issueds(
				first: $max${createGQLBlockNumberString(params?.blockNumber ?? null)}
				where: ${whereString}
				orderBy: exchangeTimestamp
				orderDirection: desc
			) {
        id
        from
        src
        amount
        dest
        reclaim
        rebate
        srcRoundIdAtPeriodEnd
        destRoundIdAtPeriodEnd
        exchangeTimestamp
			}
		}
	`;
};
