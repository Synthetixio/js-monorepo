import { Burn } from './Burn';
import { Deposit } from './Deposit';
import { Alert, AlertIcon, Box, Heading } from '@chakra-ui/react';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { formatPercent } from '@snx-v2/formatters';
import { Wei } from '@synthetixio/wei';

export function MaintainCRatio({
  collateral,
  collateralChange,
  setCollateralChange,
  setDebtChange,
  debtChange,
  debt,
}: {
  collateral: CollateralType;
  setCollateralChange: (value: Wei) => void;
  collateralChange: Wei;
  setDebtChange: (value: Wei) => void;
  debtChange: Wei;
  debt: Wei;
}) {
  return (
    <>
      <Alert mt={4} mb={10} status="warning">
        <AlertIcon />
        If your C-Ratio drops below the liquidation (
        {formatPercent(collateral.liquidationRatioD18.toNumber())}
        ), you may be liquidated and lose your collateral.
      </Alert>
      <Heading size="md" mb="5">
        There are two ways to increase your C-Ratio...
      </Heading>
      <Box mb="6">
        <Deposit collateral={collateral} value={collateralChange} onChange={setCollateralChange} />
      </Box>
      <Box mb="6">
        <Burn
          value={debtChange.mul(-1)}
          onChange={(val) => setDebtChange(val.mul(-1))}
          debt={debt}
        />
      </Box>
    </>
  );
}
