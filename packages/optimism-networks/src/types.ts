export type OptimismNetwork = {
  chainId: string;
  chainName: string;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  iconUrls: string[];
  fraudProofWindow?: number;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
};

export enum NetworkId {
  Mainnet = 10,
  Kovan = 69,
  Goerli = 420,
}

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
