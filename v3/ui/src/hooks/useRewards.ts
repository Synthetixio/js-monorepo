import { useQuery } from 'wagmi';
import { useSnxProxy } from './useContract';
import { CollateralType } from '../utils/types';

interface RewardDistribution {
  value: string;
  distributor: string;
}

export const useGetRewards = (accountId: string, poolId: string, collateral: CollateralType) => {
  const snxProxy = useSnxProxy();

  return useQuery<RewardDistribution[]>(
    ['rewards', poolId, collateral.tokenAddress, accountId],
    async () => {
      try {
        const [[rewards, distributors]] = await Promise.all([
          snxProxy?.contract?.callStatic?.getRewards(poolId, collateral.tokenAddress, accountId),
        ]);

        return (rewards || []).map((reward: any, index: number) => ({
          distributor: distributors[index],
          value: reward?.toString(),
        }));
      } catch (error) {}
    }
  );
};
