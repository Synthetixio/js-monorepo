import { useContractWrite } from 'wagmi';
import { useSnxProxy } from './useContract';
import { CollateralType } from '../utils/constants';
import { TxConfig } from './useMulticall2';
import { useCallback } from 'react';
import { ethers } from 'ethers';

export const useMintBurn = (
  accountId: string,
  poolId: string,
  collateral: CollateralType,
  config?: TxConfig
) => {
  const snxProxy = useSnxProxy();

  const { writeAsync: mintTx, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    functionName: 'mintUsd',
    onError: (e) => {
      config?.onError && config.onError(e);
    },
    onMutate: () => {
      config?.onMutate && config.onMutate();
    },
  });

  const mint = useCallback(
    async (amount: number) => {
      try {
        const depositAmount = ethers.utils.parseEther(`${amount}`);
        await mintTx({
          recklesslySetUnpreparedArgs: [accountId, poolId, collateral.address, depositAmount],
        });
      } catch (error) {
        console.log(error);
      }
    },
    [accountId, collateral.address, poolId, mintTx]
  );

  return {
    isLoading,
    mint,
  };
};
