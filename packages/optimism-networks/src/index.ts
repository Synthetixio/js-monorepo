import { OPTIMISM_NETWORKS, NETWORK_LAYER_MAPPER } from './constants';
import { EthereumProvider, OptimismNetwork } from './types';

const getOptimismNetwork = ({ networkId }: { networkId: number }): OptimismNetwork => {
	if (!networkId) throw new Error('NetworkId required');
	if (!NETWORK_LAYER_MAPPER[networkId]) throw new Error('Network not supported on Layer 2');
	return OPTIMISM_NETWORKS[NETWORK_LAYER_MAPPER[networkId]];
};

const addOptimismNetworkToMetamask = async ({
	ethereum,
}: {
	ethereum: EthereumProvider;
}): Promise<null> => {
	if (!ethereum || !ethereum.isMetaMask) throw new Error('Metamask is not installed');
	const optimismNetworkConfig = getOptimismNetwork({ networkId: Number(ethereum.chainId) });
	return await ethereum.request({
		method: 'wallet_addEthereumChain',
		params: [optimismNetworkConfig],
	});
};

export { getOptimismNetwork, addOptimismNetworkToMetamask };
