import { ethers } from 'ethers';

export type TransactionEventCode = 'txSent' | 'txConfirmed' | 'txFailed' | 'txError';

export type TransactionStatusData = {
	message: string;
};

export type TransactionData = {
	hash: string;
	asset: string;
	blockHash: string;
	blockNumber: number;
	to: string;
	from: string;
	gas: string;
	gasPrice: string;
	gasUsed?: string;
	input: string;
	nonce: number;
	v: string;
	r: string;
	s: string;
	transactionIndex: number;
	value: string;
	startTime?: number;
	timePending?: string;
	watchedAddress?: string;
	replaceHash?: string;
	counterparty?: string;
	direction?: string;
};

export interface EmitterListener {
	(state: TransactionStatusData): boolean | undefined | void;
}

export interface Emitter {
	listeners: {
		[key: string]: EmitterListener;
	};
	on: (eventCode: TransactionEventCode, listener: EmitterListener) => void;
	emit: (eventCode: TransactionEventCode, data: TransactionStatusData | null) => void;
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
