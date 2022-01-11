import { utils, providers as ethersProviders, BigNumber } from 'ethers';

import {
	L1_TO_L2_NETWORK_MAPPER,
	OPTIMISM_NETWORKS,
	L2_TO_L1_NETWORK_MAPPER,
	// @ts-ignore
	// eslint-disable-next-line import/no-unresolved
} from '@synthetixio/optimism-networks';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { NetworkId } from '@synthetixio/contracts-inferface';
import { ERRORS } from './constants';
import { ProviderConfig, SynthetixProvider, OvmProvider } from './types';

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
	web3Provider: ethersProviders.Web3Provider,
	network: NetworkId,
	isOVM: boolean
): Promise<null | undefined> => {
	if (!web3Provider.provider?.request) return;
	const newNetworkId = getCorrespondingNetwork(network, isOVM);
	const formattedChainId = utils.hexStripZeros(BigNumber.from(newNetworkId).toHexString());
	// If request was successful, null is returned
	return web3Provider.provider.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: formattedChainId }],
	});
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
