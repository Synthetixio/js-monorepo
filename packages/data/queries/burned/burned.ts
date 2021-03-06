import { gql } from 'graphql-request';
import { BurnedQueryParams } from '../../src/types';
import { createGQLWhereString, createGQLBlockNumberString } from '../../src/utils';

export const createBurnedQuery = (params?: BurnedQueryParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			account: (params?.account ?? null) != null ? 'account' : null,
			block_gte: (params?.minBlock ?? null) != null ? 'minBlock' : null,
			timestamp_lt:
				(params?.autoGeneratedPaginationField ?? null) != null
					? 'autoGeneratedPaginationField'
					: null,
		})
	);

	return gql`
		query burneds($autoGeneratedPaginationField: Int, $minBlock: Int, $max: Int, $account: String) {
			burneds(
				first: $max${createGQLBlockNumberString(params?.blockNumber ?? null)}
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
