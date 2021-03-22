import { providers as ethersProviders } from 'ethers';
import { L1_TO_L2_NETWORK_MAPPER, OPTIMISM_NETWORKS } from '@synthetixio/optimism-networks';

import { ERRORS } from './constants';
import { ProviderConfig, SynthetixProvider, OvmProvider } from './types';

const loadProvider = ({ networkId = 1, infuraId, provider }: ProviderConfig): SynthetixProvider => {
	if (!provider && !infuraId) throw new Error(ERRORS.noWeb3Provider);
	if (provider && provider.isMetaMask) return new ethersProviders.Web3Provider(provider);
	if (provider) return provider;
	if (infuraId) return new ethersProviders.InfuraProvider(networkId, infuraId);
};

const getOptimismProvider = ({
	layerOneNetworkId,
}: {
	layerOneNetworkId: number;
}): ethersProviders.StaticJsonRpcProvider => {
	if (!layerOneNetworkId) throw new Error(ERRORS.noNetworkId);
	if (!L1_TO_L2_NETWORK_MAPPER[layerOneNetworkId]) throw new Error(ERRORS.wrongNetworkId);
	const ovmNetworkId = L1_TO_L2_NETWORK_MAPPER[layerOneNetworkId];
	return new ethersProviders.StaticJsonRpcProvider(OPTIMISM_NETWORKS[ovmNetworkId].rpcUrls[0]);
};

export { loadProvider, getOptimismProvider };
export type { ProviderConfig, SynthetixProvider, OvmProvider };
export default loadProvider;
