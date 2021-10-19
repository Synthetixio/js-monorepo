import { UseMutationOptions, useMutation } from 'react-query';

import Wei, { wei } from '@synthetixio/wei/build/node/wei';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { QueryContext } from '../context';
import clone from 'lodash/clone';
import omit from 'lodash/omit';
import { isString } from 'lodash';

type TransactionStatus = 'unsent' | 'prompting' | 'pending' | 'confirmed' | 'failed';

const DEFAULT_GAS_BUFFER = 0.15;

export interface UseEVMTxnOptions extends UseMutationOptions<void> {
	gasLimitBuffer?: number;
	// whether or not the transaction should attempt to estimate gas or execute at all
	enabled?: boolean;
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
	options?: UseEVMTxnOptions
) => {
	const [gasLimit, setGasLimit] = useState<Wei | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [hash, setHash] = useState<string | null>(null);
	const [txnStatus, setTxnStatus] = useState<TransactionStatus>('unsent');

	async function estimateGas() {
		if (txn != null && ctx.signer != null && (!options || options.enabled)) {
			// remove gas price from the estimate because it will cause unusual error if its below the base
			// it will be used at the end when the actual transaction is submitted
			return ctx.signer!.estimateGas(omit(txn!, ['gasPrice']));
		}

		return null;
	}

	function handleError(err: any) {
		// eslint-disable-next-line
		console.error(err);
		const errorMessage =
			err.data && isString(err.data) ? hexToASCII(err.data) : err.data?.message ?? err.message;
		setErrorMessage(errorMessage);
	}

	function refresh() {
		if (txnStatus === 'confirmed' || txnStatus === 'failed') {
			setTxnStatus('unsent');
		}

		setErrorMessage(null);

		if (!options || options.enabled) {
			estimateGas()
				.then((gl) => {
					if (gl) setGasLimit(wei(gl));
				})
				.catch((err) => {
					handleError(err);
				});
		}
	}

	useEffect(refresh, [txn?.data, txn?.value, txn?.nonce, txn?.from, txn?.to]);

	return {
		gasLimit,
		errorMessage,
		hash,
		txnStatus,
		refresh,
		...useMutation(async () => {
			if (options && !options.enabled) {
				return;
			}

			setErrorMessage(null);

			const execTxn = clone(txn!);

			try {
				if (!execTxn.gasLimit) {
					if (!gasLimit) {
						const newGasLimit = (await estimateGas())!;
						execTxn.gasLimit = newGasLimit?.mul(
							1 + (options?.gasLimitBuffer || DEFAULT_GAS_BUFFER)
						);
						setGasLimit(wei(newGasLimit));
					} else {
						execTxn.gasLimit = gasLimit
							.mul(1 + (options?.gasLimitBuffer || DEFAULT_GAS_BUFFER))
							.toBN();
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
