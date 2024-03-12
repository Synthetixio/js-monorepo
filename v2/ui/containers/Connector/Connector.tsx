import { useCallback, useEffect, useReducer } from 'react';
import { WalletState } from '@web3-onboard/core';
import { createContainer } from 'unstated-next';
import { getIsOVM, isSupportedNetworkId } from 'utils/network';
import { NetworkId, NetworkNameById } from '@synthetixio/contracts-interface';
import { ethers } from 'ethers';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import { AppEvents, initialState, reducer } from './reducer';
import { getChainIdHex, getNetworkIdFromHex } from 'utils/infura';
import { initializeSynthetix } from '../../utils/contracts';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';
import { useConnectWallet, useSetChain } from '@web3-onboard/react';

const useConnector = () => {
  const { globalProviders } = useGlobalProvidersWithFallback();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    provider: globalProviders.mainnet,
  });

  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [{ connectedChain }, setNetwork] = useSetChain();

  const L1DefaultProvider = globalProviders.mainnet;
  const L2DefaultProvider = globalProviders.optimism;

  const { isAppReady, provider, network, signer, synthetixjs, walletAddress, ensName, walletType } =
    state;

  const updateState = useCallback((update: WalletState) => {
    if (update.accounts.length > 0) {
      const wallet = update.accounts[0];

      const { label } = update;
      const { id } = update.chains[0];
      const networkId = getNetworkIdFromHex(id);

      const network = {
        id: networkId,
        name: isSupportedNetworkId(networkId) ? NetworkNameById[networkId] : 'Unsupported Network',
        useOvm: getIsOVM(networkId),
      };

      const provider = new ethers.providers.Web3Provider(update.provider, {
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
          isAppReady: true,
        },
      });

      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_WALLET, JSON.stringify(update.label));
    }
  }, []);

  // Case wallet or network changes
  useEffect(() => {
    const walletHasChanged = wallet && wallet?.accounts[0].address !== walletAddress;
    let networkHasChanged = false;

    if (network?.id && connectedChain) {
      networkHasChanged = connectedChain.id !== getChainIdHex(network.id as NetworkId);
    }

    if (wallet && (walletHasChanged || networkHasChanged)) {
      updateState(wallet);
    }
  }, [wallet, walletAddress, updateState, connectedChain, network]);

  // Auto connect case
  useEffect(() => {
    const previouslySelectedWallet = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_WALLET);

    if (previouslySelectedWallet) {
      connect({
        autoSelect: { disableModals: true, label: JSON.parse(previouslySelectedWallet) },
      }).then(([walletState]) => {
        updateState(walletState);
      });
    }
  }, [connect, updateState]);

  const connectWallet = useCallback(
    async (id?: NetworkId) => {
      try {
        const [res] = await connect();

        if (id && id !== res.chains[0].id) {
          if (isSupportedNetworkId(id)) {
            await setNetwork({ chainId: getChainIdHex(id) });
          } else {
            await setNetwork({ chainId: '0x1' });
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    [connect, setNetwork]
  );

  const disconnectWallet = useCallback(() => {
    try {
      if (!wallet?.label) return;
      dispatch({ type: AppEvents.WALLET_DISCONNECTED });
      disconnect({ label: wallet?.label });
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_WALLET);
    } catch (e) {
      console.log(e);
    }
  }, [disconnect, wallet?.label]);

  const switchNetwork = async (id: NetworkId) => {
    try {
      await setNetwork({ chainId: getChainIdHex(id) });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    isAppReady,
    network,
    provider,
    signer,
    walletAddress,
    walletType,
    synthetixjs,
    isWalletConnected: Boolean(wallet?.accounts[0] && synthetixjs),
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
