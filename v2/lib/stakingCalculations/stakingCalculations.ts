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
  collateral: number,
  targetCRatio?: number,
  collateralPrice?: number
) => {
  if (!targetCRatio || !collateralPrice) return undefined;

  return collateral * targetCRatio * collateralPrice;
};

const calculateCollateralFromDebt = (
  debtUsd: number,
  targetCRatio?: number,
  collateralPrice?: number
) => {
  if (!targetCRatio || !collateralPrice) return undefined;

  return debtUsd / targetCRatio / collateralPrice;
};

export const calculateUnstakingAmountFromBurn = ({
  burnAmount,
  targetCRatio,
  collateralPrice,
  debtBalance,
  issuableSynths,
}: {
  burnAmount: number;
  targetCRatio: number;
  collateralPrice: number;
  debtBalance: number;
  issuableSynths: number;
}) => {
  const debtToGetBackToTarget = Math.max(debtBalance - issuableSynths, 0);
  const burnAmountAfterDebtIsCleared = burnAmount - debtToGetBackToTarget;
  if (burnAmountAfterDebtIsCleared <= 0) {
    return 0;
  }
  const newUnstakingAmount = calculateCollateralFromDebt(
    burnAmountAfterDebtIsCleared,
    targetCRatio,
    collateralPrice
  );
  if (newUnstakingAmount === undefined) return undefined;

  return Math.max(newUnstakingAmount, 0);
};

export const calculateBurnAmountFromUnstaking = ({
  unStakingAmount,
  targetCRatio,
  collateralPrice,
  debtBalance,
  issuableSynths,
}: {
  unStakingAmount: number;
  targetCRatio?: number;
  collateralPrice?: number;
  debtBalance: number;
  issuableSynths: number;
}) => {
  const debtToGetBackToTarget = Math.max(debtBalance - issuableSynths, 0);
  const newBurnAmount = calculateDebtFromCollateral(unStakingAmount, targetCRatio, collateralPrice);
  if (newBurnAmount === undefined) return undefined;
  return newBurnAmount + debtToGetBackToTarget;
};
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
  burnAmountSusd,
  debtBalance,
  stakedSnx,
  transferable,
  sUSDBalance,
  collateralUsdValue,
  collateral,
  targetCRatio,
}: {
  burnAmountSusd: number;
  debtBalance: number;
  stakedSnx: number;
  transferable: number;
  sUSDBalance: number;
  collateralUsdValue: number;
  collateral: number;
  targetCRatio: number;
}) => {
  const newDebtBalance = Math.max(debtBalance - burnAmountSusd, 0);
  const newCratio = newDebtBalance / collateralUsdValue || 0;
  const newStakedAmountSnx = calculateStakedSnx({
    currentCRatio: wei(newCratio),
    targetCRatio: wei(targetCRatio),
    collateral: wei(collateral),
  }).toNumber();

  const escrowedSnx = collateral - stakedSnx - transferable;
  const newTransferable = collateral - escrowedSnx - newStakedAmountSnx;

  const newSUSDBalance = Math.max(sUSDBalance - burnAmountSusd, 0);
  return { newDebtBalance, newStakedAmountSnx, newCratio, newTransferable, newSUSDBalance };
};

export const calculateValueOfRewards = (
  snxReward = wei(0),
  sUSDRewards = wei(0),
  snxRate = wei(0)
) => {
  const valueOfSnxReward = snxReward.mul(snxRate);
  return valueOfSnxReward.add(sUSDRewards).toNumber();
};
