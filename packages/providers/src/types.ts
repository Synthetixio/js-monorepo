import type {
	ExternalProvider,
	InfuraProvider,
	Networkish,
	Web3Provider,
} from '@ethersproject/providers';

export type ProviderConfig = {
	networkId?: Networkish;
	infuraId?: string;
	provider?: ExternalProvider;
};

export type SynthetixProvider = Web3Provider | InfuraProvider;
