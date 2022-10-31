import { createContext } from 'react';

export const ContractContext = createContext<{
  networkId: number | null;
  walletAddress: string | null;
  ensName: string | null;
  walletType: string | null;
}>({
  networkId: null,
  walletAddress: null,
  ensName: null,
  walletType: null,
});
