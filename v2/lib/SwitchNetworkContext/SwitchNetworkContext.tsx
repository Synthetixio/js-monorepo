import { NetworkId } from '@synthetixio/contracts-interface';
import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const SwitchNetworkContext = createContext<
  (network: NetworkId) => Promise<boolean | undefined>
>(async () => undefined);
