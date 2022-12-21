import Big from 'big.js';
import { useMemo } from 'react';
import { formatValue } from '../utils/helpers';
import { CollateralType } from '../utils/types';

interface IPosition {
  collateral: CollateralType;
  collateralAmount: number;
  collateralValue: number;
  debt: number;
}
export const useValidatePosition = (
  position: IPosition,
  collateralChange: number,
  debtChange: number
) => {
  const { debt, collateral, collateralAmount, collateralValue } = position;
  const newDebt = debt + debtChange;
  const newCollateralAmount = collateralAmount + collateralChange;
  const cVal = new Big(collateralValue).div(collateralAmount || 1);
  const newCRatio = newDebt ? cVal.mul(newCollateralAmount).mul(100).div(newDebt).toNumber() : 0;

  const targetCRatio = formatValue(collateral.issuanceRatioD18 || 0, 6) * 100;

  const maxDebt = useMemo(
    () =>
      Math.max(
        0,
        new Big(newCollateralAmount)
          .mul(cVal)
          .mul(100)
          .div(targetCRatio)
          .minus(position.debt)
          .toNumber()
      ),
    [cVal, newCollateralAmount, position.debt, targetCRatio]
  );

  const isValid = useMemo(
    () =>
      (newCRatio >= targetCRatio || newCRatio <= 0) && (newDebt === 0 || newCollateralAmount > 0),
    [newCRatio, newCollateralAmount, newDebt, targetCRatio]
  );

  return {
    noChange: !debtChange && !collateralChange,
    isValid,
    targetCRatio,
    newCRatio,
    newDebt,
    newCollateralAmount,
    maxDebt,
  };
};
