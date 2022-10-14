import { useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSynthetix } from '@snx-v2/useSynthetixContracts';
import { useGasOptions } from '@snx-v2/useGasOptions';
import { BigNumber } from '@ethersproject/bignumber';
import { initialState, reducer } from '@snx-v2/txnReducer';

type BurnArgs = {
  amount: BigNumber;
  toTarget?: boolean;
  delegateAddress?: string;
};

const createPopulateTransaction = (
  Synthetix: ReturnType<typeof useSynthetix>['data'],
  burnArgs?: BurnArgs
) => {
  if (!Synthetix?.signer || !burnArgs) return undefined;
  const { delegateAddress, amount, toTarget } = burnArgs;
  if (amount?.eq(0)) return undefined;
  return () => {
    if (delegateAddress && !toTarget) {
      return Synthetix.populateTransaction.burnSynthsOnBehalf(delegateAddress, amount, {
        gasLimit: Synthetix.estimateGas.burnSynthsOnBehalf(delegateAddress, amount),
      });
    }
    if (delegateAddress && toTarget) {
      return Synthetix.populateTransaction.burnSynthsToTargetOnBehalf(delegateAddress, {
        gasLimit: Synthetix.estimateGas.burnSynthsToTargetOnBehalf(delegateAddress),
      });
    }
    if (toTarget) {
      return Synthetix.populateTransaction.burnSynthsToTarget({
        gasLimit: Synthetix.estimateGas.burnSynthsToTarget(),
      });
    }

    return Synthetix.populateTransaction.burnSynths(amount, {
      gasLimit: Synthetix.estimateGas.burnSynths(amount),
    });
  };
};
export function useBurnMutation(burnArgs: BurnArgs) {
  const { data: Synthetix } = useSynthetix();

  const [state, dispatch] = useReducer(reducer, initialState);
  const populateTransaction = createPopulateTransaction(Synthetix, burnArgs);
  const {
    data,
    isFetched: isGasFetched,
    isFetching: gasFetching,
    error: gasError,
  } = useGasOptions({
    populateTransaction,
    queryKeys: [burnArgs, populateTransaction],
  });

  const { gasOptionsForTransaction, transactionPrice } = data || {};
  const { modalOpen, txnStatus, error } = state;

  return {
    ...useMutation(async () => {
      if (!Synthetix?.signer || !populateTransaction) return;

      try {
        dispatch({ type: 'prompting' });
        const populatedTxn = await populateTransaction();
        const txn = await Synthetix.signer.sendTransaction({
          ...populatedTxn,
          ...gasOptionsForTransaction,
        });
        dispatch({ type: 'pending' });
        await txn.wait();
        dispatch({ type: 'success' });
      } catch (error: any) {
        dispatch({ type: 'error', payload: { error } });
        throw error;
      }
    }),
    transactionFee: transactionPrice,
    isGasEnabledAndNotFetched: gasFetching && !isGasFetched,
    modalOpen,
    txnStatus,
    error,
    gasError: gasError as Error | null,
    settle: () => dispatch({ type: 'settled' }),
  };
}
