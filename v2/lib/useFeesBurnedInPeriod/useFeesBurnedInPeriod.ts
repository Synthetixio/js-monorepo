import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { providers } from 'ethers';
import { ContractContext } from '@snx-v2/ContractContext';
import Wei, { wei } from '@synthetixio/wei';
import { getFeePool, getSynthetixDebtShare } from '@snx-v2/useSynthetixContracts';
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

export const useFeesBurnedInPeriod = (period = 1 /* Defaults to previous period*/) => {
  const { walletAddress, networkId } = useContext(ContractContext);

  return useQuery({
    queryKey: ['stakingV2', 'useFeesBurnedInPeriod', networkId, walletAddress],
    queryFn: async () => {
      if (!walletAddress) throw Error('Query should not be enabled');

      const optimismProvider = new providers.InfuraProvider(
        NetworkIdByName['mainnet-ovm'],
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );
      const mainnetProvider = new providers.InfuraProvider(
        NetworkIdByName.mainnet,
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );
      const [FeePoolOptimism, FeePoolMainnet, DebtShareOptimism, DebtShareMainnet] =
        await Promise.all([
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
          getSynthetixDebtShare({
            provider: optimismProvider,
            networkId: NetworkIdByName['mainnet-ovm'],
            signer: null,
          }),
          getSynthetixDebtShare({
            provider: mainnetProvider,
            networkId: NetworkIdByName.mainnet,
            signer: null,
          }),
        ]);

      const [prevFeePeriodOptimism, prevFeePeriodMainnet] = await Promise.all([
        FeePoolOptimism.recentFeePeriods(period),
        FeePoolMainnet.recentFeePeriods(period),
      ]);

      const periodIdCurrentNetwork =
        networkId === NetworkIdByName['mainnet-ovm']
          ? prevFeePeriodOptimism.feePeriodId
          : prevFeePeriodMainnet.feePeriodId;
      const DebtShareCurrentNetwork =
        networkId === NetworkIdByName['mainnet-ovm'] ? DebtShareOptimism : DebtShareMainnet;
      const [
        userDebtShareSupplyCurrentNetwork,
        totalDebtShareSupplyOptimism,
        totalDebtShareSupplyMainnet,
      ] = await Promise.all([
        DebtShareCurrentNetwork.balanceOfOnPeriod(walletAddress, periodIdCurrentNetwork),
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

    enabled: Boolean(walletAddress),
    staleTime: 1000,
  });
};
