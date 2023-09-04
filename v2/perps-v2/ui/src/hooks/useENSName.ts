import { useState, useEffect } from 'react';
import { useGlobalProvidersWithFallback } from '@snx-v2/useGlobalProvidersWithFallback';

const fetchENSNameForAddress = async (
  address: string | null | undefined,
  provider: any
): Promise<string | null> => {
  if (!address || !provider) return null;
  return await provider.lookupAddress(address);
};

export const useENSName = (address?: string | null) => {
  const { globalProviders } = useGlobalProvidersWithFallback();
  const L1DefaultProvider = globalProviders.mainnet;

  const [addressEnsName, setAddressEnsName] = useState<string | null>(null);

  useEffect(() => {
    const fetchENS = async () => {
      const name = await fetchENSNameForAddress(address, L1DefaultProvider);
      setAddressEnsName(name);
    };
    fetchENS();
  }, [address, L1DefaultProvider]);

  return { addressEnsName };
};
