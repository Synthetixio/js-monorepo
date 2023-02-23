import React, {
  useEffect,
  useContext,
  createContext,
  useCallback,
  useReducer,
  ReactNode,
} from 'react';
import { ethers } from 'ethers';
import { onboard as Web3Onboard } from './config';
import { AppEvents, initialState, Network, reducer } from './reducer';
import { NetworkId, NetworkIdByName, NetworkNameById } from '@synthetixio/contracts-interface';
import { getChainIdHex, getNetworkIdFromHex, isSupported } from '../../utils/infura';
import { AppState, OnboardAPI } from '@web3-onboard/core';

type ConnectorContextType = {
  network: Network | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  isAppReady: boolean;
  walletAddress: string | null;
  walletWatched: string | null;
  walletType: string | null;
  onboard: OnboardAPI | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  switchAccounts: () => Promise<void>;
  isHardwareWallet: boolean;
  isWalletConnected: boolean;
};

const LOCAL_STORAGE_KEYS = {
  SELECTED_WALLET: 'selectedWallet',
};

const ConnectorContext = createContext<unknown>(null);

export const useConnectorContext = () => {
  return useContext(ConnectorContext) as ConnectorContextType;
};

export const ConnectorContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isAppReady, provider, network, signer, walletAddress, onboard, walletType } = state;

  const updateState = useCallback(
    (update: AppState) => {
      if (update.wallets.length > 0) {
        const wallet = update.wallets[0].accounts[0];

        const { label } = update.wallets[0];
        const { id } = update.wallets[0].chains[0];
        const networkId = getNetworkIdFromHex(id);

        if (!isSupported(networkId) && !document?.hidden) {
          (async () => {
            await onboard?.setChain({ chainId: getChainIdHex(NetworkIdByName['goerli']) });
          })();
        } else {
          const network = {
            id: networkId as NetworkId,
            name: NetworkNameById[networkId as NetworkId],
            useOvm: false,
          };

          const provider = new ethers.providers.Web3Provider(update.wallets[0].provider, {
            name: network.name,
            chainId: networkId,
          });

          const signer = provider.getSigner();

          dispatch({
            type: AppEvents.CONFIG_UPDATE,
            payload: {
              address: wallet.address,
              walletWatched: null,
              walletType: label,
              network,
              provider,
              signer,
              ensName: wallet?.ens?.name || null,
              ensAvatar: wallet?.ens?.avatar?.url || null,
            },
          });
        }
      } else {
        dispatch({ type: AppEvents.WALLET_DISCONNECTED });
      }
    },
    [onboard]
  );

  useEffect(() => {
    dispatch({ type: AppEvents.APP_READY, payload: Web3Onboard });
  }, []);

  useEffect(() => {
    const previousWalletsSerialised = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_WALLET);
    const previousWallets: string[] = previousWalletsSerialised
      ? JSON.parse(previousWalletsSerialised)
      : [];
    // If running in an iframe, attempt to connect with Gnosis
    if (window.self !== window.top) {
      previousWallets.push('Gnosis Safe');
    }

    if (onboard && previousWallets.length > 0) {
      (async () => {
        try {
          await onboard.connectWallet({
            autoSelect: {
              label: previousWallets[0],
              disableModals: true,
            },
          });
        } catch (error) {
          console.error(error);
        }
      })();
    }

    if (onboard) {
      const state = onboard.state.select();
      const { unsubscribe } = state.subscribe(updateState);

      return () => {
        if (process.env.NODE_ENV !== 'development' && unsubscribe) unsubscribe();
      };
    }

    // Always keep this hook with the single dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboard]);

  const connectWallet = useCallback(async () => {
    try {
      if (onboard) {
        await onboard.connectWallet();
      }
    } catch (e) {
      console.error(e);
    }
  }, [onboard]);

  const disconnectWallet = useCallback(() => {
    try {
      if (onboard) {
        const [primaryWallet] = onboard.state.get().wallets;
        onboard.disconnectWallet({ label: primaryWallet?.label });
        localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_WALLET);
        dispatch({ type: AppEvents.WALLET_DISCONNECTED });
      }
    } catch (e) {
      console.error(e);
    }
  }, [onboard]);

  const switchAccounts = useCallback(async () => {
    try {
      if (onboard) {
        await onboard.connectWallet({
          autoSelect: { label: onboard.state.get()?.wallets[0]?.label, disableModals: false },
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [onboard]);

  const isHardwareWallet = useCallback(() => {
    if (onboard) {
      const walletLabel = onboard.state.get()?.wallets[0]?.label || null;
      return walletLabel === 'Trezor' || walletLabel === 'Ledger';
    }
    return false;
  }, [onboard]);

  return (
    <ConnectorContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        switchAccounts,
        isHardwareWallet,
        isAppReady,
        provider,
        network,
        signer,
        walletAddress,
        onboard,
        walletType,
        isWalletConnected: !!walletAddress,
      }}
    >
      {children}
    </ConnectorContext.Provider>
  );
};
