import { BigNumberish } from 'ethers';
import { useCallback } from 'react';
import { useContractWrite } from 'wagmi';
import { contracts } from '../utils/constants';
import { useContract } from './useContract';
import { TxConfig } from './useMulticall';

export const useWrapEth = (config?: Partial<TxConfig>) => {
  const wethContract = useContract(contracts.WETH);

  const { writeAsync, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: wethContract?.address,
    contractInterface: wethContract?.abi,
    functionName: 'deposit',
    args: [],
    onError: (e) => {
      config?.onError && config.onError(e);
    },
    onMutate: () => {
      config?.onMutate && config.onMutate();
    },
  });

  const wrap = useCallback(
    async (amount: BigNumberish) => {
      const txReceipt = await writeAsync({
        recklesslySetUnpreparedOverrides: {
          value: amount,
        },
      });
      await txReceipt.wait();
      config?.onSuccess && config.onSuccess();
    },
    [config, writeAsync]
  );

  return {
    isLoading,
    wrap,
  };
};

export const useUnWrapEth = (config?: Partial<TxConfig>) => {
  const wethContract = useContract(contracts.WETH);

  const { writeAsync, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: wethContract?.address,
    contractInterface: wethContract?.abi,
    functionName: 'withdraw',
    onError: (e) => {
      config?.onError && config.onError(e);
    },
    onMutate: () => {
      config?.onMutate && config.onMutate();
    },
  });

  const unWrap = useCallback(
    async (amount: BigNumberish) => {
      const txReceipt = await writeAsync({
        recklesslySetUnpreparedArgs: [amount],
      });
      await txReceipt.wait();
      config?.onSuccess && config.onSuccess();
    },
    [config, writeAsync]
  );

  return {
    isLoading,
    unWrap,
  };
};
