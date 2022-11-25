export const getHealthVariant = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
  targetThreshold = 0.01,
}: {
  liquidationCratioPercentage: number | undefined;
  targetCratioPercentage: number | undefined;
  currentCRatioPercentage: number | undefined;
  targetThreshold: number | undefined;
}) => {
  if (!liquidationCratioPercentage || !targetCratioPercentage || !currentCRatioPercentage)
    return 'success';
  if (currentCRatioPercentage === 0) return 'success';
  const currentCRatioPercentageWithThresHold = currentCRatioPercentage * (1 + targetThreshold);
  // You can claim rewards when you below target but within the targetThreshold, the threshold does NOT apply to the liquidationRatio
  if (currentCRatioPercentage < liquidationCratioPercentage) return 'error';
  if (currentCRatioPercentageWithThresHold < targetCratioPercentage) return 'warning';
  return 'success';
};
