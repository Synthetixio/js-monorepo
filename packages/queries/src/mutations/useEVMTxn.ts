/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UseMutationOptions, useMutation } from 'react-query';

import Wei, { wei } from '@synthetixio/wei/build/node/wei';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { QueryContext } from '../context';
import clone from 'lodash/clone';
import omit from 'lodash/omit';
import { isString } from 'lodash';
import { NetworkId } from '@synthetixio/contracts-interface';
import optimismOracleContract from '../contracts/OptimismGasPriceOracle';

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
	const [gasLimit, setGasLimit] = useState<ethers.BigNumber | null>(null);
	const [optimismLayerOneFee, setOptimismLayerOneFee] = useState<Wei | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [hash, setHash] = useState<string | null>(null);
	const [txnStatus, setTxnStatus] = useState<TransactionStatus>('unsent');

	const getOptimismLayerOneFees = async () => {
		if (!txn || !ctx.provider) return null;
		const isNotOvm =
			ctx.networkId !== NetworkId['Mainnet-Ovm'] && ctx.networkId !== NetworkId['Kovan-Ovm'];
		if (isNotOvm) {
			return null;
		}

		const OptimismGasPriceOracleContract = new ethers.Contract(
			optimismOracleContract.address,
			optimismOracleContract.abi,
			ctx.provider
		);
		const serializedTxn = ethers.utils.serializeTransaction(txn as ethers.UnsignedTransaction);
		return wei(await OptimismGasPriceOracleContract.getL1Fee(serializedTxn));
	};

	const estimateGas = async () => {
		if (txn != null && ctx.signer != null && (!options || options.enabled)) {
			// remove gas price from the estimate because it will cause unusual error if its below the base
			// it will be used at the end when the actual transaction is submitted
			return ctx.signer.estimateGas(omit(txn, ['gasPrice']));
		}

		return null;
	};

	function handleError(err: any) {
		const errorMessage =
			err.data && isString(err.data) ? hexToASCII(err.data) : err.data?.message ?? err.message;
		setErrorMessage(errorMessage);
	}

	const refresh = async () => {
		if (txnStatus === 'confirmed' || txnStatus === 'failed') {
			setTxnStatus('unsent');
		}
		try {
			if (!options || options.enabled) {
				setErrorMessage(null);
				setOptimismLayerOneFee(await getOptimismLayerOneFees());

				const gl = await estimateGas();
				if (gl) setGasLimit(gl);
			}
		} catch (e) {
			handleError(e);
		}
	};
	const transactionValueAsString = txn?.value ? txn.value.toString() : undefined;
	const nonceAsString = txn?.nonce ? txn.nonce.toString() : undefined;
	useEffect(() => {
		refresh();
	}, [txn?.data, transactionValueAsString, nonceAsString, txn?.from, txn?.to]);

	return {
		gasLimit,
		optimismLayerOneFee,
		errorMessage,
		hash,
		txnStatus,
		refresh,
		...useMutation(async () => {
			if ((options && !options.enabled) || !txn || !ctx.signer) {
				return;
			}

			setErrorMessage(null);

			const execTxn = clone(txn);

			try {
				if (!execTxn.gasLimit) {
					if (!gasLimit) {
						const newGasLimit = await estimateGas();
						execTxn.gasLimit = wei(newGasLimit ?? 0, 9)
							.mul(1 + (options?.gasLimitBuffer || DEFAULT_GAS_BUFFER))
							.toBN();
						setGasLimit(newGasLimit);
					} else {
						execTxn.gasLimit = wei(gasLimit, 9)
							.mul(1 + (options?.gasLimitBuffer || DEFAULT_GAS_BUFFER))
							.toBN();
					}
				}

				setTxnStatus('prompting');

				const txnData = await ctx.signer.sendTransaction(execTxn);

				setTxnStatus('pending');
				setHash(txnData.hash);

				// keep the async function going until the transaction has completed
				const txnResult = await txnData.wait();

				if (txnResult.status == 1) {
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
