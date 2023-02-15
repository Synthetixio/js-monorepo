import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { providers } from 'ethers';
import { ContractContext } from '@snx-v2/ContractContext';
import Wei, { wei } from '@synthetixio/wei';
import { useFeePool, useSynthetixDebtShare } from '@snx-v2/useSynthetixContracts/';
import { NetworkIdByName } from '@synthetixio/contracts-interface';

// exported for tests
export const calculateTotalBurn = ({
  userDebtShareSupplyCurrentNetwork,
  totalDebtShareSupplyOptimism,
  totalDebtShareSupplyMainnet,
  totalBurnMainnet,
  totalBurnOptimism,
}: {
  userDebtShareSupplyCurrentNetwork: Wei;
  totalDebtShareSupplyOptimism: Wei;
  totalDebtShareSupplyMainnet: Wei;
  totalBurnMainnet: Wei;
  totalBurnOptimism: Wei;
}) => {
  const totalDebtShareSupply = totalDebtShareSupplyMainnet.add(totalDebtShareSupplyOptimism);

  if (!userDebtShareSupplyCurrentNetwork) return wei(0);

  const totalBurn = totalBurnMainnet.add(totalBurnOptimism);
  return totalBurn.mul(userDebtShareSupplyCurrentNetwork.div(totalDebtShareSupply));
};

export const useFeesBurnedInPeriod = (period = 1) => {
  const { walletAddress, networkId } = useContext(ContractContext);
  const { data: DebtShare } = useSynthetixDebtShare();
  const { data: FeePool } = useFeePool();

  return useQuery({
    queryKey: ['stakingV2', 'useFeesBurnedInPeriod', networkId, walletAddress],
    queryFn: async () => {
      if (!DebtShare || !FeePool || !walletAddress) throw Error('Query should not be enabled');

      const optimismProvider = new providers.InfuraProvider(
        NetworkIdByName['mainnet-ovm'],
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );
      const mainnetProvider = new providers.InfuraProvider(
        NetworkIdByName.mainnet,
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );

      const DebtShareOptimism = DebtShare.connect(optimismProvider);
      const DebtShareMainnet = DebtShare.connect(mainnetProvider);
      const FeePoolOptimism = FeePool.connect(optimismProvider);
      const FeePoolMainnet = FeePool.connect(mainnetProvider);

      const [prevFeePeriodOptimism, prevFeePeriodMainnet] = await Promise.all([
        FeePoolOptimism.recentFeePeriods(period),
        FeePoolMainnet.recentFeePeriods(period),
      ]);

      const periodIdForCurrentNetwork =
        networkId === NetworkIdByName['mainnet-ovm']
          ? prevFeePeriodOptimism.feePeriodId
          : prevFeePeriodMainnet.feePeriodId;
      const [
        userDebtShareSupplyCurrentNetwork,
        totalDebtShareSupplyOptimism,
        totalDebtShareSupplyMainnet,
      ] = await Promise.all([
        DebtShare.balanceOfOnPeriod(walletAddress, periodIdForCurrentNetwork),
        DebtShareOptimism.totalSupplyOnPeriod(prevFeePeriodOptimism.feePeriodId),
        DebtShareMainnet.totalSupplyOnPeriod(prevFeePeriodMainnet.feePeriodId),
      ]);

      return calculateTotalBurn({
        userDebtShareSupplyCurrentNetwork: wei(userDebtShareSupplyCurrentNetwork),
        totalDebtShareSupplyOptimism: wei(totalDebtShareSupplyOptimism),
        totalDebtShareSupplyMainnet: wei(totalDebtShareSupplyMainnet),
        totalBurnOptimism: wei(prevFeePeriodOptimism.feesToDistribute),
        totalBurnMainnet: wei(prevFeePeriodOptimism.feesToDistribute),
      });
    },

    enabled: Boolean(FeePool && walletAddress && DebtShare),
    staleTime: 1000,
  });
};
