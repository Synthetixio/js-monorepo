import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFeePool } from '@snx-v2/useSynthetixContracts';
import { ContractContext } from '@snx-v2/ContractContext';
import { wei } from '@synthetixio/wei';

export const useRewardsAvailable = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const { data: FeePool } = useFeePool();
  return useQuery(
    ['staking', 'useFeesAvailable', networkId, walletAddress],
    async () => {
      if (!FeePool || !walletAddress) {
        throw Error('Query should not be enabled if contracts are missing');
      }

      const [sUSDRewardsBn, snxRewardsBn] = await FeePool.feesAvailable(walletAddress);

      const sUSDRewards = wei(sUSDRewardsBn);
      const snxRewards = wei(snxRewardsBn);
      return {
        sUSDRewards,
        snxRewards,
        hasClaimed: sUSDRewards.eq(0) && snxRewards.eq(0),
      };
    },
    {
      enabled: Boolean(networkId && FeePool && walletAddress),
      staleTime: 1000,
    }
  );
};
