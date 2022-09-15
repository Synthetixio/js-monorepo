import { SynthetixProvider } from '@synthetixio/providers';
import { createContext } from 'react';
import { Signer, providers } from 'ethers';

const defaultNetworkId = 1;
const defaultProvider = new providers.InfuraProvider(
  defaultNetworkId,
  process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
);

export const ContractContext = createContext<{
  networkId: number;
  provider: SynthetixProvider;
  signer: Signer | null;
  walletAddress: string | null;
}>({
  networkId: defaultNetworkId,
  provider: defaultProvider,
  signer: null,
  walletAddress: null,
});
