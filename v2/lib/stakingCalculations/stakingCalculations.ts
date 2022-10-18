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

export const calculateUnstakingAmountFromBurn = (
  susdToBurn: string,
  targetCRatio?: number,
  SNXPrice?: number
) => {
  const num = parseFloat(susdToBurn);
  if (isNaN(num)) return '';
  if (!targetCRatio || !SNXPrice) return '';

  return formatNumber(num / targetCRatio / SNXPrice);
};

export const calculateBurnAmountFromUnstaking = (
  snxToUnstake: string,
  targetCRatio?: number,
  SNXPrice?: number
) => {
  const num = parseFloat(snxToUnstake);
  if (isNaN(num)) return '';
  if (!targetCRatio || !SNXPrice) return '';

  return formatNumber(num * targetCRatio * SNXPrice);
};
