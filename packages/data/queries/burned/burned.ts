import { gql } from 'graphql-request';
import { BurnedQueryParams } from '../../src/types';
import { createGQLWhereString } from '../../src/utils';

export const createBurnedQuery = ({
	account,
	minBlock,
	autoGeneratedPaginationField,
}: BurnedQueryParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			account: account != null ? 'account' : null,
			block_gte: minBlock != null ? 'minBlock' : null,
			timestamp_lt: autoGeneratedPaginationField != null ? 'autoGeneratedPaginationField' : null,
		})
	);

	return gql`
		query burneds($autoGeneratedPaginationField: Int, $minBlock: Int, $max: Int, $account: String) {
			burneds(
				first: $max
				where: ${whereString}
				orderBy: timestamp
				orderDirection: desc
			) {
        id
        account
        value
        source
        timestamp
        gasPrice
        block
			}
		}
	`;
};
