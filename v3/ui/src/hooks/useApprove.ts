import { BigNumber, ethers } from 'ethers';
import { useCallback } from 'react';
import { erc20ABI, useContractWrite } from 'wagmi';
import { TxConfig } from './useMulticall';
import { useAllowance } from '@snx-v3/useAllowance';

export const useApprove = (
  contractAddress: string,
  amount: BigNumber,
  spender: string,
  config?: Partial<TxConfig>
) => {
  const { writeAsync, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: contractAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender as `0x${string}`, amount],
    onError: (e) => {
      config?.onError && config.onError(e);
    },
    onMutate: () => {
      config?.onMutate && config.onMutate();
    },
  });

  const { data: allowance, refetch: refetchAllowance } = useAllowance({ contractAddress, spender });

  const sufficientAllowance = Boolean(allowance?.gte(amount));

  const approve = useCallback(
    async (infiniteApproval = false) => {
      if (sufficientAllowance) return;
      if (infiniteApproval) return;
      if (!writeAsync) return;

      const txReceipt = await writeAsync({
        recklesslySetUnpreparedArgs: [
          spender as `0x${string}`,
          infiniteApproval ? ethers.constants.MaxUint256 : amount,
        ],
      });
      await txReceipt.wait();
      refetchAllowance();
      config?.onSuccess && config.onSuccess();
    },
    [amount, config, refetchAllowance, spender, sufficientAllowance, writeAsync]
  );

  return {
    isLoading,
    approve,
    refetchAllowance,
    requireApproval: !sufficientAllowance,
  };
};
