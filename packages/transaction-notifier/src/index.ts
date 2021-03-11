import { ethers } from 'ethers';

import { createEmitter } from './eventEmitter';
import { Emitter } from './types';
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

	private _watchTransaction(transactionHash: string, emitter: Emitter) {
		emitter.emit(TRANSACTION_EVENTS_MAP.txSent, null);
		this._provider.waitForTransaction(transactionHash).then(({ status, blockNumber }) => {
			if (status === 1) {
				emitter.emit(TRANSACTION_EVENTS_MAP.txConfirmed, null);
			} else {
				this._provider.getNetwork().then(({ chainId }) => {
					try {
						getRevertReason({
							txHash: transactionHash,
							networkId: chainId,
							blockNumber,
							provider: this._provider,
						}).then((revertReason) =>
							emitter.emit(TRANSACTION_EVENTS_MAP.txFailed, { message: revertReason })
						);
					} catch (e) {
						emitter.emit(TRANSACTION_EVENTS_MAP.txFailed, {
							message: 'Transaction reverted for an unknown reason',
						});
					}
				});
			}
		});
	}
}

export default TransactionNotifier;
