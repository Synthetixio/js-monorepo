import { BigNumberish, ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import { erc20ABI, useAccount, useContractRead, useContractWrite, useNetwork } from 'wagmi';
import { TxConfig } from './useMulticall';

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
    address: contractAddress,
    abi: erc20ABI,
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
    address: contractAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [accountAddress, spender],
    enabled: hasWalletConnected && !!contractAddress,
  });

  const sufficientAllowance = useMemo(() => {
    return allowance && allowance.gte(amount);
  }, [allowance, amount]);

  const approve = useCallback(
    async (infiniteApproval = false) => {
      if (!sufficientAllowance || infiniteApproval) {
        const txReceipt = await writeAsync({
          recklesslySetUnpreparedArgs: [
            spender,
            infiniteApproval ? ethers.constants.MaxUint256 : amount,
          ],
        });
        await txReceipt.wait();
        refetchAllowance();
        config?.onSuccess && config.onSuccess();
      }
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
