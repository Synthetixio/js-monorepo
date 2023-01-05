import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { z } from 'zod';

const PoolSchema = z.object({
  id: z.string(),
  name: z.string().default('Unnamed Pool'),
});
export const usePreferredPool = () => {
  const { data: CoreProxyContract } = useCoreProxy();
  return useQuery({
    queryKey: [{ CoreProxyContract: CoreProxyContract?.address }, 'preferred-pool'],
    queryFn: async () => {
      if (!CoreProxyContract) throw new Error('CoreProxy');
      const idBn = await CoreProxyContract.getPreferredPool();
      const id = idBn.toString();
      const name = await CoreProxyContract.getPoolName(id);
      return PoolSchema.parse({ id, name: name || undefined });
    },
    enabled: Boolean(CoreProxyContract),
    staleTime: Infinity,
  });
};
