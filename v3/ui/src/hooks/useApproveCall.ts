import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useApprove } from './useApprove';
import { TxConfig } from './useMulticall';

export const useApproveCall = (
  contractAddress: string,
  amount: BigNumber,
  spender: string,
  call: () => Promise<void>,
  config?: Partial<TxConfig>
) => {
  const { approve, isLoading, refetchAllowance } = useApprove(
    contractAddress,
    amount,
    spender,
    config
  );

  const exec = useCallback(async () => {
    try {
      await approve();
      await call();
      refetchAllowance();
    } catch (error) {}
  }, [call, approve, refetchAllowance]);

  return {
    isLoading,
    exec,
  };
};
