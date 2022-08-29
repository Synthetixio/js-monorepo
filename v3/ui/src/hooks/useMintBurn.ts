import { useContractWrite } from 'wagmi';
import { useSnxProxy } from './useContract';
import { CollateralType } from '../utils/constants';
import { TxConfig } from './useMulticall2';
import { useCallback } from 'react';
import { ethers } from 'ethers';

export const useMintBurn = (
  accountId: string,
  fundId: string,
  collateral: CollateralType,
  config?: TxConfig
) => {
  const snxProxy = useSnxProxy();

  const depositAmount = ethers.utils.parseEther('2');

  const { writeAsync: mintTx, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    functionName: 'mintUSD',
    args: [accountId, fundId, collateral.address, depositAmount],
    onError: (e) => {
      config?.onError && config.onError(e);
    },
    onMutate: () => {
      config?.onMutate && config.onMutate();
    },
  });

  const mint = useCallback(async () => {
    try {
      await mintTx();
    } catch (error) {}
  }, [mintTx]);

  return {
    isLoading,
    mint,
  };
};
