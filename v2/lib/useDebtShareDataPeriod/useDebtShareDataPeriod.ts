import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { providers } from 'ethers';
import { ContractContext } from '@snx-v2/ContractContext';
import { getFeePool, getSynthetixDebtShare } from '@snx-v2/useSynthetixContracts';
import { NetworkIdByName } from '@synthetixio/contracts-interface';
import { wei } from '@synthetixio/wei';

export const useDebtShareDataPeriod = (period = 1 /* Defaults to previous period*/) => {
  const { walletAddress, networkId } = useContext(ContractContext);

  return useQuery({
    queryKey: ['stakingV2', 'useDebtShareDataPeriod', networkId, walletAddress],
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
      const totalDebtShareSupply = wei(totalDebtShareSupplyMainnet).add(
        wei(totalDebtShareSupplyOptimism)
      );
      const totalDebtShareSupplyCurrentNetwork =
        networkId === NetworkIdByName['mainnet-ovm']
          ? totalDebtShareSupplyOptimism
          : totalDebtShareSupplyMainnet;
      const userDebtShareSupply = wei(userDebtShareSupplyCurrentNetwork);
      const userDebtSharePercentage = userDebtShareSupply.div(totalDebtShareSupply);
      const userDebtSharePercentageCurrentNetwork = userDebtShareSupply.div(
        totalDebtShareSupplyCurrentNetwork
      );
      return {
        userDebtSharePercentageCurrentNetwork, // SNX rewards care about the debt percentage of the current network
        userDebtSharePercentage, // Burnt debt care about the user debt share percentage of the total debtshare supply (optimism and mainnet)
      };
    },

    enabled: Boolean(walletAddress),
    staleTime: 1000,
  });
};
