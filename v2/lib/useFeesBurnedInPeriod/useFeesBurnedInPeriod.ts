import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { providers } from 'ethers';
import { ContractContext } from '@snx-v2/ContractContext';
import { wei } from '@synthetixio/wei';
import { getFeePool } from '@snx-v2/useSynthetixContracts';
import { NetworkIdByName } from '@synthetixio/contracts-interface';
import { useDebtShareDataPeriod } from '@snx-v2/useDebtShareDataPeriod';

export const useFeesBurnedInPeriod = (period = 1 /* Defaults to previous period*/) => {
  const { walletAddress, networkId } = useContext(ContractContext);
  const { data: debtShareData } = useDebtShareDataPeriod();
  return useQuery({
    queryKey: ['stakingV2', 'useFeesBurnedInPeriod', networkId, walletAddress],
    queryFn: async () => {
      if (!walletAddress || !debtShareData) throw Error('Query should not be enabled');

      const optimismProvider = new providers.InfuraProvider(
        NetworkIdByName['mainnet-ovm'],
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );
      const mainnetProvider = new providers.InfuraProvider(
        NetworkIdByName.mainnet,
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );
      const [FeePoolOptimism, FeePoolMainnet] = await Promise.all([
        getFeePool({
          provider: optimismProvider,
          networkId: NetworkIdByName['mainnet-ovm'],
          signer: null,
        }),
        getFeePool({
          provider: mainnetProvider,
          networkId: NetworkIdByName.mainnet,
          signer: null,
        }),
      ]);

      const [prevFeePeriodOptimism, prevFeePeriodMainnet] = await Promise.all([
        FeePoolOptimism.recentFeePeriods(period),
        FeePoolMainnet.recentFeePeriods(period),
      ]);

      const { userDebtSharePercentage } = debtShareData;
      const totalBurn = wei(prevFeePeriodOptimism.feesToDistribute).add(
        wei(prevFeePeriodMainnet.feesToDistribute)
      );

      return totalBurn.mul(userDebtSharePercentage);
    },

    enabled: Boolean(walletAddress && debtShareData),
    staleTime: 1000,
  });
};
