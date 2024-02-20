import { SynthetixJS } from '@synthetixio/contracts-interface';
import { OnboardAPI } from '@web3-onboard/core';
import { ethers } from 'ethers';
import { Network } from 'store/wallet';
import { onboard } from './config';
import { Provider } from '@ethersproject/providers';

type ConnectorState = {
  network: Network | null;
  provider: Provider | null;
  signer: ethers.Signer | null;
  synthetixjs: { contracts: SynthetixJS['contracts'] } | null;
  isAppReady: boolean;
  walletAddress: string | null;
  walletType: string | null;
  ensName: string | null;
  onboard: OnboardAPI | null;
};

export enum AppEvents {
  APP_READY = 'APP_READY',
  CONFIG_UPDATE = 'CONFIG_UPDATE',
  SET_ENS = 'SET_ENS',
  UPDATE_PROVIDER = 'UPDATE_PROVIDER',
  WALLET_DISCONNECTED = 'WALLET_DISCONNECTED',
}

export const initialState: ConnectorState = {
  network: null,
  provider: null,
  signer: null,
  synthetixjs: null,
  isAppReady: false,
  walletAddress: null,
  walletType: null,
  ensName: null,
  onboard: onboard,
};

export type ConnectionUpdate = {
  address: string;
  network: Network;
  signer: ethers.Signer | null;
  walletType: string | null;
  synthetixjs: { contracts: SynthetixJS['contracts'] } | null;
  provider: Provider;
  ensName: string | null;
};

export type EnsUpdate = {
  ensName: string | null;
};

export type ProviderUpdate = {
  provider: Provider;
  network: Network;
  signer: ethers.Signer | null;
};

export type Actions =
  | { type: AppEvents.APP_READY; payload: OnboardAPI }
  | { type: AppEvents.CONFIG_UPDATE; payload: ConnectionUpdate }
  | { type: AppEvents.SET_ENS; payload: EnsUpdate }
  | { type: AppEvents.UPDATE_PROVIDER; payload: ProviderUpdate }
  | { type: AppEvents.WALLET_DISCONNECTED };

export function reducer(state: ConnectorState, action: Actions): ConnectorState {
  switch (action.type) {
    case AppEvents.APP_READY:
      return { ...state, isAppReady: true, onboard: action.payload };

    case AppEvents.CONFIG_UPDATE:
      return {
        ...state,
        walletType: action.payload.walletType,
        walletAddress: action.payload.address,
        network: action.payload.network,
        signer: action.payload.signer,
        provider: action.payload.provider,
        synthetixjs: action.payload.synthetixjs,
        ensName: action.payload.ensName,
      };

    case AppEvents.SET_ENS:
      return { ...state, ensName: action.payload.ensName };

    case AppEvents.WALLET_DISCONNECTED:
      return {
        ...state,
        network: null,
        provider: null,
        signer: null,
        synthetixjs: null,
        walletAddress: null,
        walletType: null,
        ensName: null,
      };

    case AppEvents.UPDATE_PROVIDER:
      return {
        ...state,
        provider: action.payload.provider,
        network: action.payload.network,
        signer: action.payload.signer,
      };

    default:
      return { ...state };
  }
}
