export const getHealthVariant = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
}: {
  liquidationCratioPercentage: number;
  targetCratioPercentage: number;
  currentCRatioPercentage: number;
}) => {
  if (currentCRatioPercentage === 0) return 'success';
  if (currentCRatioPercentage < liquidationCratioPercentage) return 'error';
  if (currentCRatioPercentage < targetCratioPercentage) return 'warning';
  return 'success';
};
