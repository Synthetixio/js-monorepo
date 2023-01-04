import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';

export const usePools = () => {
  const network = useNetwork();
  const { data: CoreProxy } = useCoreProxy();
  return useQuery({
    queryKey: [network.name, 'pools'],
    queryFn: async () => {
      if (!CoreProxy) throw new Error('CoreProxy');
      const [preferredPool, approvedPools] = await Promise.all([
        CoreProxy.getPreferredPool(),
        CoreProxy.getApprovedPools(),
      ]);
      return [preferredPool]
        .concat(approvedPools.filter((id) => !id.eq(preferredPool)))
        .map((id) => id.toString());
    },
    placeholderData: [],
    enabled: Boolean(CoreProxy && network.name),
  });
};
