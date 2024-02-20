import { useCallback, useEffect, useReducer } from 'react';
import { WalletState } from '@web3-onboard/core';
import { createContainer } from 'unstated-next';
import { getIsOVM, isSupportedNetworkId } from 'utils/network';
import { NetworkNameById } from '@synthetixio/contracts-interface';
import { ethers } from 'ethers';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import { AppEvents, initialState, reducer } from './reducer';
import { getNetworkIdFromHex } from 'utils/infura';
import { initializeSynthetix } from '../../utils/contracts';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';
import { useConnectWallet, useSetChain } from '@web3-onboard/react';

const useConnector = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { globalProviders } = useGlobalProvidersWithFallback();
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [{ connectedChain }, setNetwork] = useSetChain();

  console.log('Connected Chain', connectedChain);

  const L1DefaultProvider = globalProviders.mainnet;
  const L2DefaultProvider = globalProviders.optimism;

  const { isAppReady, provider, network, signer, synthetixjs, walletAddress, ensName, walletType } =
    state;

  useEffect(() => {
    console.log('NETWORK SWITCH');
  }, [connectedChain]);

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
        },
      });

      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_WALLET, JSON.stringify(update.label));
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      const [walletState] = await connect();
      updateState(walletState);
    } catch (e) {
      console.log(e);
    }
  }, [connect, updateState]);

  const disconnectWallet = useCallback(() => {
    try {
      if (!wallet) return;
      disconnect({ label: wallet?.label });
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_WALLET);
    } catch (e) {
      console.log(e);
    }
  }, [disconnect, wallet]);

  const switchNetwork = () => {
    try {
      // dispatch({ type: AppEvents., payload: id });
      // setNetwork({ chainId: id });
    } catch (error) {}
    // return
  };

  console.log(state);

  return {
    isAppReady,
    network, // Done
    provider, // Done
    signer, // Done
    walletAddress, // Done
    walletType,
    synthetixjs,
    isWalletConnected: Boolean(wallet?.accounts[0] && synthetixjs),
    walletConnectedToUnsupportedNetwork: Boolean(signer && !synthetixjs),
    isL2: network?.useOvm ?? false,
    isMainnet: !network?.useOvm ?? false,
    connectWallet, // Done
    disconnectWallet, // Done
    L1DefaultProvider, // Done
    L2DefaultProvider, // Done
    ensName, // Done
    switchNetwork, // Done
  };
};

const Connector = createContainer(useConnector);

export default Connector;
