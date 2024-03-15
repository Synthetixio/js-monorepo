import { useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useGasOptions } from '@snx-v2/useGasOptions';
import { BigNumber } from '@ethersproject/bignumber';
import { initialState, reducer } from '@snx-v2/txnReducer';
import { useProxyERC20sUSD } from '@snx-v2/useSynthetixContracts';

type ApproveERC20Args = {
  amount: BigNumber;
  spenderAddress: string;
};

const createPopulateTransaction = (
  ProxyERC20sUSD: ReturnType<typeof useProxyERC20sUSD>['data'],
  approveERC20Args?: ApproveERC20Args
) => {
  if (!ProxyERC20sUSD?.signer || !approveERC20Args) return undefined;
  const { spenderAddress, amount } = approveERC20Args;
  if (amount?.eq(0) || !spenderAddress) return undefined;

  return () => {
    return ProxyERC20sUSD.populateTransaction.approve(spenderAddress, amount, {
      gasLimit: ProxyERC20sUSD.estimateGas.approve(spenderAddress, amount),
    });
  };
};
export function useApproveERC20sUSDMutation(approveArgs: ApproveERC20Args) {
  const { data: ProxyERC20sUSD } = useProxyERC20sUSD();

  const [txnState, dispatch] = useReducer(reducer, initialState);
  const populateTransaction = createPopulateTransaction(ProxyERC20sUSD, approveArgs);
  const {
    data,
    isFetched: isGasFetched,
    isFetching: gasFetching,
    error: gasError,
  } = useGasOptions({
    populateTransaction,
    queryKeys: [approveArgs, populateTransaction],
  });

  const { populatedTransaction, gasOptionsForTransaction, transactionPrice } = data || {};

  return {
    ...useMutation(async () => {
      if (!ProxyERC20sUSD?.signer || !populateTransaction) return;

      try {
        dispatch({ type: 'prompting' });
        const txn = await ProxyERC20sUSD.signer.sendTransaction({
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
