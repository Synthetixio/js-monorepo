import { gql } from 'graphql-request';
import { BinaryOptionsMarketsParams } from '../../src/types';
import { createGQLWhereString, createGQLBlockNumberString } from '../../src/utils';

export const createBinaryOptionsMarketsQuery = (params?: BinaryOptionsMarketsParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			creator: (params?.creator ?? null) != null ? 'creator' : null,
			isOpen: (params?.isOpen ?? null) != null ? 'isOpen' : null,
			timestamp_gte: (params?.minTimestamp ?? null) != null ? 'minTimestamp' : null,
			timestamp_lte: (params?.maxTimestamp ?? null) != null ? 'maxTimestamp' : null,
		})
	);

	return gql`
		query markets($max: Int, $creator: String, $isOpen: Boolean, $minTimestamp: Int, $maxTimestamp: Int) {
			markets(
				first: $max${createGQLBlockNumberString(params?.blockNumber ?? null)}
				where: ${whereString}
				orderBy: biddingEndDate
				orderDirection: desc
			) {
				id
				timestamp
				creator
				currencyKey
				strikePrice
				biddingEndDate
				maturityDate
				expiryDate
				isOpen
				longPrice
				shortPrice
				poolSize
				result
			}
		}
	`;
};
