import { Text, Box } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { FC } from 'react';
import { CollateralType } from '../../../../utils/types';

interface Props {
  collateral: CollateralType;
  collateralAmount: number;
  collateralValue: number;
  debt: number;
  cRatio: number;

  collateralChange: number;
  debtChange: number;
}

export const Preview: FC<Props> = ({
  collateral,
  collateralAmount,
  collateralValue,
  cRatio,
  debt,
  collateralChange,
  debtChange,
}) => {
  const newDebt = debt + debtChange;
  const newCollateralAmount = collateralAmount + collateralChange;
  const cVal = BigNumber.from(collateralValue).div(collateralAmount);
  const newCRatio = newDebt ? cVal.mul(newCollateralAmount).mul(100).div(newDebt) : 0;

  return (
    <Box mb="4" p="4">
      <Text
        fontSize="sm"
        pb="2"
        fontWeight="semibold"
        borderBottom="1px solid rgba(255,255,255,0.2)"
      >
        Preview Changes
      </Text>
      <Box py="2" borderBottom="1px solid rgba(255,255,255,0.2)">
        <strong>Collateral</strong>
        <Text color="green.400" float="right">
          {collateralAmount.toString()} {collateral.symbol} → {newCollateralAmount.toString()}{' '}
          {collateral.symbol}
        </Text>
      </Box>
      <Box py="2" borderBottom="1px solid rgba(255,255,255,0.2)">
        <strong>snxUSD Debt</strong>
        <Text color="green.400" float="right">
          ${debt.toString()} → ${newDebt.toString()}
        </Text>
      </Box>
      <Box py="2" borderBottom="1px solid rgba(255,255,255,0.2)">
        <strong>C-Ratio</strong>
        <Text color="green.400" float="right">
          {cRatio.toString()}% → {newCRatio.toString()}%
        </Text>
      </Box>
    </Box>
  );
};
