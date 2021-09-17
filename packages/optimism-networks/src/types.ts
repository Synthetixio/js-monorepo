export type OptimismNetwork = {
	chainId: string;
	chainName: string;
	rpcUrls: string[];
	blockExplorerUrls: string[];
	iconUrls: string[];
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

export type OptimismWatcher = {
	getMessageHashesFromL1Tx: (transactionHash: string) => string[];
	getMessageHashesFromL2Tx: (transactionHash: string) => string[];
	getL1TransactionReceipt: (msgHash: string, pollForPending: boolean) => string;
	getL2TransactionReceipt: (msgHash: string, pollForPending: boolean) => string;
};

export type LayerTwoNetworkId = number;
export type MessengerAddress = {
	L1: string;
	L2: string;
};

export type NetworkMapper = Record<number, number>;
