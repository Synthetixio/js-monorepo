import { OptimismNetwork, NetworkMapper, LayerTwoNetworkId, MessengerAddress } from './types';

export const L1_TO_L2_NETWORK_MAPPER: NetworkMapper = {
	1: 10,
	42: 69,
};

export const L2_TO_L1_NETWORK_MAPPER: NetworkMapper = {
	10: 1,
	69: 42,
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

export const MESSENGER_ADDRESSES: Record<LayerTwoNetworkId, MessengerAddress> = {
	10: {
		L1: '0xfBE93ba0a2Df92A8e8D40cE00acCF9248a6Fc812',
		L2: '0x4200000000000000000000000000000000000007',
	},
	69: {
		L1: '0xb89065D5eB05Cac554FDB11fC764C679b4202322',
		L2: '0x4200000000000000000000000000000000000007',
	},
};
