import { OptimismNetwork } from './types';

export const NETWORK_LAYER_MAPPER: Record<number, number> = {
	1: 10,
	42: 69,
};

export const OPTIMISM_NETWORKS: Record<number, OptimismNetwork> = {
	10: {
		chainId: '0xA',
		chainName: 'Optimism Mainnet',
		rpcUrls: ['https://mainnet.optimism.io'],
		blockExplorerUrls: ['https://mainnet-l2-explorer.surge.sh'],
	},
	69: {
		chainId: '0x45',
		chainName: 'Optimism Kovan',
		rpcUrls: ['https://kovan.optimism.io'],
		blockExplorerUrls: ['https://mainnet-l2-explorer.surge.sh'],
	},
};

export const MAINNET_OPTIMISM_EXPLORER = 'https://mainnet-l2-explorer.surge.sh';
