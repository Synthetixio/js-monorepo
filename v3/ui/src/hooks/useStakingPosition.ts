import { CollateralType } from '../utils/constants';
import { useSynthetixRead } from './useDeploymentRead';

export const useStakingPositionStats = (
  accountId: string,
  fundId: string,
  collateral: CollateralType
) => {
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

  return {
    cRatio,
    debt,
    collateralValue,
    availableReward,
  };
};
