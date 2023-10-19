import { createContext, useContext, useState, ReactNode } from 'react';
import { ethers } from 'ethers';
import { InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';
import { infuraId } from './constants';
import { isStaging } from './isStaging';

type ProviderContextType = {
  provider: ethers.providers.JsonRpcProvider | ethers.providers.InfuraProvider | null;
  setProvider: (rpcUrl: string) => void;
};

const ProviderContext = createContext<ProviderContextType>({
  provider: null,
  setProvider: () => {},
});

export function useEthersProvider() {
  return useContext(ProviderContext);
}

interface EthersProviderProps {
  children: ReactNode;
}

const OPTIMISM_GOERLI_NETWORK_ID = 420;
const OPTIMISM__ID = 10;

export const networkId = isStaging ? OPTIMISM_GOERLI_NETWORK_ID : OPTIMISM__ID;

function getDefaultProvider() {
  const defaultRPC = localStorage.getItem('DEFAULT_RPC');
  if (!defaultRPC) {
    return new ethers.providers.InfuraProvider(networkId, infuraId);
  }
  return new ethers.providers.JsonRpcProvider(defaultRPC);
}

export const EthersProvider = ({ children }: EthersProviderProps) => {
  const [provider, setProvider] = useState<null | InfuraProvider | JsonRpcProvider>(
    getDefaultProvider()
  );

  const updateProvider = (rpcUrl: string) => {
    localStorage.setItem('DEFAULT_RPC', rpcUrl);
    const newProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

    setProvider(newProvider);
  };

  return (
    <ProviderContext.Provider value={{ provider, setProvider: updateProvider }}>
      {children}
    </ProviderContext.Provider>
  );
};
