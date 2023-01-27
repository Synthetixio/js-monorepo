import { Wei, wei } from '@synthetixio/wei';

export const validatePosition = ({
  issuanceRatioD18,
  collateralAmount,
  collateralValue,
  debt,
  collateralChange,
  debtChange,
}: {
  issuanceRatioD18?: Wei;
  collateralAmount?: Wei;
  collateralValue?: Wei;
  debt?: Wei;
  collateralChange: Wei;
  debtChange: Wei;
}) => {
  const targetCRatio = issuanceRatioD18 ? issuanceRatioD18 : wei(1);
  const newDebt = wei(debt || 0).add(debtChange);
  const newCollateralAmount = wei(collateralAmount || 0).add(
    collateralChange.gt(0) ? collateralChange : wei(0)
  );
  const cVal = wei(collateralValue || 0).div(collateralAmount?.gt(0) ? collateralAmount : wei(1));
  const newCRatio = newDebt.gt(0) ? cVal.mul(newCollateralAmount).div(newDebt) : wei(0);
  const maybeMaxDebt = wei(newCollateralAmount)
    .mul(cVal)
    .div(targetCRatio)
    .sub(debt || 0);

  const maxDebt = maybeMaxDebt.gte(0) ? maybeMaxDebt : wei(0);

  const isValid =
    (newCRatio.gte(targetCRatio) || newCRatio.lte(0)) &&
    (newDebt.eq(0) || newCollateralAmount.gt(0));

  return {
    isValid,
    hasChanges: !collateralChange.eq(0) || !debtChange.eq(0),
    targetCRatio,
    newCRatio,
    newDebt,
    newCollateralAmount,
    maxDebt,
  };
};
