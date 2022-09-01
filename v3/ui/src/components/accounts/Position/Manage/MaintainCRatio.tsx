import Burn from '../Manage/Burn';
import { Stake } from '../Manage/Stake';
import { Text } from '@chakra-ui/react';
import { CollateralType } from '../../../../utils/constants';
import { formatValue } from '../../../../utils/helpers';

interface Props {
  accountId: string;
  fundId: string;
  collateral: CollateralType;
}

export const MaintainCRatio = ({ collateral }: Props) => {
  return (
    <>
      <Text fontSize="sm" mb="4">
        <strong>
          If your C-Ratio drops below the minimum (
          {formatValue(collateral.minimumCRatio!.mul(100), collateral.decimals).toFixed(0)}%), you
          may be liquidated and lose your collateral.
        </strong>{' '}
        There are two ways to increase your C-Ratio:
      </Text>
      <Stake collateral={collateral} />
      <Burn />
    </>
  );
};
