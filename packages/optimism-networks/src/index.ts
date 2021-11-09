import type { MetaMaskInpageProvider } from '@metamask/providers';
import { ethers, BigNumber } from 'ethers';
import { Watcher } from '@eth-optimism/watcher';

import {
	OPTIMISM_NETWORKS,
	L1_TO_L2_NETWORK_MAPPER,
	L2_TO_L1_NETWORK_MAPPER,
	MESSENGER_ADDRESSES,
	DEFAULT_MAINNET_NETWORK,
	DEFAULT_LAYER2_NETWORK,
	METAMASK_MISSING_NETWORK_ERROR_CODE,
} from './constants';
import { OptimismNetwork, OptimismWatcher } from './types';

const getOptimismNetwork = ({
	layerOneNetworkId,
}: {
	layerOneNetworkId: number;
}): OptimismNetwork => {
	if (!layerOneNetworkId) throw new Error('NetworkId required');
	// If user is on a unsupported network, just add optimism mainnet.
	const optimismNetwork =
		L1_TO_L2_NETWORK_MAPPER[layerOneNetworkId] || L1_TO_L2_NETWORK_MAPPER[DEFAULT_MAINNET_NETWORK];
	return OPTIMISM_NETWORKS[optimismNetwork];
};

const addOptimismNetworkToMetamask = async ({
	ethereum,
}: {
	ethereum: MetaMaskInpageProvider;
}): Promise<void> => {
	if (!ethereum || !ethereum.isMetaMask) throw new Error('Metamask is not installed');
	const optimismNetworkConfig = getOptimismNetwork({ layerOneNetworkId: Number(ethereum.chainId) });

	await ethereum.request({
		method: 'wallet_addEthereumChain',
		params: [optimismNetworkConfig],
	});
};
const switchToL1 = async ({ ethereum }: { ethereum: MetaMaskInpageProvider }): Promise<void> => {
	if (!ethereum || !ethereum.isMetaMask) throw new Error('Metamask is not installed');
	const networkId =
		L2_TO_L1_NETWORK_MAPPER[Number(ethereum.chainId)] ||
		L2_TO_L1_NETWORK_MAPPER[DEFAULT_LAYER2_NETWORK];
	const formattedChainId = ethers.utils.hexStripZeros(BigNumber.from(networkId).toHexString());
	await ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: formattedChainId }],
	});
};
const switchToL2 = async ({ ethereum }: { ethereum: MetaMaskInpageProvider }): Promise<void> => {
	if (!ethereum || !ethereum.isMetaMask) throw new Error('Metamask is not installed');
	try {
		const networkId =
			L1_TO_L2_NETWORK_MAPPER[Number(ethereum.chainId)] ||
			L1_TO_L2_NETWORK_MAPPER[DEFAULT_MAINNET_NETWORK];

		const formattedChainId = ethers.utils.hexStripZeros(BigNumber.from(networkId).toHexString());
		await ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: formattedChainId }],
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		if (e?.code === METAMASK_MISSING_NETWORK_ERROR_CODE) {
			addOptimismNetworkToMetamask({ ethereum });
			return;
		}
	}
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
	MESSENGER_ADDRESSES,
	L1_TO_L2_NETWORK_MAPPER,
	L2_TO_L1_NETWORK_MAPPER,
	switchToL1,
	switchToL2,
};
