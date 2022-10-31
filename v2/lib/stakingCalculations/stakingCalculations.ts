import { formatNumber, parseFloatWithCommas } from '@snx-v2/formatters';
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
  const num = parseFloatWithCommas(collateral);
  if (isNaN(num)) return '';
  if (!targetCRatio || !collateralPrice) return '';

  return formatNumber(num * targetCRatio * collateralPrice);
};

const calculateCollateralFromDebt = (
  debtUsd: string,
  targetCRatio?: number,
  collateralPrice?: number
) => {
  const num = parseFloatWithCommas(debtUsd);
  if (isNaN(num)) return '';
  if (!targetCRatio || !collateralPrice) return '';

  return formatNumber(num / targetCRatio / collateralPrice);
};

// Even though the logic is the same for mint and burn I think it make sense to export nicer named functions
export const calculateUnstakingAmountFromBurn = calculateCollateralFromDebt;
export const calculateBurnAmountFromUnstaking = calculateDebtFromCollateral;
export const calculateMintAmountFromStaking = calculateDebtFromCollateral;
export const calculateStakeAmountFromMint = calculateCollateralFromDebt;

export const calculateChangesFromMint = ({
  stakeAmountSNX,
  mintAmountsUSD,
  debtBalance,
  stakedSnx,
  transferable,
  sUSDBalance,
  collateralUsdValue,
}: {
  stakeAmountSNX: number;
  mintAmountsUSD: number;
  debtBalance: number;
  stakedSnx: number;
  transferable: number;
  sUSDBalance: number;
  collateralUsdValue: number;
}) => {
  const newDebtBalance = debtBalance + mintAmountsUSD;
  const newStakedAmountSnx = stakedSnx + stakeAmountSNX;
  const newCratio = newDebtBalance / collateralUsdValue;
  const newTransferable = Math.max(transferable - stakeAmountSNX, 0);
  const newSUSDBalance = sUSDBalance + mintAmountsUSD;

  return { newDebtBalance, newStakedAmountSnx, newCratio, newTransferable, newSUSDBalance };
};

export const calculateChangesFromBurn = ({
  snxUnstakingAmount,
  burnAmountSusd,
  debtBalance,
  stakedSnx,
  transferable,
  sUSDBalance,
  collateralUsdValue,
  collateral,
}: {
  snxUnstakingAmount: number;
  burnAmountSusd: number;
  debtBalance: number;
  stakedSnx: number;
  transferable: number;
  sUSDBalance: number;
  collateralUsdValue: number;
  collateral: number;
}) => {
  const newDebtBalance = Math.max(debtBalance - burnAmountSusd, 0);
  const newStakedAmountSnx = Math.max(stakedSnx - snxUnstakingAmount, 0);
  const newCratio = newDebtBalance / collateralUsdValue || 0;
  const escrowedSnx = collateral - stakedSnx - transferable;
  const maxTransferable = collateral - escrowedSnx;
  const newTransferable = Math.min(transferable + snxUnstakingAmount, maxTransferable);
  const newSUSDBalance = Math.max(sUSDBalance - burnAmountSusd, 0);
  return { newDebtBalance, newStakedAmountSnx, newCratio, newTransferable, newSUSDBalance };
};
