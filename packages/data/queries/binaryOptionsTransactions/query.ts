import { gql } from 'graphql-request';
import { BinaryOptionsTransactionsParams } from '../../src/types';
import { createGQLWhereString, createGQLBlockNumberString } from '../../src/utils';

export const createBinaryOptionTransactionsQuery = (
	params?: BinaryOptionsTransactionsParams
): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			market: (params?.market ?? null) != null ? 'market' : null,
			account: (params?.account ?? null) != null ? 'account' : null,
		})
	);

	return gql`
		query optionTransactions($market: String, $account: String, $max: Int) {
			optionTransactions(
				first: $max${createGQLBlockNumberString(params?.blockNumber ?? null)}
				where: ${whereString}
				orderBy: timestamp
				orderDirection: desc
			) {
				id
				timestamp
				type
				account
				currencyKey
				side
				amount
				market
				fee
			}
		}
	`;
};
