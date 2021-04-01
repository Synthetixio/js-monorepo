import { gql } from 'graphql-request';
import { SnxHolderParams } from '../../src/types';
import { createGQLWhereString } from '../../src/utils';

export const createSnxHolderQuery = ({
	maxCollateral,
	minCollateral,
	address,
	minMints,
	minClaims,
}: SnxHolderParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			id: address != null ? 'address' : null,
			collateral_gte: minCollateral != null ? 'minCollateral' : null,
			collateral_lte: maxCollateral != null ? 'maxCollateral' : null,
			mints_gte: minMints != null ? 'minMints' : null,
			claims_gte: minClaims != null ? 'minClaims' : null,
		})
	);

	return gql`
		query snxholders($max: Int, $minCollateral: Int, $minClaims: Int, $minMints: Int, $maxCollateral: Int, $address: String) {
			snxholders(
				first: $max
				where: ${whereString}
				orderBy: collateral
				orderDirection: desc
			) {
				id
        collateral
        block
        timestamp
        balanceOf
        transferable
        initialDebtOwnership
        debtEntryAtIndex
        mints
        claims
			}
		}
	`;
};
