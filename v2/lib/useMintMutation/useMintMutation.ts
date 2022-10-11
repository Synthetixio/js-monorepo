import { useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSynthetix } from '@snx-v2/useSynthetixContracts';
import { useGasOptions } from '@snx-v2/useGasOptions';
import { BigNumber } from '@ethersproject/bignumber';
import { initialState, reducer } from './reducer';

type MintArgs = {
  amount: BigNumber;
  toMax: boolean;
  delegateAddress?: string;
};

const createPopulateTransaction = (
  Synthetix: ReturnType<typeof useSynthetix>['data'],
  mintArgs?: MintArgs
) => {
  if (!Synthetix?.signer || !mintArgs) return undefined;
  const { delegateAddress, amount, toMax } = mintArgs;
  if (amount?.eq(0)) return undefined;
  return () => {
    if (delegateAddress && !toMax) {
      return Synthetix.populateTransaction.issueSynthsOnBehalf(delegateAddress, amount, {
        gasLimit: Synthetix.estimateGas.issueSynthsOnBehalf(delegateAddress, amount),
      });
    }
    if (delegateAddress && toMax) {
      return Synthetix.populateTransaction.issueMaxSynthsOnBehalf(delegateAddress, {
        gasLimit: Synthetix.estimateGas.issueMaxSynthsOnBehalf(delegateAddress),
      });
    }
    if (toMax) {
      return Synthetix.populateTransaction.issueMaxSynths({
        gasLimit: Synthetix.estimateGas.issueMaxSynths(),
      });
    }

    return Synthetix.populateTransaction.issueSynths(mintArgs.amount, {
      gasLimit: Synthetix.estimateGas.issueSynths(mintArgs.amount),
    });
  };
};
export function useMintMutation(mintArgs: MintArgs) {
  const { data: Synthetix } = useSynthetix();

  const [state, dispatch] = useReducer(reducer, initialState);
  const populateTransaction = createPopulateTransaction(Synthetix, mintArgs);
  const {
    data,
    isFetched: isGasFetched,
    isFetching: gasFetching,
    error: gasError,
  } = useGasOptions({
    populateTransaction,
    queryKeys: [mintArgs, populateTransaction],
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
