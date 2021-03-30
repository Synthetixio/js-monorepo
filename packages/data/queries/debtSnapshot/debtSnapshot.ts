import { gql } from 'graphql-request';
import { DebtSnapshotParams } from '../../src/types';
import { createGQLWhereString } from '../../src/utils';

export const createDebtSnapshotQuery = ({
	account,
	minBlock,
	maxBlock,
}: DebtSnapshotParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			account: account != null ? 'account' : null,
			block_gte: minBlock != null ? 'minBlock' : null,
			block_lte: maxBlock != null ? 'maxBlock' : null,
		})
	);

	return gql`
		query debtSnapshots($max: Int, $account: String, $minBlock: Int, $maxBlock: Int) {
			debtSnapshots(
				first: $max
				where: ${whereString}
				orderBy: timestamp
				orderDirection: desc
			) {
        id
        account
        timestamp
        block
        collateral
        debtBalanceOf
        balanceOf
			}
		}
	`;
};
