import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { providers } from 'ethers';
import { useState } from 'react';

export const useGlobalProvidersWithFallback = () => {
  const [useInfura, setUseInfura] = useState(true);

  const globalProviders = {
    mainnet: useInfura
      ? new providers.InfuraProvider(
          NetworkIdByName.mainnet,
          process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
        )
      : new providers.AlchemyProvider(
          NetworkIdByName.mainnet,
          process.env?.NEXT_PUBLIC_ALCHEMY_MAINNET_KEY
        ),
    optimism: useInfura
      ? new providers.InfuraProvider(
          NetworkIdByName['mainnet-ovm'],
          process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
        )
      : new providers.AlchemyProvider(
          NetworkIdByName['mainnet-ovm'],
          process.env?.NEXT_PUBLIC_ALCHEMY_MAINNET_KEY
        ),
  };

  return {
    globalProviders,
    toggleRpc: () => setUseInfura((x) => !x),
    usingInfura: useInfura,
  };
};
