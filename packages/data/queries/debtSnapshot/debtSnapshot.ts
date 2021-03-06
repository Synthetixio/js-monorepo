import { gql } from 'graphql-request';
import { DebtSnapshotParams } from '../../src/types';
import { createGQLWhereString, createGQLBlockNumberString } from '../../src/utils';

export const createDebtSnapshotQuery = (params?: DebtSnapshotParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			account: (params?.account ?? null) != null ? 'account' : null,
			block_gte: (params?.minBlock ?? null) != null ? 'minBlock' : null,
			block_lte: (params?.maxBlock ?? null) != null ? 'maxBlock' : null,
			timestamp_lt:
				(params?.autoGeneratedPaginationField ?? null) != null
					? 'autoGeneratedPaginationField'
					: null,
		})
	);

	return gql`
		query debtSnapshots($autoGeneratedPaginationField: Int, $max: Int, $account: String, $minBlock: Int, $maxBlock: Int) {
			debtSnapshots(
				first: $max${createGQLBlockNumberString(params?.blockNumber ?? null)}
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
