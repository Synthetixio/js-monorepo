import { ethers } from 'ethers';
import { OptimismProvider } from '@eth-optimism/provider';

export type OvmProvider = typeof OptimismProvider;

// export type ProviderConfig = {
// 	provider: ethers.providers.ExternalProvider;
// };

export type ProviderConfig = {
	networkId: ethers.providers.Networkish;
	infuraId: string;
	provider: ethers.providers.ExternalProvider;
};

type L1Provider = ethers.providers.Web3Provider | ethers.providers.InfuraProvider;
type L2Provider = OvmProvider;

export type Provider = L1Provider | L2Provider;

// export type Providers = {
// 	L1: ethers.providers.Web3Provider | ethers.providers.InfuraProvider;
// 	L2: OvmProvider;
// };
