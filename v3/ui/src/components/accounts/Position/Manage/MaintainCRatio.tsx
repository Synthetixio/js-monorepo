import { Burn } from './Burn';
import { Deposit } from './Deposit';
import { Alert, AlertIcon, Box, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { formatPercent } from '@snx-v2/formatters';

interface Props {
  collateral: CollateralType;
  setCollateralChange: (value: number) => void;
  collateralChange: number;
  setDebtChange: (value: number) => void;
  debtChange: number;
  debt: number;
}

export const MaintainCRatio: FC<Props> = ({
  collateral,
  collateralChange,
  setCollateralChange,
  setDebtChange,
  debtChange,
  debt,
}) => (
  <>
    <Alert mt={4} mb={10} status="warning">
      <AlertIcon />
      If your C-Ratio drops below the liquidation (
      {formatPercent(collateral.liquidationRatioD18.toNumber())}), you may be liquidated and lose
      your collateral.
    </Alert>
    <Heading size="md" mb="5">
      There are two ways to increase your C-Ratio...
    </Heading>
    <Box mb="6">
      <Deposit collateral={collateral} value={collateralChange} onChange={setCollateralChange} />
    </Box>
    <Box mb="6">
      <Burn value={-debtChange} onChange={(val) => setDebtChange(-val)} debt={debt} />
    </Box>
  </>
);
