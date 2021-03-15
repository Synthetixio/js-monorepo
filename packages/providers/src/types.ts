import { ethers } from 'ethers';
import { OptimismProvider } from '@eth-optimism/provider';

export type OvmProvider = typeof OptimismProvider;

export type ProviderConfig = {
	networkId: ethers.providers.Networkish;
	infuraId: string;
	provider: ethers.providers.ExternalProvider;
};

type L1Provider = ethers.providers.Web3Provider | ethers.providers.InfuraProvider;
type L2Provider = OvmProvider;

export type SynthetixProvider = L1Provider | L2Provider;
