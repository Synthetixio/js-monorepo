import { useCallback, useEffect, useReducer } from 'react';
import { AppState } from '@web3-onboard/core';
import { createContainer } from 'unstated-next';

import { getIsOVM, isSupportedNetworkId } from 'utils/network';

import { NetworkNameById, NetworkId } from '@synthetixio/contracts-interface';
import { ethers } from 'ethers';

import { onboard as Web3Onboard } from './config';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import { AppEvents, initialState, reducer } from './reducer';

import { getChainIdHex, getNetworkIdFromHex } from 'utils/infura';
import { initializeSynthetix } from '../../utils/contracts';
import { useGlobalProvidersWithFallback } from '@synthetixio/useGlobalProvidersWithFallback';

const useConnector = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { globalProviders } = useGlobalProvidersWithFallback();
  const L1DefaultProvider = globalProviders.mainnet;
  const L2DefaultProvider = globalProviders.optimism;
  const {
    isAppReady,
    provider,
    network,
    signer,
    synthetixjs,
    walletAddress,
    ensName,
    onboard,
    walletType,
  } = state;

  const updateState = useCallback((update: AppState) => {
    if (update.wallets.length > 0) {
      const wallet = update.wallets[0].accounts[0];

      const { label } = update.wallets[0];
      const { id } = update.wallets[0].chains[0];
      const networkId = getNetworkIdFromHex(id);

      const network = {
        id: networkId,
        name: isSupportedNetworkId(networkId) ? NetworkNameById[networkId] : 'Unsupported Network',
        useOvm: getIsOVM(networkId),
      };

      const provider = new ethers.providers.Web3Provider(update.wallets[0].provider, {
        name: network.name,
        chainId: networkId,
      });

      const signer = provider.getSigner();
      const contracts = isSupportedNetworkId(networkId)
        ? initializeSynthetix(networkId, signer)
        : null;
      const synthetixjs = contracts ? { contracts } : null;

      dispatch({
        type: AppEvents.CONFIG_UPDATE,
        payload: {
          address: wallet.address,
          walletType: label,
          network,
          provider,
          signer,
          synthetixjs,
          ensName: wallet?.ens?.name || null,
        },
      });

      const connectedWallets = update.wallets.map(({ label }) => label);
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_WALLET, JSON.stringify(connectedWallets));
    } else {
      dispatch({ type: AppEvents.WALLET_DISCONNECTED });
    }
  }, []);

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
          console.log(error);
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

  useEffect(() => {
    if (walletAddress && !ensName) {
      (async () => {
        const ensN: string | null = await L1DefaultProvider.lookupAddress(walletAddress);
        if (ensN) {
          dispatch({ type: AppEvents.SET_ENS, payload: { ensName: ensN } });
        }
      })();
    }
  }, [walletAddress, ensName, network, L1DefaultProvider]);

  const connectWallet = useCallback(
    async (chainId?: NetworkId) => {
      try {
        if (onboard) {
          await onboard.connectWallet();
          if (chainId) {
            await onboard.setChain({ chainId });
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    [onboard]
  );

  const disconnectWallet = useCallback(async () => {
    try {
      if (onboard) {
        const [primaryWallet] = onboard.state.get().wallets;
        onboard.disconnectWallet({ label: primaryWallet?.label });
        localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_WALLET);
      }
    } catch (e) {
      console.log(e);
    }
  }, [onboard]);

  const switchNetwork = async (id: NetworkId) => {
    return onboard?.setChain({ chainId: getChainIdHex(id) });
  };
  return {
    isAppReady,
    network,
    provider,
    signer,
    walletAddress,
    walletType,
    synthetixjs,
    isWalletConnected: Boolean(walletAddress && synthetixjs),
    walletConnectedToUnsupportedNetwork: Boolean(signer && !synthetixjs),
    isL2: network?.useOvm ?? false,
    isMainnet: !network?.useOvm ?? false,
    connectWallet,
    disconnectWallet,
    L1DefaultProvider,
    L2DefaultProvider,
    ensName,
    switchNetwork,
  };
};

const Connector = createContainer(useConnector);

export default Connector;
