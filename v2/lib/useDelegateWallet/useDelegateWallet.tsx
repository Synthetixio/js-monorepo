import React, {
  createContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

export type DelegateWallet = {
  address: string;
  canAll: boolean;
  canMint: boolean;
  canBurn: boolean;
  canClaim: boolean;
  canExchange: boolean;
};

export const DelegateWalletContext = createContext<{
  delegateWallet: DelegateWallet | null;
  setDelegateWallet: Dispatch<SetStateAction<DelegateWallet | null>>;
}>({
  delegateWallet: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDelegateWallet: () => {},
});

export const DelegateWalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [delegateWallet, setDelegateWallet] = useState<DelegateWallet | null>(null);
  return (
    <DelegateWalletContext.Provider value={{ delegateWallet, setDelegateWallet }}>
      {children}
    </DelegateWalletContext.Provider>
  );
};

export const useDelegateWallet = () => {
  return useContext(DelegateWalletContext);
};
