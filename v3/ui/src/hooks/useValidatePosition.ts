import Big from 'big.js';
import { useMemo } from 'react';
import { formatValue } from '@snx-v3/format';
import { CollateralType } from '@snx-v3/useCollateralTypes';

export const useValidatePosition = ({
  collateral,
  collateralAmount,
  collateralValue,
  debt,
  collateralChange,
  debtChange,
}: {
  collateral: CollateralType;
  collateralAmount: number;
  collateralValue: number;
  debt: number;
  collateralChange: number;
  debtChange: number;
}) => {
  const newDebt = debt + debtChange;
  const newCollateralAmount = collateralAmount + collateralChange;
  const cVal = new Big(collateralValue).div(collateralAmount || 1);
  const newCRatio = newDebt ? cVal.mul(newCollateralAmount).mul(100).div(newDebt).toNumber() : 0;
  const targetCRatio = formatValue(collateral.issuanceRatioD18 || 0, 18) * 100;

  const maxDebt = useMemo(
    () =>
      Math.max(
        0,
        new Big(newCollateralAmount).mul(cVal).mul(100).div(targetCRatio).minus(debt).toNumber()
      ),
    [cVal, newCollateralAmount, debt, targetCRatio]
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
