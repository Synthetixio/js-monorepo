import { gql } from 'graphql-request';
import { SynthExchangeQueryParams } from '../../src/types';
import { createGQLWhereString, createGQLBlockNumberString } from '../../src/utils';

export const createSynthExchangesQuery = (params?: SynthExchangeQueryParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			from: (params?.fromAddress ?? null) != null ? 'fromAddress' : null,
			block_lte: (params?.maxBlock ?? null) != null ? 'maxBlock' : null,
			timestamp_gte: (params?.minTimestamp ?? null) != null ? 'minTimestamp' : null,
			timestamp_lt:
				(params?.autoGeneratedPaginationField ?? null) != null
					? 'autoGeneratedPaginationField'
					: null,
		})
	);

	return gql`
		query synthExchanges($autoGeneratedPaginationField: Int, $maxBlock: Int, $max: Int, $fromAddress: String, $minTimestamp: Int) {
			synthExchanges(
				first: $max${createGQLBlockNumberString(params?.blockNumber ?? null)}
				where: ${whereString}
				orderBy: timestamp
				orderDirection: desc
			) {
				id
				account
				from
				fromCurrencyKey
				fromAmount
				fromAmountInUSD
				toCurrencyKey
				toAmount
				toAmountInUSD
				feesInUSD
				toAddress
				timestamp
				gasPrice
				block
				network
			}
		}
	`;
};
