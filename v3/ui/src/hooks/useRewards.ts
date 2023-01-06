import { useQuery } from '@tanstack/react-query';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCoreProxy } from '@snx-v3/useCoreProxy';

export const useRewards = ({
  accountId,
  poolId,
  collateral,
}: {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
}) => {
  const network = useNetwork();
  const { data: CoreProxy } = useCoreProxy();

  return useQuery({
    queryKey: [
      network.name,
      'rewards',
      { poolId },
      { token: collateral.tokenAddress },
      { accountId },
    ],
    queryFn: async () => {
      if (!CoreProxy) throw new Error('OMG');

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
      return [];
    },
    placeholderData: [],
    enabled: Boolean(network.name && poolId && collateral.tokenAddress && accountId),
  });
};
