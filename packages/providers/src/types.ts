import { ethers } from 'ethers';
import { OptimismProvider } from '@eth-optimism/provider';

export type OvmProvider = typeof OptimismProvider;

export type ProviderConfig = {
	networkId?: ethers.providers.Networkish;
	infuraId?: string;
	provider?: ethers.providers.ExternalProvider;
};

type L1Provider = ethers.providers.Web3Provider | ethers.providers.InfuraProvider;
type L2Provider = OvmProvider;

export type SynthetixProvider = L1Provider | L2Provider;

export enum NetworkId {
	Mainnet = 1,
	Ropsten = 3,
	Rinkeby = 4,
	Goerli = 5,
	Kovan = 42,
	'Mainnet-Ovm' = 10,
	'Kovan-Ovm' = 69,
	'Local-Ovm' = 420,
	'Local' = 31337,
}
