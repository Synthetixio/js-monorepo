import { SnxHolder } from '../../generated/graphql';
import { formatTimestamp, formatEther } from '../../src/utils';

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
	collateral: formatEther(collateral),
	balanceOf: formatEther(balanceOf),
	transferable: formatEther(transferable),
	initialDebtOwnership: formatEther(initialDebtOwnership),
	debtEntryAtIndex: formatEther(debtEntryAtIndex),
	mints: mints != null ? formatEther(mints) : null,
	claims: claims != null ? formatEther(claims) : null,
	timestamp: formatTimestamp(timestamp),
});
