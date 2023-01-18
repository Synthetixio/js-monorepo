import { Box, Text, Tooltip } from '@chakra-ui/react';
import { validatePosition } from '@snx-v3/validatePosition';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useMemo } from 'react';
import { CRatio } from './CRatio';
import { Amount } from '@snx-v3/Amount';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { Wei } from '@synthetixio/wei';

function getColor(v1: Wei, v2: Wei) {
  if (v1.eq(v2)) {
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
  collateralChange: Wei;
  debtChange: Wei;
}) {
  const { newDebt, newCollateralAmount, newCRatio, isValid, targetCRatio } = useMemo(
    () =>
      validatePosition({
        issuanceRatioD18: collateral?.issuanceRatioD18,
        collateralAmount,
        collateralValue,
        debt,
        collateralChange,
        debtChange,
      }),
    [
      collateral?.issuanceRatioD18,
      collateralAmount,
      collateralChange,
      collateralValue,
      debt,
      debtChange,
    ]
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
          <Amount value={collateralAmount} suffix={` ${collateral.symbol}`} />
          {newCollateralAmount.eq(collateralAmount) ? null : (
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
          {newDebt.eq(debt) ? null : (
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
          {newCRatio.eq(cRatio) ? null : (
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
