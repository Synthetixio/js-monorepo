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

const getMethod = (toMax: boolean, delegateAddress?: string) => {
  if (delegateAddress) {
    return toMax ? 'issueMaxSynthsOnBehalf' : 'issueSynthsOnBehalf';
  }
  return toMax ? 'issueMaxSynths' : 'issueSynths';
};
const createPopulateTransaction = (
  Synthetix: ReturnType<typeof useSynthetix>['data'],
  mintArgs?: MintArgs
) => {
  if (!Synthetix?.signer || !mintArgs) return undefined;
  const { delegateAddress, amount } = mintArgs;
  if (amount?.eq(0)) return undefined;
  const method = getMethod(mintArgs.toMax ?? false, delegateAddress);
  return () => {
    if (method === 'issueSynths') {
      return Synthetix.populateTransaction[method](mintArgs.amount, {
        gasLimit: Synthetix.estimateGas[method](mintArgs.amount),
      });
    }
    if (method === 'issueMaxSynths') {
      return Synthetix.populateTransaction[method]({
        gasLimit: Synthetix.estimateGas[method](),
      });
    }
    if (delegateAddress && method === 'issueSynthsOnBehalf') {
      return Synthetix.populateTransaction[method](delegateAddress, mintArgs.amount, {
        gasLimit: Synthetix.estimateGas[method](delegateAddress, mintArgs.amount),
      });
    }
    if (delegateAddress && method === 'issueMaxSynthsOnBehalf') {
      return Synthetix.populateTransaction[method](delegateAddress, {
        gasLimit: Synthetix.estimateGas[method](delegateAddress),
      });
    }
    throw Error(
      `Programmatic error for creating mint call, method is: ${method}, delegateWallet:${delegateAddress}`
    );
  };
};
export function useMintMutation(mintArgs: MintArgs) {
  const { data: Synthetix } = useSynthetix();

  const [state, dispatch] = useReducer(reducer, initialState);
  const populateTransaction = createPopulateTransaction(Synthetix, mintArgs);
  const {
    data,
    isLoading: isGasLoading,
    error: gasError,
  } = useGasOptions({
    populateTransaction,
    queryKeys: [mintArgs, populateTransaction],
  });
  const { gasOptionsForTransaction, transactionPrice } = data || {};

  const isLoading = isGasLoading;

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
        setTimeout(() => dispatch({ type: 'settled' }), 1000);
      } catch (error: any) {
        dispatch({ type: 'error' });
        setTimeout(() => dispatch({ type: 'settled' }), 1000);
      }
    }),
    transactionFee: transactionPrice,
    isLoading,
    modalOpen,
    txnStatus,
    error: error || gasError,
  };
}
