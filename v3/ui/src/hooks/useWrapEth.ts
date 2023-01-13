import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useBalance, useContractWrite } from 'wagmi';
import { useAccount } from '@snx-v3/useBlockchain';
import { TxConfig } from './useMulticall';
import { useCollateralType } from '@snx-v3/useCollateralTypes';

const minimalWETHABI = [
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'wad',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
export const useWrapEth = (config?: Partial<TxConfig>) => {
  const ethCollateral = useCollateralType('WETH');

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
    // @ts-ignore
    address: ethCollateral?.tokenAddress || '',
    abi: minimalWETHABI,
    functionName: 'deposit',
    args: [],
    onError: (e) => {
      config?.onError && config.onError(e);
    },
    onMutate: () => {
      config?.onMutate && config.onMutate();
    },
  });

  const { data: ethBalance, refetch: refetchETHBal } = useBalance({
    address: accountAddress as `0x${string}`,
  });
  const { data: wETHBalance, refetch: refetchWETHBal } = useBalance({
    address: accountAddress as `0x${string}`,
    token: ethCollateral?.tokenAddress as `0x${string}`,
    enabled: Boolean(ethCollateral?.tokenAddress),
  });

  const wrap = useCallback(
    async (amount: BigNumber) => {
      if (!ethBalance) return;
      if (ethBalance.value.lt(amount)) return;
      if (!writeAsync) return;

      const txReceipt = await writeAsync({
        recklesslySetUnpreparedOverrides: {
          value: amount,
        },
      });
      await txReceipt.wait();

      refetchETHBal();
      refetchWETHBal();
      config?.onSuccess && config.onSuccess();
    },
    [ethBalance, config, refetchETHBal, refetchWETHBal, writeAsync]
  );

  return {
    isLoading,
    wrap,
    balance: wETHBalance,
  };
};

export const useUnWrapEth = (config?: Partial<TxConfig>) => {
  const ethCollateral = useCollateralType('WETH');

  const { writeAsync, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    // @ts-ignore
    address: ethCollateral?.tokenAddress,
    abi: minimalWETHABI,
    functionName: 'withdraw',
    onError: (e) => {
      config?.onError && config.onError(e);
    },
    onMutate: () => {
      config?.onMutate && config.onMutate();
    },
  });

  const unWrap = useCallback(
    async (amount: BigNumber) => {
      if (!writeAsync) return;
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
