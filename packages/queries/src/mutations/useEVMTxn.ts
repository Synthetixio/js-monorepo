import { UseMutationOptions, useMutation } from 'react-query';

import Wei, { wei } from '@synthetixio/wei/build/node/wei';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { QueryContext } from '../context';
import { clone } from 'lodash';

type TransactionStatus = 'unsent' | 'prompting' | 'pending' | 'confirmed' | 'failed';

export interface UseEVMTxnOptions extends UseMutationOptions<void> {
	// amount of buffer which should be added to the gasLimit as a portion of the estimated gas limit. ex, 0.15 adds a 15% buffer
	gasLimitBuffer: number;
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
	options: UseEVMTxnOptions = { gasLimitBuffer: 0.15 }
) => {
	const [gasLimit, setGasLimit] = useState<Wei | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [hash, setHash] = useState<string | null>(null);
	const [txnStatus, setTxnStatus] = useState<TransactionStatus>('unsent');

	async function estimateGas() {
		if (txn != null && ctx.signer != null) {
			return ctx.signer!.estimateGas(clone(txn!));
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
		setTxnStatus('unsent');
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
			setErrorMessage(null);

			const execTxn = clone(txn!);

			try {
				if (!execTxn.gasLimit) {
					// add a gas limit with a 10% buffer
					if (!gasLimit) {
						const newGasLimit = (await estimateGas())!;
						execTxn.gasLimit = newGasLimit?.mul(Math.floor(options.gasLimitBuffer * 100)).div(100);

						setGasLimit(wei(newGasLimit));
					} else {
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
				handleError(err);
				throw err;
			}
		}, options),
	};
};

export default useEVMTxn;
