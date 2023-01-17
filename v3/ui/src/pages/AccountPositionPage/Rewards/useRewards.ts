import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';

export type Reward = {
  distributor: string;
  value: string;
};

export const useRewards = ({
  accountId,
  poolId,
  tokenAddress,
}: {
  accountId?: string;
  poolId?: string;
  tokenAddress?: string;
}) => {
  const { data: CoreProxy } = useCoreProxy();

  return useQuery({
    queryKey: [
      'Rewards',
      {
        accountId,
        poolId,
        tokenAddress,
        CoreProxy: CoreProxy?.address,
      },
    ],
    queryFn: async () => {
      if (!(CoreProxy && poolId && tokenAddress && accountId)) throw new Error('OMG');

      // TODO: getRewards is not a functon!
      // const [rewards, distributors] = await CoreProxy.callStatic.getRewards(
      //   poolId,
      //   collateral.tokenAddress,
      //   accountId
      // );
      // return (rewards || []).map((reward: any, index: number) => ({
      //   distributor: distributors[index],
      //   value: reward?.toString(),
      // }));
      const rewards: Reward[] = [];
      return rewards;
    },
    placeholderData: [],
    enabled: Boolean(CoreProxy && poolId && tokenAddress && accountId),
  });
};
