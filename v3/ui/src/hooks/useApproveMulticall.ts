import { BigNumberish } from 'ethers';
import { useCallback } from 'react';
import { useApprove } from './useApprove';
import {
  ContractWriteParams,
  MulticallCall,
  MulticallConfigType,
  useMulticall,
} from './useMulticall2';

export const useApproveMulticall = (
  calls: MulticallCall[],
  approval: {
    contractAddress: string;
    amount: BigNumberish;
    spender: string;
  } | null,
  overrides: ContractWriteParams[0]['overrides'] = {},
  multicallConfig?: Partial<MulticallConfigType>
) => {
  const { approve } = useApprove(
    approval?.contractAddress || '',
    approval?.amount || '',
    approval?.spender || ''
  );

  const { exec: execMulticall, status } = useMulticall(calls, overrides, multicallConfig);

  const exec = useCallback(async () => {
    try {
      await approve();
      execMulticall();
    } catch (error) {}
  }, [approve, execMulticall]);

  return {
    exec,
    status,
  };
};
