import { gql } from 'graphql-request';
import { AccountsFlaggedForLiquidationParams } from '../../src/types';
import { createGQLWhereString, createGQLBlockNumberString } from '../../src/utils';

export const createAccountsFlaggedForLiquidationQuery = (
	params?: AccountsFlaggedForLiquidationParams
): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			account: (params?.account ?? null) != null ? 'account' : null,
			deadline_gte: (params?.minTimestamp ?? null) != null ? 'minTimestamp' : null,
			deadline_lte: (params?.maxTimestamp ?? null) != null ? 'maxTimestamp' : null,
		})
	);

	return gql`
		query accountFlaggedForLiquidations($max: Int, $account: String, $minTimestamp: Int, $maxTimestamp: Int) {
			accountFlaggedForLiquidations(
				first: $max${createGQLBlockNumberString(params?.blockNumber ?? null)}
				where: ${whereString}
				orderBy: deadline
				orderDirection: asc
			) {
				deadline
				account
				collateralRatio
				liquidatableNonEscrowSNX
				collateral
			}
		}
	`;
};
