import { useContext } from 'react';
import { useLiquidatorRewards } from '@snx-v2/useSynthetixContracts';
import { useQuery } from '@tanstack/react-query';
import { ContractContext } from '@snx-v2/ContractContext';
import { wei } from '@synthetixio/wei';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';

export const useGetLiquidationRewards = () => {
  const { networkId, walletAddress: connectedWalletAddress } = useContext(ContractContext);
  const { delegateWallet } = useDelegateWallet();
  const walletAddress = delegateWallet?.address || connectedWalletAddress;
  const { data: LiquidatorRewards } = useLiquidatorRewards();

  return useQuery(
    ['useGetLiquidationRewards', networkId, walletAddress],
    async () => {
      if (!networkId || !LiquidatorRewards || !walletAddress) {
        throw Error('Query should not be enabled if contracts, network or wallet are missing');
      }
      const liquidatorRewards = await LiquidatorRewards.earned(walletAddress);
      return {
        liquidatorRewards: wei(liquidatorRewards),
      };
    },
    {
      enabled: Boolean(networkId && LiquidatorRewards && walletAddress),
      staleTime: 10000,
    }
  );
};
