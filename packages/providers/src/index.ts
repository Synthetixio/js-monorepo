import { providers as ethersProviders } from 'ethers';
import { OptimismProvider } from '@eth-optimism/provider';

import { ERRORS, OVM_RPC_URL } from './constants';
import {
	ProviderConfig,
	Provider,
	// DefaultProviderConfig,
	OvmProvider as OvmProviderType,
} from './types';

// const defaultProviders = ({ networkId = 1, infuraId }: DefaultProviderConfig): Providers => {
// 	if (!infuraId) throw new Error(ERRORS.noInfuraId);
// 	const web3Provider = new ethersProviders.InfuraProvider(networkId, infuraId);
// 	const optimismProvider = new OptimismProvider(OVM_RPC_URL, web3Provider);
// 	return {
// 		L1: web3Provider,
// 		L2: optimismProvider,
// 	};
// };

const optimismProvider = (): OvmProviderType => {
	return new ethersProviders.StaticJsonRpcProvider(OVM_RPC_URL);
};

// const providers = ({ provider }: ProviderConfig): Providers => {
// 	if (!provider) throw new Error(ERRORS.noWeb3Provider);

// 	const web3Provider = new ethersProviders.Web3Provider(provider);
// 	const optimismProvider = new OptimismProvider(OVM_RPC_URL, web3Provider);

// 	return {
// 		L1: web3Provider,
// 		L2: optimismProvider,
// 	};
// };

const loadProvider = ({ networkId = 1, infuraId, provider }: ProviderConfig): SynthetixProvider => {
	if (!provider && !infuraId) throw new Error(ERRORS.noWeb3Provider);
	if (provider && provider.isMetaMask) return new ethersProviders.Web3Provider(provider);
	if (provider) return provider;
	if (infuraId) return new ethersProviders.InfuraProvider(networkId, infuraId);
};

export { loadProvider };
export type SynthetixProvider = Provider;
export type OvmProvider = OvmProviderType;
// export default providers;
