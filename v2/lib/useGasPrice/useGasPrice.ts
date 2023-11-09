import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';

import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';
import { feeSuggestion } from '@snx-v2/feeSuggestion';

export const useGasPrice = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const { globalProviders } = useGlobalProvidersWithFallback();

  return useQuery({
    queryKey: ['useGasPrice', { networkId, walletAddress }],
    queryFn: async () => {
      if (!networkId) throw Error('Network id required');
      const globalProvider =
        networkId === NetworkIdByName.mainnet ? globalProviders.mainnet : globalProviders.optimism;
      try {
        return await feeSuggestion(globalProvider);
      } catch (e) {
        throw new Error(`Could not fetch and compute network fee. ${e}`);
      }
    },
    enabled: Boolean(networkId),
    staleTime: 3000,
  });
};
