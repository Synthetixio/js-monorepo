import { SnxHolder } from '../../generated/graphql';
import { formatTimestamp } from '../../src/utils';

export const parseSnxHolder = ({
	id,
	block,
	timestamp,
	balanceOf,
	collateral,
	transferable,
	initialDebtOwnership,
	debtEntryAtIndex,
	claims,
	mints,
}: SnxHolder): SnxHolder => ({
	block: Number(block),
	id,
	collateral: Number(collateral),
	balanceOf: Number(balanceOf),
	transferable: Number(transferable),
	initialDebtOwnership: Number(initialDebtOwnership),
	debtEntryAtIndex: debtEntryAtIndex ?? null,
	mints: mints != null ? Number(mints) : null,
	claims: claims != null ? Number(claims) : null,
	timestamp: formatTimestamp(timestamp),
});
