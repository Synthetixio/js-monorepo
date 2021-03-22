import { ethers } from 'ethers';
import { Watcher } from '@eth-optimism/watcher';

import {
	OPTIMISM_NETWORKS,
	L1_TO_L2_NETWORK_MAPPER,
	L2_TO_L1_NETWORK_MAPPER,
	MAINNET_OPTIMISM_EXPLORER,
	MESSENGER_ADDRESSES,
} from './constants';
import { EthereumProvider, OptimismNetwork, OptimismWatcher } from './types';

const getOptimismNetwork = ({
	layerOneNetworkId,
}: {
	layerOneNetworkId: number;
}): OptimismNetwork => {
	if (!layerOneNetworkId) throw new Error('NetworkId required');
	if (!L1_TO_L2_NETWORK_MAPPER[layerOneNetworkId])
		throw new Error('Network not supported on Layer 2');
	return OPTIMISM_NETWORKS[L1_TO_L2_NETWORK_MAPPER[layerOneNetworkId]];
};

const addOptimismNetworkToMetamask = async ({
	ethereum,
}: {
	ethereum: EthereumProvider;
}): Promise<null> => {
	if (!ethereum || !ethereum.isMetaMask) throw new Error('Metamask is not installed');
	const optimismNetworkConfig = getOptimismNetwork({ layerOneNetworkId: Number(ethereum.chainId) });
	return await ethereum.request({
		method: 'wallet_addEthereumChain',
		params: [optimismNetworkConfig],
	});
};

const optimismMessengerWatcher = ({
	layerOneProvider,
	layerTwoProvider,
	layerTwoNetworkId,
}: {
	layerOneProvider: ethers.providers.Web3Provider;
	layerTwoProvider: ethers.providers.Web3Provider;
	layerTwoNetworkId: number;
}): OptimismWatcher => {
	if (!layerOneProvider || !layerTwoProvider) throw new Error('Providers are missing');
	if (!MESSENGER_ADDRESSES[layerTwoNetworkId]) throw new Error('Network not supported on Layer 2');
	return new Watcher({
		l1: {
			provider: layerOneProvider,
			messengerAddress: MESSENGER_ADDRESSES[layerTwoNetworkId].L1,
		},
		l2: {
			provider: layerTwoProvider,
			messengerAddress: MESSENGER_ADDRESSES[layerTwoNetworkId].L2,
		},
	});
};

export type { OptimismWatcher };

export {
	getOptimismNetwork,
	addOptimismNetworkToMetamask,
	optimismMessengerWatcher,
	OPTIMISM_NETWORKS,
	MAINNET_OPTIMISM_EXPLORER,
	MESSENGER_ADDRESSES,
	L1_TO_L2_NETWORK_MAPPER,
	L2_TO_L1_NETWORK_MAPPER,
};
