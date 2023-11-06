import { useQuery } from '@tanstack/react-query';
import { getFeePool } from '@snx-v2/useSynthetixContracts';
import { NetworkIdByName } from '@synthetixio/contracts-interface';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';

export const useFeePeriodMultiNetwork = (period = 1 /* Defaults to previous period*/) => {
  const { globalProviders, usingInfura, toggleRpc } = useGlobalProvidersWithFallback();
  return useQuery({
    queryKey: ['stakingV2', 'useFeePeriodMultiNetwork', usingInfura],
    queryFn: async () => {
      const [FeePoolOptimism, FeePoolMainnet] = await Promise.all([
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
      ]);

      const [feePeriodOptimism, feePeriodMainnet] = await Promise.all([
        FeePoolOptimism.recentFeePeriods(period),
        FeePoolMainnet.recentFeePeriods(period),
      ]);
      return { feePeriodOptimism: feePeriodOptimism, feePeriodMainnet };
    },
    onError: () => (usingInfura ? toggleRpc() : null),
    enabled: true,
    staleTime: 10000,
  });
};
