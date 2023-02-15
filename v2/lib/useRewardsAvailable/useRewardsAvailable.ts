import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFeePool } from '@snx-v2/useSynthetixContracts';
import { ContractContext } from '@snx-v2/ContractContext';
import { wei } from '@synthetixio/wei';

export const useRewardsAvailable = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const { data: FeePool } = useFeePool();
  return useQuery(
    ['useRewardsAvailable', networkId, walletAddress],
    async () => {
      if (!FeePool || !walletAddress) {
        throw Error('Query should not be enabled if contracts are missing');
      }
      const [[_sUSDRewardsBn, snxRewardsBn], [currentFeePeriodId], lastFeePeriodUserClaimed] =
        await Promise.all([
          FeePool.feesAvailable(walletAddress),
          FeePool.recentFeePeriods(1),
          FeePool.getLastFeeWithdrawal(walletAddress),
        ]);
      const hasClaimed = currentFeePeriodId.eq(lastFeePeriodUserClaimed);
      const snxRewards = wei(snxRewardsBn);
      return {
        nothingToClaim: snxRewards.eq(0),
        snxRewards,
        hasClaimed,
      };
    },
    {
      enabled: Boolean(networkId && FeePool && walletAddress),
      staleTime: 1000,
    }
  );
};
