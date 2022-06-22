import type {
	JsonRpcProvider,
	Web3Provider,
	InfuraProvider,
	Networkish,
	ExternalProvider,
	JsonRpcSigner,
} from '@ethersproject/providers';

export declare class OptimismProvider extends JsonRpcProvider {
	private readonly _ethereum;
	readonly _ethersType: string;
	constructor(network?: Networkish, provider?: Web3Provider);
	get ethereum(): Web3Provider;
	getSigner(addressOrIndex?: string | number): JsonRpcSigner;
	send(method: string, params: any[]): Promise<any>;
	prepareRequest(method: string, params: any): [string, any[]];
	perform(method: string, params: any): Promise<any>;
}

export type OvmProvider = OptimismProvider;

export type ProviderConfig = {
	networkId?: Networkish;
	infuraId?: string;
	provider?: ExternalProvider;
};

type L1Provider = Web3Provider | InfuraProvider;
type L2Provider = OvmProvider;

export type SynthetixProvider = L1Provider | L2Provider;
