import { ethers } from 'ethers';

export type TransactionEventCode = 'txSent' | 'txConfirmed' | 'txFailed' | 'txError';

export type TransactionStatusData = {
	transactionHash: string;
	status?: number;
	blockNumber?: number;
};

export type TransactionFailureData = {
	transactionHash: string;
	failureReason: string;
};

export interface EmitterListener {
	(state: TransactionStatusData | TransactionFailureData): boolean | undefined | void;
}

export interface Emitter {
	listeners: {
		[key: string]: EmitterListener;
	};
	on: (eventCode: TransactionEventCode, listener: EmitterListener) => void;
	emit: (
		eventCode: TransactionEventCode,
		data: TransactionStatusData | TransactionFailureData
	) => void;
}

export type RevertReasonParams = {
	txHash: string;
	networkId: number;
	blockNumber: number;
	provider: ethers.providers.Web3Provider;
};

export type GetCodeParams = {
	tx: ethers.providers.TransactionResponse;
	networkId: number;
	blockNumber: number;
	provider: ethers.providers.Web3Provider;
};

export type TransactionNotifierInterface = {
	hash(transactionHash: string): Emitter;
	setProvider(provider: ethers.providers.Web3Provider): void;
	watchTransaction(transactionHash: string, emitter: Emitter): void;
};
