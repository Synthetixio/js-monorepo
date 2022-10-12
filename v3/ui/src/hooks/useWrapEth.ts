import { BigNumberish } from 'ethers';
import { useCallback } from 'react';
import { useContractWrite } from 'wagmi';
import { contracts } from '../utils/constants';
import { useContract } from './useContract';
import { TxConfig } from './useMulticall';

export const useWrapEth = (amount: BigNumberish, config?: Partial<TxConfig>) => {
  const wethContract = useContract(contracts.WETH);

  const { writeAsync, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: wethContract?.address,
    contractInterface: wethContract?.abi,
    functionName: 'deposit',
    args: [],
    overrides: {
      value: amount,
    },
    onError: (e) => {
      config?.onError && config.onError(e);
    },
    onMutate: () => {
      config?.onMutate && config.onMutate();
    },
  });

  const wrap = useCallback(async () => {
    const txReceipt = await writeAsync();
    await txReceipt.wait();
    config?.onSuccess && config.onSuccess();
  }, [config, writeAsync]);

  return {
    isLoading,
    wrap,
  };
};
