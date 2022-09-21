import { Burn } from '../Manage/Burn';
import { Stake } from '../Manage/Stake';
import { Text } from '@chakra-ui/react';
import { CollateralType } from '../../../../utils/constants';
import { formatValue } from '../../../../utils/helpers';
import { FC } from 'react';

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
    <Text fontSize="sm" mb="4">
      <strong>
        If your C-Ratio drops below the minimum (
        {formatValue(collateral.minimumCRatio!.mul(100), 6).toFixed(0)}%), you may be liquidated and
        lose your collateral.
      </strong>{' '}
      There are two ways to increase your C-Ratio:
    </Text>
    <Stake collateral={collateral} value={collateralChange} onChange={setCollateralChange} />
    <Burn value={-debtChange} onChange={(val) => setDebtChange(-val)} debt={debt} />
  </>
);
