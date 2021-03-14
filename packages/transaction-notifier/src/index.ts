import { ethers } from 'ethers';

import { createEmitter } from './eventEmitter';
import {
	Emitter,
	TransactionFailureData as TransactionFailureDataType,
	TransactionStatusData as TransactionStatusDataType,
} from './types';
import { TRANSACTION_EVENTS_MAP } from './constants';
import getRevertReason from './ethRevertReason';

class TransactionNotifier {
	private _provider: ethers.providers.Web3Provider;
	constructor(provider: ethers.providers.Web3Provider) {
		this._provider = provider;
	}

	public hash(transactionHash: string): Emitter {
		const emitter = createEmitter();
		setTimeout(() => this._watchTransaction(transactionHash, emitter), 5);
		return emitter;
	}

	public setProvider(provider: ethers.providers.Web3Provider): void {
		this._provider = provider;
	}

	private _watchTransaction(transactionHash: string, emitter: Emitter) {
		emitter.emit(TRANSACTION_EVENTS_MAP.txSent, { transactionHash });
		this._provider
			.waitForTransaction(transactionHash)
			.then(({ status, blockNumber, transactionHash }) => {
				if (status === 1) {
					emitter.emit(TRANSACTION_EVENTS_MAP.txConfirmed, {
						status,
						blockNumber,
						transactionHash,
					});
				} else {
					setTimeout(() => {
						this._provider.getNetwork().then(({ chainId }) => {
							try {
								getRevertReason({
									txHash: transactionHash,
									networkId: chainId,
									blockNumber,
									provider: this._provider,
								}).then((revertReason) =>
									emitter.emit(TRANSACTION_EVENTS_MAP.txFailed, {
										transactionHash,
										failureReason: revertReason,
									})
								);
							} catch (e) {
								emitter.emit(TRANSACTION_EVENTS_MAP.txFailed, {
									transactionHash,
									failureReason: 'Transaction reverted for an unknown reason',
								});
							}
						});
					}, 5000);
				}
			});
	}
}

export type TransactionStatusData = TransactionStatusDataType;
export type TransactionFailureData = TransactionFailureDataType;
export default TransactionNotifier;
