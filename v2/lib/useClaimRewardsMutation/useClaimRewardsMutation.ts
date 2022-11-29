import { useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFeePool } from '@snx-v2/useSynthetixContracts';
import { useGasOptions } from '@snx-v2/useGasOptions';
import { initialState, reducer } from '@snx-v2/txnReducer';

const createPopulateTransaction = (FeePool: ReturnType<typeof useFeePool>['data']) => {
  if (!FeePool?.signer) return undefined;

  return () =>
    FeePool.populateTransaction.claimFees({
      gasLimit: FeePool.estimateGas.claimFees(),
    });
};

export function useClaimRewardsMutation() {
  const { data: FeePool } = useFeePool();

  const [txnState, dispatch] = useReducer(reducer, initialState);
  const populateTransaction = createPopulateTransaction(FeePool);
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
      if (!FeePool?.signer || !populateTransaction) return;

      try {
        dispatch({ type: 'prompting' });
        const txn = await FeePool.signer.sendTransaction({
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
