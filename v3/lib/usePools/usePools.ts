import { useQuery } from '@tanstack/react-query';
import { CoreProxyContractType, useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';
import { usePreferredPool } from '@snx-v3/usePreferredPool';

const PoolIdsSchema = z.array(ZodBigNumber.transform((x) => x.toString()));

const PoolSchema = z.object({
  id: z.string(),
  name: z.string().default('Unnamed Pool'),
});

const loadPoolNames = async ({
  CoreProxyContract,
  poolIds,
}: {
  CoreProxyContract: CoreProxyContractType;
  poolIds: string[];
}) => {
  const calls = poolIds.map((id) =>
    CoreProxyContract.interface.encodeFunctionData('getPoolName', [id])
  );
  const multicallResult = await CoreProxyContract.callStatic.multicall(calls);
  return multicallResult.map((bytes, i) => {
    const decodedName = CoreProxyContract.interface.decodeFunctionResult('getPoolName', bytes)[0];

    return PoolSchema.parse({ id: poolIds[i], name: decodedName || undefined });
  });
};

export const usePools = () => {
  const network = useNetwork();
  const { data: CoreProxyContract } = useCoreProxy();
  const { data: preferredPool } = usePreferredPool();

  return useQuery({
    queryKey: [network.name, 'Pools', { preferredPool: preferredPool?.id }],
    queryFn: async () => {
      if (!CoreProxyContract || !preferredPool) throw new Error('Query should not be enabled');
      const approvedPoolIds = await CoreProxyContract.getApprovedPools();
      const approvedPools = await loadPoolNames({
        CoreProxyContract,
        poolIds: PoolIdsSchema.parse(approvedPoolIds),
      });
      return [preferredPool].concat(approvedPools.filter(({ id }) => id !== preferredPool.id));
    },
    enabled: Boolean(CoreProxyContract && preferredPool && network?.isSupported),
  });
};
