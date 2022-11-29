import { useContext, useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLiquidatorRewards } from '@snx-v2/useSynthetixContracts';
import { useGasOptions } from '@snx-v2/useGasOptions';
import { initialState, reducer } from '@snx-v2/txnReducer';
import { ContractContext } from '@snx-v2/ContractContext';

const createPopulateTransaction = (
  LiquidatorRewards: ReturnType<typeof useLiquidatorRewards>['data'],
  walletAddress: string | null
) => {
  if (!LiquidatorRewards?.signer || !walletAddress) return undefined;

  return () =>
    LiquidatorRewards.populateTransaction.getReward(walletAddress, {
      gasLimit: LiquidatorRewards.estimateGas.getReward(walletAddress),
    });
};

export function useClaimLiquidatorRewardsMutation() {
  const { data: LiquidatorRewards } = useLiquidatorRewards();
  const { walletAddress } = useContext(ContractContext);
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const populateTransaction = createPopulateTransaction(LiquidatorRewards, walletAddress);
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
      if (!LiquidatorRewards?.signer || !populateTransaction) return;

      try {
        dispatch({ type: 'prompting' });
        const txn = await LiquidatorRewards.signer.sendTransaction({
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
