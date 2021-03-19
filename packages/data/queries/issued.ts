import { gql } from 'graphql-request';
import { IssuedQueryParams } from '../src/types';
import { createGQLWhereString } from '../src/utils';

export const createIssuedQuery = ({ account, minBlock }: IssuedQueryParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			account: account != null ? 'account' : null,
			block_gte: minBlock != null ? 'minBlock' : null,
		})
	);

	return gql`
		query issueds($minBlock: Int, $max: Int, $account: String) {
			issueds(
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
