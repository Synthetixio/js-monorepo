import { providers as ethersProviders } from 'ethers';
import { OptimismProvider } from '@eth-optimism/provider';

import { ERRORS, OVM_RPC_URL } from './constants';
import { ProviderConfig, Providers, DefaultProviderConfig } from './types';

const defaultProviders = ({ networkId = 1, infuraId }: DefaultProviderConfig): Providers => {
	if (!infuraId) throw new Error(ERRORS.noInfuraId);
	const web3Provider = new ethersProviders.InfuraProvider(networkId, infuraId);
	const optimismProvider = new OptimismProvider(OVM_RPC_URL, web3Provider);
	return {
		L1: web3Provider,
		L2: optimismProvider,
	};
};

const providers = ({ provider }: ProviderConfig): Providers => {
	if (!provider) throw new Error(ERRORS.noWeb3Provider);

	const web3Provider = new ethersProviders.Web3Provider(provider);
	const optimismProvider = new OptimismProvider(OVM_RPC_URL, web3Provider);

	return {
		L1: web3Provider,
		L2: optimismProvider,
	};
};

export { defaultProviders };
export type SynthetixProvider = Providers;
export default providers;
