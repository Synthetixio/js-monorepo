export const getHealthVariant = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
}: {
  liquidationCratioPercentage: number | undefined;
  targetCratioPercentage: number | undefined;
  currentCRatioPercentage: number | undefined;
}) => {
  if (!liquidationCratioPercentage || !targetCratioPercentage || !currentCRatioPercentage)
    return 'success';
  if (currentCRatioPercentage === 0) return 'success';
  if (currentCRatioPercentage < liquidationCratioPercentage) return 'error';
  if (currentCRatioPercentage < targetCratioPercentage) return 'warning';
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
