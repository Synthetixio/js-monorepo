import { UseMutationOptions, useMutation } from 'react-query';

import Wei, { wei } from '@synthetixio/wei/build/node/wei';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { QueryContext } from '../context';
import TransactionNotifier, { TransactionStatusData } from '@synthetixio/transaction-notifier';

type TransactionStatus = 'unsent' | 'pending' | 'confirmed' | 'failed';

function hexToASCII(hex: string): string {
	// https://gist.github.com/gluk64/fdea559472d957f1138ed93bcbc6f78a#file-reason-js
	// return ethers.utils.toUtf8String(S.split(' ')[1].toString());
	let str = '';
	for (let n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
}

const useEVMTxn = (
	ctx: QueryContext,
	txn: ethers.providers.TransactionRequest | null,
	options: UseMutationOptions<void> = {}
) => {
	const [gasLimit, setGasLimit] = useState<Wei | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [hash, setHash] = useState<string | null>(null);
	const [txnStatus, setTxnStatus] = useState<TransactionStatus>('unsent');

	async function estimateGas() {
		if (txn != null && ctx.signer != null) {
			return ctx.signer!.estimateGas(txn!);
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

		estimateGas()
			.then((gl) => {
				if (gl) setGasLimit(wei(gl, 0));
			})
			.catch((err) => {
				handleError(err);
			});
	}

	useEffect(refresh, [txn]);

	return {
		gasLimit,
		errorMessage,
		hash,
		txnStatus,
		refresh,
		...useMutation(async () => {
			try {
				if (!txn!.gasLimit) {
					// add a gas limit with a 10% buffer
					txn!.gasLimit = (await estimateGas())?.mul(11).div(10);

					if (txn!.gasLimit!.eq(0)) {
						throw new Error('missing provider/signer for txn');
					}
				}

				const txndata = await ctx.signer!.sendTransaction(txn!);

				setHash(txndata.hash);
				setTxnStatus('pending');

				const emitter = new TransactionNotifier(
					ctx.provider! as ethers.providers.Web3Provider
				).hash(txndata.hash);

				emitter.on('txConfirmed', (_: TransactionStatusData) => {
					setTxnStatus('confirmed');
				});
				emitter.on('txFailed', ({ failureReason }: TransactionStatusData) => {
					setTxnStatus('failed');
					setErrorMessage(failureReason || 'unknown error');
				});
			} catch (err) {
				handleError(err);
				throw err;
			}
		}, options),
	};
};

export default useEVMTxn;
