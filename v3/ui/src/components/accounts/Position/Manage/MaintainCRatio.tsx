import { Burn } from '../Manage/Burn';
import { Stake } from '../Manage/Stake';
import { Text } from '@chakra-ui/react';
import { CollateralType, contracts } from '../../../../utils/constants';
import { formatValue } from '../../../../utils/helpers';
import { FC, useCallback } from 'react';
import { useTokenBalance } from '../../../../hooks/useTokenBalance';
import { useContract } from '../../../../hooks';

interface Props {
  collateral: CollateralType;
  setCollateralChange: (value: number) => void;
  collateralChange: number;
  setDebtChange: (value: number) => void;
  debtChange: number;
}

export const MaintainCRatio: FC<Props> = ({
  collateral,
  collateralChange,
  setCollateralChange,
  setDebtChange,
  debtChange,
}) => {
  const snxUsdProxy = useContract(contracts.SNX_USD_PROXY);
  const snxUsdBalance = useTokenBalance(snxUsdProxy?.address);
  const collateralBalance = useTokenBalance(collateral.address);

  const handleCollateralChange = useCallback(
    (value: number) => setCollateralChange(Math.min(collateralBalance.formatedValue, value)),
    [collateralBalance.formatedValue, setCollateralChange]
  );

  const handleDebtChange = useCallback(
    (value: number) => setDebtChange(-Math.min(snxUsdBalance.formatedValue, value)),
    [snxUsdBalance.formatedValue, setDebtChange]
  );

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
      <Stake
        balance={collateralBalance.value}
        collateral={collateral}
        value={collateralChange}
        onChange={handleCollateralChange}
      />
      <Burn balance={snxUsdBalance.value} value={-debtChange} onChange={handleDebtChange} />
    </>
  );
};
