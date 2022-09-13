import { useEffect, useState } from 'react';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import Wei, { wei } from '@synthetixio/wei';
import { BigNumber } from '@ethersproject/bignumber';
import { TransactionRequest } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { serialize, UnsignedTransaction } from '@ethersproject/transactions';
import { QueryContext } from '../context';
import clone from 'lodash/clone';
import omit from 'lodash/omit';
import { NetworkIdByName } from '@synthetixio/contracts-interface';
import optimismOracleContract from '../contracts/OptimismGasPriceOracle';
import errorToErrorMessage from './errorToErrorMessage';

type TransactionStatus = 'unsent' | 'prompting' | 'pending' | 'confirmed' | 'failed';

const DEFAULT_GAS_BUFFER = 0.2;

export interface UseEVMTxnOptions extends UseMutationOptions<void> {
  gasLimitBuffer?: number;
  // whether or not the transaction should attempt to estimate gas or execute at all
  enabled?: boolean;
}

const useEVMTxn = (
  ctx: QueryContext,
  txn: TransactionRequest | null,
  options?: UseEVMTxnOptions
) => {
  const [gasLimit, setGasLimit] = useState<BigNumber | null>(null);
  const [optimismLayerOneFee, setOptimismLayerOneFee] = useState<Wei | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [txnStatus, setTxnStatus] = useState<TransactionStatus>('unsent');

  const getOptimismLayerOneFees = async () => {
    if (!txn || !ctx.provider) return null;
    const isNotOvm =
      ctx.networkId !== NetworkIdByName['mainnet-ovm'] &&
      ctx.networkId !== NetworkIdByName['kovan-ovm'] &&
      ctx.networkId !== NetworkIdByName['goerli-ovm'];
    if (isNotOvm) {
      return null;
    }

    const OptimismGasPriceOracleContract = new Contract(
      optimismOracleContract.address,
      optimismOracleContract.abi,
      ctx.provider
    );
    // If user initialized the transaction on mainnet and then switched to optimism we need to manually remove EIP1559 fields
    const cleanedTxn = omit(txn, ['maxPriorityFeePerGas', 'maxFeePerGas']);
    const serializedTxn = serialize(cleanedTxn as UnsignedTransaction);
    return wei(await OptimismGasPriceOracleContract.getL1Fee(serializedTxn));
  };

  const estimateGas = async () => {
    if (txn != null && ctx.signer != null && (!options || options.enabled)) {
      // remove gas price from the estimate because it will cause unusual error if its below the base
      // it will be used at the end when the actual transaction is submitted
      return ctx.signer.estimateGas(
        omit(txn, ['gasPrice', 'maxPriorityFeePerGas', 'maxFeePerGas'])
      );
    }

    return null;
  };

  function handleError(err: any) {
    setErrorMessage(errorToErrorMessage(err));
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
  }, [txn?.data, transactionValueAsString, nonceAsString, txn?.from, txn?.to, ctx.networkId]);

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
