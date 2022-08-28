import { BigNumberish } from 'ethers';
import { useCallback, useMemo } from 'react';
import { erc20ABI, useAccount, useContractRead, useContractWrite, useNetwork } from 'wagmi';
import { TxConfig } from './useMulticall2';

export const useApprove = (
  contractAddress: string,
  amount: BigNumberish,
  spender: string,
  config?: Partial<TxConfig>
) => {
  const { address: accountAddress } = useAccount();
  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);

  const { writeAsync, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: contractAddress,
    contractInterface: erc20ABI,
    functionName: 'approve',
    args: [spender, amount],
    onError: (e) => {
      config?.onError && config.onError(e);
    },
    onMutate: () => {
      config?.onMutate && config.onMutate();
    },
  });

  const { data: allowance, refetch: refetchAllowance } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: erc20ABI,
    functionName: 'allowance',
    args: [accountAddress, spender],
    enabled: hasWalletConnected && !!contractAddress,
  });

  const sufficientAllowance = useMemo(() => {
    return allowance && allowance.gt(0) && allowance.gte(amount);
  }, [allowance, amount]);

  const approve = useCallback(async () => {
    if (!sufficientAllowance) {
      const txReceipt = await writeAsync();
      await txReceipt.wait();
      refetchAllowance();
      config?.onSuccess && config.onSuccess();
    }
  }, [config, refetchAllowance, sufficientAllowance, writeAsync]);

  return {
    isLoading,
    approve,
    refetchAllowance,
    requireApproval: !sufficientAllowance,
  };
};
