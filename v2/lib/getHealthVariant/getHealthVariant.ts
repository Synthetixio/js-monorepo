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

export function badgeColor(healthVariant: string) {
  switch (healthVariant) {
    case 'success':
      return {
        color: 'green.400',
        border: 'green.900',
      };

    case 'warning':
      return {
        color: 'orange.400',
        border: 'orange.900',
      };

    case 'error':
      return {
        color: 'red.400',
        border: 'red.900',
      };

    default:
      return {
        color: 'green.400',
        border: 'green.900',
      };
  }
}
