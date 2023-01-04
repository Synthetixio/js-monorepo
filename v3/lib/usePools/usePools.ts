import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';

export const usePools = () => {
  const network = useNetwork();
  const { data: CoreProxyContract } = useCoreProxy();
  return useQuery({
    queryKey: [network.name, 'pools'],
    queryFn: async () => {
      if (!CoreProxyContract) throw new Error('CoreProxy');
      const [preferredPool, approvedPools] = await Promise.all([
        CoreProxyContract.getPreferredPool(),
        CoreProxyContract.getApprovedPools(),
      ]);
      return [preferredPool]
        .concat(approvedPools.filter((id) => !id.eq(preferredPool)))
        .map((id) => id.toString());
    },
    placeholderData: [],
    enabled: Boolean(CoreProxyContract && network.name),
  });
};
