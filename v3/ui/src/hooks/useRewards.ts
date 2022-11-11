import { useQuery } from 'wagmi';
import { useSnxProxy } from './useContract';
import { CollateralType } from '../utils/types';
import { formatUnits } from 'ethers/lib/utils';

interface RewardDistribution {
  value: string;
  distributor: string;
  rate: string;
}

export const useGetRewards = (accountId: string, poolId: string, collateral: CollateralType) => {
  const snxProxy = useSnxProxy();

  return useQuery<RewardDistribution[]>(
    ['rewards', poolId, collateral.address, accountId],
    async () => {
      try {
        const [[rewards, distributors], rates] = await Promise.all([
          snxProxy?.contract?.callStatic?.getAvailableRewards(
            poolId,
            collateral.address,
            accountId
          ),
          snxProxy?.contract.getCurrentRewardRate(poolId, collateral.address),
        ]);

        return (rewards || []).map((reward: any, index: number) => ({
          rate: rates[index].toString() || '0',
          distributor: distributors[index],
          value: formatUnits(reward?.toString()),
        }));
      } catch (error) {}
    }
  );
};
