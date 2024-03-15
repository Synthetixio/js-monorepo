import { useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useGasOptions } from '@snx-v2/useGasOptions';
import { BigNumber } from '@ethersproject/bignumber';
import { initialState, reducer } from '@snx-v2/txnReducer';
import { useSynthetixBridge } from '@snx-v2/useSynthetixContracts/useSynthetixBridge';
import { ethers } from 'ethers';

type NativeBridgeArgs = {
  amount: BigNumber;
  currencyKey: string;
  destination: string;
};

const createPopulateTransaction = (
  SynthetixBridge: ReturnType<typeof useSynthetixBridge>['data'],
  nativeArgs?: NativeBridgeArgs
) => {
  if (!SynthetixBridge?.signer || !nativeArgs) return undefined;
  const { currencyKey, destination, amount } = nativeArgs;
  if (amount?.eq(0) || !destination) return undefined;
  const currencyKeyBytes32 = ethers.utils.formatBytes32String(currencyKey);

  return () => {
    return SynthetixBridge.populateTransaction.initiateSynthTransfer(
      currencyKeyBytes32,
      destination,
      amount,
      {
        gasLimit: SynthetixBridge.estimateGas.initiateSynthTransfer(
          currencyKeyBytes32,
          destination,
          amount
        ),
      }
    );
  };
};
export function useBridgeMutation(bridgeArgs: NativeBridgeArgs) {
  const { data: SynthetixBridge } = useSynthetixBridge();

  const [txnState, dispatch] = useReducer(reducer, initialState);
  const populateTransaction = createPopulateTransaction(SynthetixBridge, bridgeArgs);
  const {
    data,
    isFetched: isGasFetched,
    isFetching: gasFetching,
    error: gasError,
  } = useGasOptions({
    populateTransaction,
    queryKeys: [bridgeArgs, populateTransaction],
  });

  const { populatedTransaction, gasOptionsForTransaction, transactionPrice } = data || {};

  return {
    ...useMutation(async () => {
      if (!SynthetixBridge?.signer || !populateTransaction) return;

      try {
        dispatch({ type: 'prompting' });
        const txn = await SynthetixBridge.signer.sendTransaction({
          ...populatedTransaction,
          ...gasOptionsForTransaction,
        });
        dispatch({ type: 'pending', payload: { txnHash: txn.hash } });
        await txn.wait();
        dispatch({ type: 'success' });
      } catch (error: any) {
        dispatch({ type: 'error', payload: { error } });
        throw error;
      }
    }),
    ...txnState,
    transactionFee: transactionPrice,
    isGasEnabledAndNotFetched: gasFetching && !isGasFetched,
    gasError: gasError as Error | null,
    settle: () => dispatch({ type: 'settled' }),
  };
}
