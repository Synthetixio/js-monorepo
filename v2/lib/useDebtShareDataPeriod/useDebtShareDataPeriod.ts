import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ContractContext } from '@snx-v2/ContractContext';
import { getFeePool, getSynthetixDebtShare } from '@snx-v2/useSynthetixContracts';
import { NetworkIdByName } from '@synthetixio/contracts-interface';
import { wei } from '@synthetixio/wei';
import { useGlobalProvidersWithFallback } from '@synthetixio/useGlobalProvidersWithFallback';

export const useDebtShareDataPeriod = (period = 1 /* Defaults to previous period*/) => {
  const { walletAddress, networkId } = useContext(ContractContext);
  const { globalProviders, usingInfura, toggleRpc } = useGlobalProvidersWithFallback();
  return useQuery({
    queryKey: ['stakingV2', 'useDebtShareDataPeriod', networkId, walletAddress, usingInfura],
    queryFn: async () => {
      if (!walletAddress) throw Error('Query should not be enabled');

      const [FeePoolOptimism, FeePoolMainnet, DebtShareOptimism, DebtShareMainnet] =
        await Promise.all([
          getFeePool({
            provider: globalProviders.optimism,
            networkId: NetworkIdByName['mainnet-ovm'],
            signer: null,
          }),
          getFeePool({
            provider: globalProviders.mainnet,
            networkId: NetworkIdByName.mainnet,
            signer: null,
          }),
          getSynthetixDebtShare({
            provider: globalProviders.optimism,
            networkId: NetworkIdByName['mainnet-ovm'],
            signer: null,
          }),
          getSynthetixDebtShare({
            provider: globalProviders.mainnet,
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
    staleTime: 10000,
    onError: () => (usingInfura ? toggleRpc() : null),
  });
};
