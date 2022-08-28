import { BigNumberish } from 'ethers';
import { useCallback } from 'react';
import { useApprove } from './useApprove';

export const useApproveCall = (
  contractAddress: string,
  amount: BigNumberish,
  spender: string,
  call: () => Promise<void>
) => {
  const { approve } = useApprove(contractAddress, amount, spender);

  const exec = useCallback(async () => {
    try {
      await approve();
      call();
    } catch (error) {}
  }, [call, approve]);

  return {
    exec,
  };
};
