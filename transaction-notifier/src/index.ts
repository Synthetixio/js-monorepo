import { ethers } from 'ethers';

import { createEmitter } from './eventEmitter';
import { Emitter, TransactionStatusData, TransactionNotifierInterface } from './types';
import { TRANSACTION_EVENTS_MAP } from './constants';
import getRevertReason from './ethRevertReason';

class TransactionNotifier implements TransactionNotifierInterface {
	private _provider: ethers.providers.Web3Provider;
	constructor(provider: ethers.providers.Web3Provider) {
		this._provider = provider;
	}

	hash(transactionHash: string): Emitter {
		const emitter = createEmitter();
		setTimeout(() => this.watchTransaction(transactionHash, emitter), 5);
		return emitter;
	}

	setProvider(provider: ethers.providers.Web3Provider): void {
		this._provider = provider;
	}

	watchTransaction(transactionHash: string, emitter: Emitter): void {
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

export { TransactionNotifier };
export type { TransactionStatusData, TransactionNotifierInterface };
export default TransactionNotifier;
