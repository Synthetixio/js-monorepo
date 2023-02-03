import { useSigner } from '@snx-v3/useBlockchain';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useEthBalance } from '@snx-v3/useEthBalance';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { Contract } from 'ethers';
import { useMutation } from '@tanstack/react-query';
import Wei from '@synthetixio/wei';
import { useCallback } from 'react';

const minimalWETHABI = ['function deposit() payable', 'function withdraw(uint256 wad)'];

export const useWrapEth = () => {
  const ethCollateral = useCollateralType('WETH');
  const signer = useSigner();
  const { data: ethBalance, refetch: refetchETHBalance } = useEthBalance();
  const { data: wethBalance, refetch: refetchWETHBalance } = useTokenBalance(
    ethCollateral?.tokenAddress
  );

  const { mutateAsync, isLoading } = useMutation(async (amount: Wei) => {
    if (!ethCollateral || !signer) return;
    const contract = new Contract(ethCollateral?.tokenAddress, minimalWETHABI, signer);
    const txn = await contract.deposit({ value: amount.toBN() });
    await txn.wait();
  });
  const exec = useCallback(
    async (amount: Wei) => {
      if (!ethBalance) return;
      if (ethBalance.lt(amount)) return;

      await mutateAsync(amount);
      refetchETHBalance();
      refetchWETHBalance();
    },
    [ethBalance, mutateAsync, refetchETHBalance, refetchWETHBalance]
  );
  return {
    exec,
    isLoading,
    wethBalance,
    ethBalance,
  };
};
export const useUnWrapEth = () => {
  const ethCollateral = useCollateralType('WETH');
  const signer = useSigner();
  const { data: ethBalance, refetch: refetchETHBalance } = useEthBalance();
  const { data: wethBalance, refetch: refetchWETHBalance } = useTokenBalance(
    ethCollateral?.tokenAddress
  );
  const { mutateAsync, isLoading } = useMutation(async (amount: Wei) => {
    if (!ethCollateral || !signer) return;
    const contract = new Contract(ethCollateral?.tokenAddress, minimalWETHABI, signer);
    const txn = await contract.withdraw(amount.toBN());
    await txn.wait();
  });
  const exec = useCallback(
    async (amount: Wei) => {
      if (!wethBalance) return;
      if (wethBalance.lt(amount)) return;
      await mutateAsync(amount);
      await Promise.all([refetchETHBalance(), refetchWETHBalance()]);
    },
    [mutateAsync, refetchETHBalance, refetchWETHBalance, wethBalance]
  );
  return {
    exec,
    isLoading,
    wethBalance,
    ethBalance,
  };
};
