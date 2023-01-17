import { Box, Text, Tooltip } from '@chakra-ui/react';
import { useValidatePosition } from '@snx-v3/useValidatePosition';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { CRatio } from './CRatio';
import { Amount } from '@snx-v3/Amount';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { Wei } from '@synthetixio/wei';

function isEqual(v1: Wei, v2: Wei) {
  // Because of BN we can have slight variation in value due to rounding, so compare equality as readable numbers
  const value1 = v1.toNumber().toFixed(2);
  const value2 = v2.toNumber().toFixed(2);
  return value1 === value2;
}

function getColor(v1: Wei, v2: Wei) {
  if (isEqual(v1, v2)) {
    return 'gray.400';
  }
  if (v1.gt(v2)) {
    return 'success';
  }
  return 'error';
}

export function Preview({
  collateral,
  collateralAmount,
  collateralValue,
  debt,
  cRatio,
  collateralChange,
  debtChange,
}: {
  collateral: CollateralType;
  collateralAmount: Wei;
  collateralValue: Wei;
  debt: Wei;
  cRatio: Wei;
  collateralChange: number;
  debtChange: number;
}) {
  const { newDebt, newCollateralAmount, newCRatio, isValid, targetCRatio } = useValidatePosition({
    collateral,
    collateralAmount,
    collateralValue,
    debt,
    collateralChange,
    debtChange,
  });

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
          <Amount value={collateralAmount} suffix={` ${collateral.symbol}`} />
          {isEqual(newCollateralAmount, collateralAmount) ? null : (
            <>
              → <Amount value={newCollateralAmount} suffix={` ${collateral.symbol}`} />
            </>
          )}
        </Text>
      </Box>
      <Box py="2" borderBottom="1px solid rgba(255,255,255,0.2)">
        <strong>Debt</strong>
        <Text color={getColor(debt, newDebt)} float="right">
          <Amount value={debt} prefix="$" />
          {isEqual(debt, newDebt) ? null : (
            <>
              → <Amount value={newDebt} prefix="$" />
            </>
          )}
        </Text>
      </Box>
      <Box py="2" borderBottom="1px solid rgba(255,255,255,0.2)">
        <strong>C-Ratio</strong>
        <Text color={getColor(newCRatio, cRatio)} float="right">
          <CRatio CRatio={cRatio} debt={debt} />
          {isEqual(newCRatio, cRatio) ? null : (
            <>
              → <CRatio CRatio={newCRatio} debt={newDebt} />
            </>
          )}
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
}
