import { NetworkId } from '@synthetixio/contracts-interface';
import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const SwitchNetworkContext = createContext<(id: NetworkId) => Promise<void>>(
  async () => undefined
);
