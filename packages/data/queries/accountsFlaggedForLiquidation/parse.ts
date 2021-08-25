import { AccountFlaggedForLiquidation as UnformattedAccountForLiquidation } from '../../generated/graphql';
import { AccountForLiquidation } from '../../src/types';
import { formatEther, formatTimestamp } from '../../src/utils';

export const parseAccountsFlaggedForLiquidation = ({
	deadline,
	account,
	collateralRatio,
	liquidatableNonEscrowSNX,
	collateral,
}: UnformattedAccountForLiquidation): AccountForLiquidation => ({
	deadline: formatTimestamp(deadline),
	account,
	collateral: Number(formatEther(collateral)),
	collateralRatio: Number(formatEther(collateralRatio)),
	liquidatableNonEscrowSNX: Number(formatEther(liquidatableNonEscrowSNX)),
});
