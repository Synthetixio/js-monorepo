import { useQuery } from '@tanstack/react-query';
import { CoreProxyContractType, useCoreProxy } from '@snx-v3/useCoreProxy';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';

const PoolSchema = z.object({
  id: ZodBigNumber.transform((x) => x.toString()),
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
    return PoolSchema.parse({ id: poolIds[i], name: decodedName });
  });
};
export const usePools = () => {
  const { data: CoreProxyContract } = useCoreProxy();
  return useQuery({
    queryKey: [{ CoreProxyContract: CoreProxyContract?.address }, 'pools'],
    queryFn: async () => {
      if (!CoreProxyContract) throw new Error('CoreProxy');
      const [preferredPool, approvedPools] = await Promise.all([
        CoreProxyContract.getPreferredPool(),
        CoreProxyContract.getApprovedPools(),
      ]);
      const poolIds = [preferredPool]
        .concat(approvedPools.filter((id) => !id.eq(preferredPool)))
        .map((id) => id.toString());
      return await loadPoolNames({ CoreProxyContract: CoreProxyContract, poolIds });
    },
    enabled: Boolean(CoreProxyContract),
  });
};
