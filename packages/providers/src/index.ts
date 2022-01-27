import { BigNumber, providers as ethersProviders, utils } from 'ethers';
import {
	L1_TO_L2_NETWORK_MAPPER,
	L2_TO_L1_NETWORK_MAPPER,
	OPTIMISM_NETWORKS,
} from '@synthetixio/optimism-networks';
import { ERRORS } from './constants';
import { ProviderConfig, SynthetixProvider, OvmProvider } from './types';
import { NetworkIdByName } from '@synthetixio/contracts-interface';

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

/**
 * @dev if the new network is not added already, for instance in meta mask, this will throw an error. Call `wallet_addEthereumChain`
 * @param web3Provider
 * @param isOVM
 */
const handleSwitchChain = async (
	web3Provider: ethersProviders.Web3Provider,
	isOVM: boolean
): Promise<boolean> => {
	if (!web3Provider.provider?.request) return false;
	const newNetworkId = getCorrespondingNetwork(isOVM);
	const formattedChainId = utils.hexStripZeros(BigNumber.from(newNetworkId).toHexString());
	const success = await web3Provider.provider.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: formattedChainId }],
	});
	return success === null ? true : false;
};

const getCorrespondingNetwork = (isOVM: boolean) => {
	if (isOVM) {
		return L2_TO_L1_NETWORK_MAPPER[Number(NetworkIdByName['mainnet-ovm'])];
	} else {
		return L1_TO_L2_NETWORK_MAPPER[Number(NetworkIdByName.mainnet)];
	}
};

export { loadProvider, getOptimismProvider, handleSwitchChain };
export type { ProviderConfig, SynthetixProvider, OvmProvider };
export default loadProvider;
