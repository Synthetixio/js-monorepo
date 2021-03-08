export type OptimismNetwork = {
	chainId: string;
	chainName: string;
	rpcUrls: string[];
	blockExplorerUrls: string[];
};

export enum NetworkId {
	Mainnet = 10,
	Kovan = 69,
}

export type EthereumProvider = {
	isMetaMask: boolean;
	chainId: string;
	request: ({ method, params }: { method: string; params: OptimismNetwork[] }) => Promise<null>;
};
