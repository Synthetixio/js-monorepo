import { useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSynthetix } from '@snx-v2/useSynthetixContracts';
import { useGasOptions } from '@snx-v2/useGasOptions';
import { initialState, reducer } from '@snx-v2/txnReducer';
import Wei from '@synthetixio/wei';

const createPopulateTransaction = (Synthetix: ReturnType<typeof useSynthetix>['data']) => {
  if (!Synthetix?.signer) return undefined;

  return () =>
    Synthetix.populateTransaction.liquidateSelf({
      gasLimit: Synthetix.estimateGas.liquidateSelf(),
    });
};
export function useSelfLiquidationMutation(snxToLiquidate?: Wei) {
  const { data: Synthetix } = useSynthetix();

  const [txnState, dispatch] = useReducer(reducer, initialState);
  const populateTransaction = snxToLiquidate?.gt(0)
    ? createPopulateTransaction(Synthetix)
    : undefined;
  const {
    data,
    isFetched: isGasFetched,
    isFetching: gasFetching,
    error: gasError,
  } = useGasOptions({
    populateTransaction,
    queryKeys: [populateTransaction],
  });

  const { populatedTransaction, gasOptionsForTransaction, transactionPrice } = data || {};

  return {
    ...useMutation(async () => {
      if (!Synthetix?.signer || !populateTransaction) return;

      try {
        dispatch({ type: 'prompting' });
        const txn = await Synthetix.signer.sendTransaction({
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
