import { formatNumber } from '@snx-v2/formatters';
import Wei, { wei } from '@synthetixio/wei';

export const calculateStakedSnx = ({
  targetCRatio,
  currentCRatio,
  collateral,
}: {
  targetCRatio?: Wei;
  currentCRatio?: Wei;
  collateral?: Wei;
}) => {
  if (targetCRatio?.gt(0) && currentCRatio?.gt(0) && collateral) {
    return collateral.mul(Wei.min(wei(1), currentCRatio.div(targetCRatio)));
  }
  return wei(0);
};
export const calculateUnstakedStakedSnx = ({
  targetCRatio,
  currentCRatio,
  collateral,
}: {
  targetCRatio?: Wei;
  currentCRatio?: Wei;
  collateral?: Wei;
}) =>
  collateral
    ? collateral.sub(calculateStakedSnx({ targetCRatio, currentCRatio, collateral }))
    : wei(0);

const calculateDebtFromCollateral = (
  collateral: string,
  targetCRatio?: number,
  collateralPrice?: number
) => {
  const num = parseFloat(collateral);
  if (isNaN(num)) return '';
  if (!targetCRatio || !collateralPrice) return '';

  return formatNumber(num * targetCRatio * collateralPrice);
};

const calculateCollateralFromDebt = (
  debtUsd: string,
  targetCRatio?: number,
  collateralPrice?: number
) => {
  const num = parseFloat(debtUsd);
  if (isNaN(num)) return '';
  if (!targetCRatio || !collateralPrice) return '';

  return formatNumber(num / targetCRatio / collateralPrice);
};

// Even though the logic is the same for mint and burn I think it make sense to export nicer named functions
export const calculateUnstakingAmountFromBurn = calculateCollateralFromDebt;
export const calculateBurnAmountFromUnstaking = calculateDebtFromCollateral;
export const calculateMintAmountFromStaking = calculateDebtFromCollateral;
export const calculateStakeAmountFromMint = calculateCollateralFromDebt;
