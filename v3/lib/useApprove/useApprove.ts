import { useReducer } from 'react';
import { useAllowance } from '@snx-v3/useAllowance';
import { useGasOptions } from '@snx-v3/useGasOptions';
import { BigNumber, ethers } from 'ethers';
import { useMutation } from '@tanstack/react-query';
import { useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';

const approveAbi = ['function approve(address spender, uint256 amount) returns (bool)'];

const createPopulateTransaction = ({
  contractAddress,
  spender,
  signer,
}: {
  contractAddress?: string;
  spender?: string;
  signer?: ethers.Signer | null;
}) => {
  if (!(contractAddress && spender && signer)) return;
  const contract = new ethers.Contract(contractAddress, approveAbi, signer);
  return (amount: BigNumber) =>
    contract.populateTransaction.approve(spender, amount, {
      gasLimit: contract.estimateGas.approve(spender, amount),
    });
};
export const useApprove = (
  {
    contractAddress,
    amount,
    spender,
  }: {
    contractAddress?: string;
    amount: BigNumber;
    spender?: string;
  },
  eventHandlers?: { onSuccess?: () => void; onMutate?: () => void; onError?: (e: Error) => void }
) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: allowance, refetch: refetchAllowance } = useAllowance({ contractAddress, spender });
  const signer = useSigner();
  const populateTransaction = createPopulateTransaction({
    contractAddress,
    spender,
    signer,
  });

  const { data } = useGasOptions({
    populateTransaction,
    queryKeys: [{ withSigner: Boolean(signer), spender, contractAddress, amount }],
    transactionArgs: amount,
  });
  const { gasOptionsForTransaction } = data || {};
  const sufficientAllowance = Boolean(allowance?.gte(amount));

  const mutation = useMutation({
    mutationFn: async (infiniteApproval: boolean) => {
      if (!signer || !populateTransaction) return;
      if (sufficientAllowance) return;
      try {
        dispatch({ type: 'prompting' });

        const populatedTxn = await populateTransaction(
          infiniteApproval ? ethers.constants.MaxUint256 : amount
        );
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
    },
    ...eventHandlers,
  });
  return {
    mutation,
    txnState,
    isLoading: mutation.isLoading,
    approve: mutation.mutateAsync,
    refetchAllowance,
    requireApproval: !sufficientAllowance,
  };
};
