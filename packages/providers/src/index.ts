import { providers as ethersProviders } from 'ethers';

import { ERRORS } from './constants';
import { ProviderConfig, SynthetixProvider, OvmProvider } from './types';

const loadProvider = ({ networkId = 1, infuraId, provider }: ProviderConfig): SynthetixProvider => {
	if (!provider && !infuraId) throw new Error(ERRORS.noWeb3Provider);
	if (provider && provider.isMetaMask) return new ethersProviders.Web3Provider(provider);
	if (provider) return provider;
	if (infuraId) return new ethersProviders.InfuraProvider(networkId, infuraId);
};

export { loadProvider };
export type { ProviderConfig, SynthetixProvider, OvmProvider };
export default loadProvider;
