import { UseMutationOptions, useMutation } from 'react-query';

import Wei, { wei } from '@synthetixio/wei/build/node/wei';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { QueryContext } from '../context';
import clone from 'lodash/clone';
import omit from 'lodash/omit';

type TransactionStatus = 'unsent' | 'prompting' | 'pending' | 'confirmed' | 'failed';

export interface UseEVMTxnOptions extends UseMutationOptions<void> {
	// amount of buffer which should be added to the gasLimit as a portion of the estimated gas limit. ex, 0.15 adds a 15% buffer
	gasLimitBuffer?: number;
	// whether or not the transaction should attempt to estimate gas or execute at all
	enabled: boolean;
}

function hexToASCII(hex: string): string {
	// https://gist.github.com/gluk64/fdea559472d957f1138ed93bcbc6f78a#file-reason-js
	// return ethers.utils.toUtf8String(S.split(' ')[1].toString());
	let str = '';
	for (let n = 2; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
}

const useEVMTxn = (
	ctx: QueryContext,
	txn: ethers.providers.TransactionRequest | null,
	options: UseEVMTxnOptions = { gasLimitBuffer: 0.15, enabled: true }
) => {
	const [gasLimit, setGasLimit] = useState<Wei | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [hash, setHash] = useState<string | null>(null);
	const [txnStatus, setTxnStatus] = useState<TransactionStatus>('unsent');

	async function estimateGas() {
		if (txn != null && ctx.signer != null && options.enabled) {
			// remove gas price from the estimate because it will cause unusual error if its below the base
			// it will be used at the end when the actual transaction is submitted
			return ctx.signer!.estimateGas(omit(txn!, ['gasPrice']));
		}

		return null;
	}

	function handleError(err: any) {
		// eslint-disable-next-line
		console.error(err);
		const errorMessage = err.data ? hexToASCII(err.data.toString()) : err.message;
		setErrorMessage(errorMessage);
	}

	function refresh() {
		if (txnStatus === 'confirmed' || txnStatus === 'failed') {
			setTxnStatus('unsent');
		}

		setErrorMessage(null);

		estimateGas()
			.then((gl) => {
				if (gl) setGasLimit(wei(gl, 0));
			})
			.catch((err) => {
				handleError(err);
			});
	}

	useEffect(refresh, [txn?.data, txn?.value, txn?.nonce, txn?.from, txn?.to]);

	return {
		gasLimit,
		errorMessage,
		hash,
		txnStatus,
		refresh,
		...useMutation(async () => {
			if (!options.enabled) {
				return;
			}

			setErrorMessage(null);

			const execTxn = clone(txn!);

			try {
				if (!execTxn.gasLimit) {
					// add a gas limit with a 10% buffer
					if (!gasLimit &&) {
						const newGasLimit = (await estimateGas())!;
						execTxn.gasLimit = newGasLimit?.mul(Math.floor(options.gasLimitBuffer * 100)).div(100);

						console.log('no gas limit');

						console.log('current');

						console.log(newGasLimit?.mul(Math.floor(options.gasLimitBuffer * 100)).div(100));

						console.log('should be');

						console.log(newGasLimit?.mul(Math.floor(options.gasLimitBuffer * 100)));

						setGasLimit(wei(newGasLimit));
					} else {
						console.log('gas limit');

						console.log(gasLimit.mul(1 + options.gasLimitBuffer).toBN());

						execTxn.gasLimit = gasLimit.mul(1 + options.gasLimitBuffer).toBN();
					}

					if (execTxn.gasLimit!.eq(0)) {
						throw new Error('missing provider/signer for txn');
					}
				}

				setTxnStatus('prompting');

				const txndata = await ctx.signer!.sendTransaction(execTxn!);

				setTxnStatus('pending');
				setHash(txndata.hash);

				// keep the async function going until the transaction has completed
				const txnresult = await txndata.wait();

				if (txnresult.status == 1) {
					setTxnStatus('confirmed');
				} else {
					setTxnStatus('failed');
					setErrorMessage('unknown error');
					throw new Error(`transaction failed: ${'unknown error'}`);
				}
			} catch (err) {
				setTxnStatus('failed');
				handleError(err);
				throw err;
			}
		}, options),
	};
};

export default useEVMTxn;
