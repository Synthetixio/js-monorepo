import { gql } from 'graphql-request';
import { FeesClaimedParams } from '../../src/types';
import { createGQLWhereString } from '../../src/utils';

export const createFeesClaimedQuery = ({ account }: FeesClaimedParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			account: account != null ? 'account' : null,
		})
	);

	return gql`
		query feesClaimeds($max: Int, $account: String) {
			feesClaimeds(
				first: $max
				where: ${whereString}
				orderBy: timestamp
				orderDirection: desc
			) {
        id
        account
        value
        rewards
        timestamp
        block
			}
		}
	`;
};
