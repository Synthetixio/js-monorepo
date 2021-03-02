import { providers as ethersProviders } from 'ethers';
import { OptimismProvider } from '@eth-optimism/provider';

import { ERRORS, OVM_RPC_URL } from './constants';
import { ProviderConfig, Providers, InfuraProviderConfig } from './types';

const defaultProvider = ({
	networkId = 1,
	infuraId,
}: InfuraProviderConfig): ethersProviders.InfuraProvider => {
	if (!infuraId) throw new Error(ERRORS.noInfuraId);
	return new ethersProviders.InfuraProvider(networkId, infuraId);
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

export { defaultProvider };
export type SynthetixProvider = Providers;
export default providers;
