import { NetworkId } from '@synthetixio/contracts-interface';
import { providers } from 'ethers';

declare global {
  interface Window {
    web3?: {
      eth?: {
        net: {
          getId: () => NetworkId;
        };
      };
      version: {
        getNetwork(cb: (err: Error | undefined, networkId: NetworkId) => void): void;
        network: NetworkId;
      };
    };
    ethereum?: providers;
    trustwallet?: providers;
  }
}
