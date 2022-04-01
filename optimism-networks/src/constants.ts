import { OptimismNetwork, NetworkMapper, LayerTwoNetworkId, MessengerAddress } from './types';

export const METAMASK_MISSING_NETWORK_ERROR_CODE = 4902;

export const DEFAULT_MAINNET_NETWORK = 1;
export const DEFAULT_LAYER2_NETWORK = 10;
export const L1_TO_L2_NETWORK_MAPPER: NetworkMapper = {
	1: 10,
	42: 69,
	31337: 420,
};

export const L2_TO_L1_NETWORK_MAPPER: NetworkMapper = {
	10: 1,
	69: 42,
	420: 31337,
};

export const OPTIMISM_NETWORKS: Record<number, OptimismNetwork> = {
	10: {
		chainId: '0xA',
		chainName: 'Optimism Mainnet',
		rpcUrls: ['https://mainnet.optimism.io'],
		blockExplorerUrls: ['https://optimistic.etherscan.io'],
		iconUrls: [
			'https://de.wikipedia.org/wiki/MetaMask#/media/Datei:MetaMask_Fox.svg',
			'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png',
		],
	},
	69: {
		chainId: '0x45',
		chainName: 'Optimism Kovan',
		rpcUrls: ['https://kovan.optimism.io'],
		blockExplorerUrls: ['https://kovan-optimistic.etherscan.io'],
		iconUrls: [
			'https://de.wikipedia.org/wiki/MetaMask#/media/Datei:MetaMask_Fox.svg',
			'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png',
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
