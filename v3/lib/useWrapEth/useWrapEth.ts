import { useReducer } from 'react';
import { ethers, BigNumber } from 'ethers';
import { useSigner } from '@snx-v3/useBlockchain';
import { useEthCollateralType } from '@snx-v3/useCollateralTypes';
import { useMutation } from '@tanstack/react-query';
import { useGasOptions } from '@snx-v3/useGasOptions';
import { initialState, reducer } from '@snx-v3/txnReducer';

const ABI = [
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
];
const createPopulateTransaction = ({
  wETHAddress,
  signer,
  amount,
}: {
  wETHAddress?: string;
  signer?: ethers.Signer | null;
}) => {
  if (!signer || !wETHAddress) return;
  const contract = new ethers.Contract(wETHAddress, ABI, signer);
  return () =>
    contract.populateTransaction.deposit(amount, {
      value: amount,
      gasLimit: contract.estimateGas.deposit(),
    });
};
export const useWrapEth = (
  { amount }: { amount: BigNumber },
  eventHandlers?: { onSuccess?: () => void; onMutate?: () => void; onError?: (e: Error) => void }
) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);

  const ethCollateral = useEthCollateralType();
  const signer = useSigner();
  const wETHAddress = ethCollateral?.tokenAddress;
  const populateTransaction = createPopulateTransaction({
    wETHAddress,
    signer,
  });
  const { data } = useGasOptions({
    populateTransaction,
    queryKeys: [{ withSigner: Boolean(signer), amount, wETHAddress }],
    transactionArgs: amount,
  });
  const { gasOptionsForTransaction } = data || {};
  const mutation = useMutation(async (amount) => {
    if (!signer || !populateTransaction) return;
    try {
      dispatch({ type: 'prompting' });

      const populatedTxn = await populateTransaction();
      const txn = await signer.sendTransaction({
        ...populatedTxn,
        ...gasOptionsForTransaction,
      });
      dispatch({ type: 'pending', payload: { txnHash: txn.hash } });

      await txn.wait();
      dispatch({ type: 'success' });
    } catch (error: any) {
      dispatch({ type: 'error', payload: { error } });
      throw error;
    }
  }, eventHandlers);
  return {
    mutation,
    txnState,
    isLoading: mutation.isLoading,
    wrap: mutation.mutateAsync,
  };
};
