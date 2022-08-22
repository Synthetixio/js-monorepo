import { useState } from 'react';
import { CollateralType } from '../utils/constants';
import { useSynthetixRead } from './useDeploymentRead';
import { getCollateralType, getLiquidityItemId } from './useStakingPositions';
import { StakingPositionType } from '../components/accounts/StakingPositions/types';
import { useRecoilState } from 'recoil';
import { collateralTypesState } from '../utils/state';
import { fundsData } from '../utils/constants';

export const useStakingPositionStats = (
  accountId: string,
  fundId: string,
  collateral: CollateralType
) => {
  const [supportedCollateralTypes] = useRecoilState(collateralTypesState);
  const [stakingPosition, setStakingPosition] = useState<StakingPositionType | undefined>();

  const { data: collateralValue } = useSynthetixRead({
    functionName: 'accountFundCollateralValue',
    args: [accountId, fundId, collateral.address],
  });
  const { data: cRatio } = useSynthetixRead({
    functionName: 'collateralizationRatio',
    args: [accountId, fundId, collateral.address],
  });
  const { data: debt } = useSynthetixRead({
    functionName: 'accountFundDebt',
    args: [accountId, fundId, collateral.address],
  });
  const { data: availableReward } = useSynthetixRead({
    functionName: 'getAvailableRewards',
    args: [fundId, collateral.address, accountId],
  });

  const liquidityItemId = getLiquidityItemId(accountId, fundId, collateral);
  useSynthetixRead({
    functionName: 'getLiquidityItem',
    args: [liquidityItemId],
    onSuccess: (data) => {
      const collateralType = getCollateralType(data.collateralType, supportedCollateralTypes);
      setStakingPosition({
        id: liquidityItemId,
        fundId: data.fundId,
        fundName: fundsData[data.fundId.toString()].name,
        collateralAmount: data.collateralAmount,
        collateralType: collateralType || supportedCollateralTypes[0],
      });
    },
  });

  return {
    cRatio,
    debt,
    collateralValue,
    availableReward,
    stakingPosition,
  };
};
