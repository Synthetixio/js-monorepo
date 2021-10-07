import { providers as ethersProviders } from 'ethers';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { L1_TO_L2_NETWORK_MAPPER, OPTIMISM_NETWORKS } from '@synthetixio/optimism-networks';
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

export { loadProvider, getOptimismProvider };
export type { ProviderConfig, SynthetixProvider, OvmProvider };
export default loadProvider;
