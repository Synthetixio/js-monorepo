import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { useGlobalProvidersWithFallback } from '@snx-v2/useGlobalProvidersWithFallback';

const fetchEnsNameForAddress = async (
  address: string | null | undefined,
  provider: ethers.providers.JsonRpcProvider
): Promise<string | null> => {
  if (!address || !provider) return null;
  return await provider.lookupAddress(address);
};

export const useEnsName = (address?: string | null) => {
  const { globalProviders } = useGlobalProvidersWithFallback();
  const L1DefaultProvider = globalProviders.mainnet;

  const [addressEnsName, setAddressEnsName] = useState<string | null>(null);

  useEffect(() => {
    const fetchEns = async () => {
      const name = await fetchEnsNameForAddress(address, L1DefaultProvider);
      setAddressEnsName(name);
    };
    fetchEns();
  }, [address, L1DefaultProvider]);

  return { addressEnsName };
};
