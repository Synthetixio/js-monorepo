import { useContext } from 'react';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';

export const loadSynthsByNameFromNetwork = (networkId: number) => {
  switch (networkId) {
    case NetworkIdByName['mainnet']:
      return import('@synthetixio/contracts/build/mainnet/synths');
    case NetworkIdByName['mainnet-ovm']:
      return import('@synthetixio/contracts/build/mainnet-ovm/synths');
    default:
      return import('@synthetixio/contracts/build/mainnet/synths');
  }
};

export type SynthsByName = Partial<
  Record<
    string,
    {
      asset: string;
      category: string;
      sign: string;
      description: string;
      name: string;
      feed?: string;
      subclass?: string;
    }
  >
>;
export const useGetSynthsByName = () => {
  const { networkId } = useContext(ContractContext);
  return useQuery(
    ['useGetSynthsByName', networkId],
    async () => {
      if (!networkId) throw Error('Require network id');
      return await loadSynthsByNameFromNetwork(networkId);
    },
    { enabled: Boolean(networkId), staleTime: Infinity, cacheTime: Infinity }
  );
};
