import { useQuery } from 'wagmi';
import { useSnxProxy } from './useContract';
import { CollateralType } from '../utils/constants';
import { BigNumber } from 'ethers';

export const useGetStakingRewards = (
  accountId: string,
  poolId: string,
  collateral: CollateralType
) => {
  const snxProxy = useSnxProxy();

  return useQuery<BigNumber[]>(['rewards', poolId, collateral.address, accountId], async () => {
    try {
      const rewards = await snxProxy?.contract?.callStatic?.getAvailableRewards(
        poolId,
        collateral.address,
        accountId
      );
      return rewards || [];
    } catch (error) {}
  });
};
