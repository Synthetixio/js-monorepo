import { providers } from 'ethers';
import { useState } from 'react';

const mainnetId = 1;
const optimismId = 10;

export const useGlobalProvidersWithFallback = () => {
  const [useInfura, setUseInfura] = useState(true);

  const globalProviders = {
    mainnet: useInfura
      ? new providers.InfuraProvider(mainnetId, '45e567b9a0944c5c8e030d1801965e00')
      : new providers.AlchemyProvider(mainnetId, 'mgeiWuHQlewkGsw7QP9X-4mXNUo8fvQ5'),
    optimism: useInfura
      ? new providers.InfuraProvider(optimismId, '45e567b9a0944c5c8e030d1801965e00')
      : new providers.AlchemyProvider(optimismId, '59pd5v_lvc2xs3lieGwNOT_eqRxC0_lJ'),
  };

  return {
    globalProviders,
    toggleRpc: () => setUseInfura((x) => !x),
    usingInfura: useInfura,
  };
};
