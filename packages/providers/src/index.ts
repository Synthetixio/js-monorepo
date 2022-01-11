import { utils, providers as ethersProviders, BigNumber, providers } from 'ethers';

import {
	L1_TO_L2_NETWORK_MAPPER,
	OPTIMISM_NETWORKS,
	L2_TO_L1_NETWORK_MAPPER,
	// @ts-ignore
	// eslint-disable-next-line import/no-unresolved
} from '@synthetixio/optimism-networks';
import { ERRORS } from './constants';
import { ProviderConfig, SynthetixProvider, OvmProvider, NetworkId } from './types';

const loadProvider = ({ networkId = 1, infuraId, provider }: ProviderConfig): SynthetixProvider => {
	if (!provider && !infuraId) throw new Error(ERRORS.noWeb3Provider);
	if (provider) return new ethersProviders.Web3Provider(provider);
	if (infuraId) return new ethersProviders.InfuraProvider(networkId, infuraId);
};

const getOptimismProvider = ({
	networkId,
}: {
	networkId: number;
}): ethersProviders.StaticJsonRpcProvider => {
	if (!networkId) throw new Error(ERRORS.noNetworkId);

	const ovmNetworkId = L1_TO_L2_NETWORK_MAPPER[networkId] || networkId;
	if (!OPTIMISM_NETWORKS[networkId]) throw new Error(ERRORS.wrongNetworkId);

	return new ethersProviders.StaticJsonRpcProvider(OPTIMISM_NETWORKS[ovmNetworkId].rpcUrls[0]);
};

const handleSwitchChain = async (
	provider: providers.Web3Provider,
	network: Record<'id', number>,
	isOVM: boolean
) => {
	if (!provider || !network?.id) return;
	const web3Provider = provider as providers.Web3Provider;
	if (!web3Provider.provider || !web3Provider.provider.request) return;
	const newNetworkId = getCorrespondingNetwork(network?.id, isOVM);
	const formattedChainId = utils.hexStripZeros(BigNumber.from(newNetworkId).toHexString());
	try {
		return web3Provider.provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: formattedChainId }],
		});
	} catch (error: any) {
		// This error code indicates that the chain has not been added to MetaMask.
		if ('code' in error && error.code === 4902) throw new Error(ERRORS.networkNotAdded);
		else throw new Error(error);
	}
};

const getCorrespondingNetwork = (networkId: NetworkId, isOVM: boolean) => {
	if (isOVM) {
		return L2_TO_L1_NETWORK_MAPPER[networkId] || L2_TO_L1_NETWORK_MAPPER[NetworkId['Mainnet-ovm']];
	} else {
		return L1_TO_L2_NETWORK_MAPPER[networkId] || L1_TO_L2_NETWORK_MAPPER[NetworkId.Mainnet];
	}
};

export { loadProvider, getOptimismProvider, handleSwitchChain };
export type { ProviderConfig, SynthetixProvider, OvmProvider };
export default loadProvider;
