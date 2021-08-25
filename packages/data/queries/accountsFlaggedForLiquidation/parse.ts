import { AccountFlaggedForLiquidation as UnformattedAccountFlaggedForLiquidation } from '../../generated/graphql';
import { AccountFlaggedForLiquidation } from '../../src/types';
import { formatEther, formatTimestamp } from '../../src/utils';

export const parseAccountsFlaggedForLiquidation = ({
	deadline,
	account,
	collateralRatio,
	liquidatableNonEscrowSNX,
	collateral,
}: UnformattedAccountFlaggedForLiquidation): AccountFlaggedForLiquidation => ({
	deadline: formatTimestamp(deadline),
	account,
	collateral: Number(formatEther(collateral)),
	collateralRatio: Number(formatEther(collateralRatio)),
	liquidatableNonEscrowSNX: Number(formatEther(liquidatableNonEscrowSNX)),
});
