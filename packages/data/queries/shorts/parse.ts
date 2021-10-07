import { ShortCollateralChange, ShortLiquidation, ShortLoanChange } from '../../generated/graphql';
import { formatTimestamp, hexToAscii, formatEther } from '../../src/utils';
import { Short } from '../../src/types';

export const parseShort = ({
	id,
	account,
	txHash,
	collateralLocked,
	collateralLockedAmount,
	synthBorrowed,
	synthBorrowedAmount,
	createdAtBlock,
	createdAt,
	closedAt,
	isOpen,
	collateralChanges,
	liquidations,
	loanChanges,
	accruedInterestLastUpdateTimestamp,
}: Short): Short => ({
	id,
	account,
	txHash,
	collateralLocked: hexToAscii(collateralLocked),
	collateralLockedAmount: formatEther(collateralLockedAmount),
	synthBorrowed: hexToAscii(synthBorrowed),
	synthBorrowedAmount: formatEther(synthBorrowedAmount),
	createdAtBlock: Number(createdAtBlock),
	createdAt: formatTimestamp(createdAt),
	closedAt: closedAt != null ? formatTimestamp(closedAt) : null,
	isOpen: Boolean(isOpen),
	collateralChanges: (collateralChanges ?? []).map(parseShortCollateralChanges),
	liquidations: (liquidations ?? []).map(parseShortLiquidations),
	loanChanges: (loanChanges ?? []).map(parseShortLoanChanges),
	accruedInterestLastUpdateTimestamp: formatTimestamp(accruedInterestLastUpdateTimestamp),
});

export const parseShortLiquidations = ({
	id,
	isClosed,
	liquidatedAmount,
	liquidatedCollateral,
	liquidator,
	timestamp,
	blockNumber,
}: Omit<ShortLiquidation, 'short'>): Omit<ShortLiquidation, 'short'> => ({
	id,
	isClosed: Boolean(isClosed),
	liquidatedAmount: formatEther(liquidatedAmount),
	liquidatedCollateral: formatEther(liquidatedCollateral),
	liquidator,
	timestamp: formatTimestamp(timestamp),
	blockNumber: Number(blockNumber),
});

export const parseShortCollateralChanges = ({
	amount,
	collateralAfter,
	id,
	isDeposit,
	timestamp,
	blockNumber,
}: Omit<ShortCollateralChange, 'short'>): Omit<ShortCollateralChange, 'short'> => ({
	amount: formatEther(amount),
	collateralAfter: formatEther(collateralAfter),
	id,
	isDeposit: Boolean(isDeposit),
	timestamp: formatTimestamp(timestamp),
	blockNumber: Number(blockNumber),
});

export const parseShortLoanChanges = ({
	amount,
	id,
	isRepayment,
	loanAfter,
	timestamp,
	blockNumber,
}: Omit<ShortLoanChange, 'short'>): Omit<ShortLoanChange, 'short'> => ({
	amount: formatEther(amount),
	id,
	isRepayment: Boolean(isRepayment),
	loanAfter: formatEther(loanAfter),
	timestamp: formatTimestamp(timestamp),
	blockNumber: Number(blockNumber),
});
