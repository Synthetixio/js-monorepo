import { Text, Box, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { CollateralType } from '../../../../utils/types';
import { useValidatePosition } from '../../../../hooks/useValidatePosition';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { CRatio } from './CRatio';

interface Props {
  collateral: CollateralType;
  collateralAmount: number;
  collateralValue: number;
  debt: number;
  cRatio: number;
  collateralChange: number;
  debtChange: number;
}

const getColor = (v1: number, v2: number) =>
  v1 === v2 ? 'gray.400' : v1 > v2 ? 'green.400' : 'red.400';

export const Preview: FC<Props> = ({
  collateral,
  collateralAmount,
  collateralValue,
  cRatio,
  debt,
  collateralChange,
  debtChange,
}) => {
  const { newDebt, newCollateralAmount, newCRatio, isValid, targetCRatio } = useValidatePosition(
    {
      collateral,
      collateralAmount,
      collateralValue,
      debt,
    },
    collateralChange,
    debtChange
  );

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
        <Text color={getColor(newCollateralAmount, collateralAmount)} float="right">
          {collateralAmount.toString()} {collateral.symbol} → {newCollateralAmount.toString()}{' '}
          {collateral.symbol}
        </Text>
      </Box>
      <Box py="2" borderBottom="1px solid rgba(255,255,255,0.2)">
        <strong>snxUSD Debt</strong>
        <Text color={getColor(debt, newDebt)} float="right">
          ${debt.toString()} → ${newDebt.toString()}
        </Text>
      </Box>
      <Box py="2" borderBottom="1px solid rgba(255,255,255,0.2)">
        <strong>C-Ratio</strong>
        <Text color={getColor(newCRatio, cRatio)} float="right">
          <CRatio CRatio={cRatio} debt={debt} /> → <CRatio CRatio={newCRatio} debt={newDebt} />
          {!isValid && (
            <Tooltip
              label={`Your new position C-Ratio is below the target C-Ratio of ${targetCRatio}%.`}
              color="white"
            >
              <InfoOutlineIcon transform="translateY(-1.5px)" ml="1" />
            </Tooltip>
          )}
        </Text>
      </Box>
    </Box>
  );
};
