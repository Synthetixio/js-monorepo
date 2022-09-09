import { OptimismNetwork, NetworkMapper, LayerTwoNetworkId, MessengerAddress } from './types';

export const METAMASK_MISSING_NETWORK_ERROR_CODE = 4902;

export const DEFAULT_MAINNET_NETWORK = 1;
export const DEFAULT_LAYER2_NETWORK = 10;
export const L1_TO_L2_NETWORK_MAPPER: NetworkMapper = {
  1: 10,
  42: 69,
  5: 420,
};

export const L2_TO_L1_NETWORK_MAPPER: NetworkMapper = {
  10: 1,
  69: 42,
  420: 5,
};

export const OPTIMISM_NETWORKS: Record<number, OptimismNetwork> = {
  10: {
    chainId: '0xA',
    chainName: 'Optimism Mainnet',
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
    iconUrls: [
      'https://optimism.io/images/metamask_icon.svg',
      'https://optimism.io/images/metamask_icon.png',
    ],
  },

  420: {
    chainId: '0x1a4',
    chainName: 'Optimism Goerli',
    rpcUrls: ['https://goerli.optimism.io/'],
    blockExplorerUrls: ['https://goerli-optimism.etherscan.io'],
    iconUrls: [
      'https://optimism.io/images/metamask_icon.svg',
      'https://optimism.io/images/metamask_icon.png',
    ],
  },
};

export const MESSENGER_ADDRESSES: Record<LayerTwoNetworkId, MessengerAddress> = {
  10: {
    L1: '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1',
    L2: '0x4200000000000000000000000000000000000007',
  },
  69: {
    L1: '0x4361d0F75A0186C05f971c566dC6bEa5957483fD',
    L2: '0x4200000000000000000000000000000000000007',
  },
};
