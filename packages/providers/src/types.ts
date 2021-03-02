import { ethers } from 'ethers';
import { OptimismProvider } from '@eth-optimism/provider';

export type ProviderConfig = {
	provider: ethers.providers.ExternalProvider;
};

export type InfuraProviderConfig = {
	networkId: ethers.providers.Networkish;
	infuraId: string;
};

export type Providers = {
	L1: ethers.providers.Web3Provider;
	L2: typeof OptimismProvider;
};
