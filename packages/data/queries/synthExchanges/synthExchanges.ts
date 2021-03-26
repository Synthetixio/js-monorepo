import { gql } from 'graphql-request';
import { SynthExchangeQueryParams } from '../../src/types';
import { createGQLWhereString } from '../../src/utils';

export const createSynthExchangesQuery = ({
	fromAddress,
	minTimestamp,
	maxBlock,
}: SynthExchangeQueryParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			from: fromAddress != null ? 'fromAddress' : null,
			block_lte: maxBlock != null ? 'maxBlock' : null,
			timestamp_gte: minTimestamp != null ? 'minTimestamp' : null,
		})
	);

	return gql`
		query synthExchanges($maxBlock: Int, $max: Int, $fromAddress: String, $minTimestamp: Int) {
			synthExchanges(
				first: $max
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
