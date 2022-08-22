import { useState } from 'react';
import { CollateralType } from '../utils/constants';
import { getCollateralType, getLiquidityItemId } from './useStakingPositions';
import { StakingPositionType } from '../components/accounts/StakingPositions/types';
import { useRecoilState } from 'recoil';
import { collateralTypesState } from '../utils/state';
import { fundsData, contracts } from '../utils/constants';
import { useContract } from './useContract';
import { useContractReads } from 'wagmi';

export const useStakingPositionStats = (
  accountId: string,
  fundId: string,
  collateral: CollateralType
) => {
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const [supportedCollateralTypes] = useRecoilState(collateralTypesState);
  const [stakingPosition, setStakingPosition] = useState<StakingPositionType | undefined>();

  const liquidityItemId = getLiquidityItemId(accountId, fundId, collateral);
  const calls = [
    {
      functionName: 'getLiquidityItem',
      args: [liquidityItemId],
    },
    {
      functionName: 'accountFundDebt',
      args: [accountId, fundId, collateral.address],
    },
    {
      functionName: 'collateralizationRatio',
      args: [accountId, fundId, collateral.address],
    },
    {
      functionName: 'getAvailableRewards',
      args: [fundId, collateral.address, accountId],
    },
  ].map((call) => ({
    ...call,
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    chainId: snxProxy?.chainId,
  }));

  const { data, isLoading } = useContractReads({
    contracts: calls,
    onSuccess: ([liquidityItem]) => {
      const collateralType = getCollateralType(
        liquidityItem.collateralType,
        supportedCollateralTypes
      );
      setStakingPosition({
        id: liquidityItemId,
        fundId: liquidityItem.fundId,
        fundName: fundsData[liquidityItem.fundId.toString()].name,
        collateralAmount: liquidityItem.collateralAmount,
        collateralType: collateralType || supportedCollateralTypes[0],
      });
    },
  });

  const [_, debt, cRatio, availableReward] = data || [];

  return {
    cRatio,
    debt,
    availableReward,
    stakingPosition,
    isLoading,
  };
};
