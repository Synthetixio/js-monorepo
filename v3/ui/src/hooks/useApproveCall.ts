import { BigNumberish } from 'ethers';
import { useCallback } from 'react';
import { useApprove } from './useApprove';
import { TxConfig } from './useMulticall2';

export const useApproveCall = (
  contractAddress: string,
  amount: BigNumberish,
  spender: string,
  call: () => Promise<void>,
  config?: Partial<TxConfig>
) => {
  const { approve, isLoading } = useApprove(contractAddress, amount, spender, config);

  const exec = useCallback(async () => {
    try {
      await approve();
      call();
    } catch (error) {}
  }, [call, approve]);

  return {
    isLoading,
    exec,
  };
};
