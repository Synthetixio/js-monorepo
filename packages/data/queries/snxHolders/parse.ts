import { ethers } from 'ethers';
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
	collateral: collateral,
	balanceOf: balanceOf,
	transferable: transferable,
	initialDebtOwnership: ethers.utils.formatEther(initialDebtOwnership),
	debtEntryAtIndex: ethers.utils.formatEther(debtEntryAtIndex),
	mints: mints != null ? ethers.utils.formatEther(mints) : null,
	claims: claims != null ? ethers.utils.formatEther(claims) : null,
	timestamp: formatTimestamp(timestamp),
});
