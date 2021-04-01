import { gql } from 'graphql-request';
import { DebtSnapshotParams } from '../../src/types';
import { createGQLWhereString, createGQLBlockNumberString } from '../../src/utils';

export const createDebtSnapshotQuery = ({
	account,
	minBlock,
	maxBlock,
	autoGeneratedPaginationField,
	blockNumber,
}: DebtSnapshotParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			account: account != null ? 'account' : null,
			block_gte: minBlock != null ? 'minBlock' : null,
			block_lte: maxBlock != null ? 'maxBlock' : null,
			timestamp_lt: autoGeneratedPaginationField != null ? 'autoGeneratedPaginationField' : null,
		})
	);

	return gql`
		query debtSnapshots($autoGeneratedPaginationField: Int, $max: Int, $account: String, $minBlock: Int, $maxBlock: Int) {
			debtSnapshots(
				first: $max${createGQLBlockNumberString(blockNumber)}
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
