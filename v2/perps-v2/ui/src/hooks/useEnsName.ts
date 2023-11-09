import { useEffect, useState } from 'react';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';

export const useEnsName = (address?: string | null) => {
  const { globalProviders } = useGlobalProvidersWithFallback();

  const [addressEnsName, setAddressEnsName] = useState<string | null>(null);

  useEffect(() => {
    async function resolve() {
      if (!address || !globalProviders.mainnet) {
        setAddressEnsName(null);
        return;
      }
      const name = await globalProviders.mainnet.lookupAddress(address);
      setAddressEnsName(name);
    }
    resolve();
  }, [address, globalProviders]);

  return { addressEnsName };
};
