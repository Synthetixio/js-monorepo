import { BigNumberish } from 'ethers';
import { useCallback } from 'react';
import { useAccount, useBalance, useContractWrite } from 'wagmi';
import { TxConfig } from './useMulticall';
import { useEthCollateralType } from '@snx-v3/useCollateralTypes';
import * as Erc20 from '@synthetixio/v3-contracts/build/_ERC20';

export const useWrapEth = (config?: Partial<TxConfig>) => {
  const ethCollateral = useEthCollateralType();

  // TODO: refactor with simple contract interactions later
  // const provider = useProvider();
  // const EthContract = useMemo(
  //   () =>
  //     ethCollateral?.tokenAddress
  //       ? (new ethers.Contract(ethCollateral.tokenAddress, Erc20.abi, provider) as Erc20._ERC20)
  //       : null,
  //   [ethCollateral?.tokenAddress, provider]
  // );

  const { address: accountAddress } = useAccount();
  const { writeAsync, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: ethCollateral?.tokenAddress || '',
    contractInterface: Erc20.abi,
    functionName: 'deposit',
    args: [],
    enabled: Boolean(ethCollateral?.tokenAddress),
    onError: (e) => {
      config?.onError && config.onError(e);
    },
    onMutate: () => {
      config?.onMutate && config.onMutate();
    },
  });

  const { data: balance, refetch } = useBalance({
    addressOrName: accountAddress,
    token: ethCollateral?.tokenAddress,
    enabled: Boolean(ethCollateral?.tokenAddress),
  });

  const wrap = useCallback(
    async (amount: BigNumberish, useBalance = false) => {
      if (!useBalance || balance?.value.lt(amount)) {
        const txReceipt = await writeAsync({
          recklesslySetUnpreparedOverrides: {
            value: amount,
          },
        });
        await txReceipt.wait();
      }
      refetch();
      config?.onSuccess && config.onSuccess();
    },
    [balance?.value, config, refetch, writeAsync]
  );

  return {
    isLoading,
    wrap,
    balance,
  };
};

export const useUnWrapEth = (config?: Partial<TxConfig>) => {
  const ethCollateral = useEthCollateralType();

  const { writeAsync, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: ethCollateral?.tokenAddress || '',
    contractInterface: Erc20.abi,
    functionName: 'withdraw',
    enabled: Boolean(ethCollateral?.tokenAddress),
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
