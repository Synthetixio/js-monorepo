import { createContext } from 'react';

export const ContractContext = createContext<{
  networkId: number | null;
  walletAddress: string | null;
}>({
  networkId: null,
  walletAddress: null,
});
