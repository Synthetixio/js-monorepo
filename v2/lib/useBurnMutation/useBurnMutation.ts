import { useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSynthetix } from '@snx-v2/useSynthetixContracts';
import { useGasOptions } from '@snx-v2/useGasOptions';
import { BigNumber } from '@ethersproject/bignumber';
import { initialState, reducer } from './reducer';
import { DelegationWallet } from '@synthetixio/queries';

type BurnVariables = {
  amount: BigNumber;
  toTarget?: boolean;
};

export function useBurnMutation(delegateAddress: DelegationWallet | null) {
  const { data: Synthetix } = useSynthetix();

  const [state, dispatch] = useReducer(reducer, initialState);
  // TODO this needs some love
  const populateTransaction = Synthetix
    ? () => Synthetix.populateTransaction.burnSynths(0)
    : undefined;

  const {
    data,
    isLoading: isGasLoading,
    error,
  } = useGasOptions({
    populateTransaction,
    queryKeys: [],
  });

  const { gasOptionsForTransaction, transactionPrice: transactionFee } = data || {};

  const isLoading = isGasLoading;

  const { modalOpen, txnStatus } = state;

  return {
    ...useMutation(async (variables: BurnVariables) => {
      if (!Synthetix) return;
      let txn;
      try {
        dispatch({ type: 'prompting' });
        const { amount, toTarget } = variables;
        if (toTarget) {
          txn = delegateAddress
            ? await Synthetix.burnSynthsToTargetOnBehalf(
                delegateAddress.address,
                gasOptionsForTransaction
              )
            : await Synthetix.burnSynthsToTarget(gasOptionsForTransaction);
        } else {
          txn = delegateAddress
            ? await Synthetix.burnSynthsOnBehalf(
                delegateAddress.address,
                amount,
                gasOptionsForTransaction
              )
            : await Synthetix.burnSynths(amount, gasOptionsForTransaction);
        }
        dispatch({ type: 'pending' });
        await txn.wait();
        dispatch({ type: 'success' });
        setTimeout(() => dispatch({ type: 'settled' }), 1000);
      } catch (error: any) {
        dispatch({ type: 'error' });
        setTimeout(() => dispatch({ type: 'settled' }), 1000);
      }
    }),
    transactionFee,
    isLoading,
    modalOpen,
    txnStatus,
    error,
  };
}
