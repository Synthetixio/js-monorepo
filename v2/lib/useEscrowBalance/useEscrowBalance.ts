import { ContractContext } from '@snx-v2/ContractContext';
import { useRewardEscrowV2 } from '@snx-v2/useSynthetixContracts/useRewardEscrowV2';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const useEscrowBalance = () => {
  const { data: RewardEscrowV2 } = useRewardEscrowV2();
  const { walletAddress, networkId } = useContext(ContractContext);
  return useQuery(
    [walletAddress, networkId, 'useEscrowBalance'],
    async () => {
      if (!networkId || !walletAddress || !RewardEscrowV2) {
        throw Error('Query should not be enabled when missing network, wallet or contract');
      }
      const escrowedBalanceBn = await RewardEscrowV2?.balanceOf(walletAddress);
      return {
        totalEscrowed: wei(escrowedBalanceBn || 0),
      };
    },
    {
      enabled: Boolean(networkId && walletAddress && RewardEscrowV2),
    }
  );
};
