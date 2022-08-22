import { useQuery, UseQueryOptions } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';
import { getDebtStates, getDebtSnapshots } from '../../subgraph/mainSubgraphFunctions';
import { times, findIndex, sortBy } from 'lodash';

type WalletDebtTimeseriesData = {
  timestamp: number;
  debtPercentage: number;
  debtAmount: Wei;
}[];

const useGetDebtTimeseries = (
  ctx: QueryContext,
  walletAddress: string,
  options?: UseQueryOptions<WalletDebtTimeseriesData>
) => {
  return useQuery<WalletDebtTimeseriesData>(
    ['debt', 'data', ctx.networkId, walletAddress],
    async () => {
      const debtStates = (
        await getDebtStates(
          ctx.subgraphEndpoints.subgraph,
          { first: 50000, orderBy: 'timestamp', orderDirection: 'desc' },
          { timestamp: true, debtRatio: true, totalIssuedSynths: true }
        )
      ).reverse();
      const debtSnapshots = (
        await getDebtSnapshots(
          ctx.subgraphEndpoints.subgraph,
          {
            first: 1000,
            orderBy: 'timestamp',
            orderDirection: 'desc',
            where: { account: walletAddress },
          },
          { timestamp: true, account: true, debtBalanceOf: true }
        )
      ).reverse();
      const timeseries: WalletDebtTimeseriesData = [];

      if (debtStates && debtSnapshots) {
        times(debtSnapshots.length, () => {
          let currentDebtSnapshotIndex = 0;
          let debtStateAsOfDebtSnapshotIndex = findIndex(
            debtStates,
            (ds) => ds.timestamp < debtSnapshots[currentDebtSnapshotIndex].timestamp
          );

          for (const debtState of debtStates.slice(debtStateAsOfDebtSnapshotIndex)) {
            if (
              currentDebtSnapshotIndex < debtSnapshots.length - 1 &&
              debtSnapshots[currentDebtSnapshotIndex + 1].timestamp < debtState.timestamp
            ) {
              currentDebtSnapshotIndex++;
              debtStateAsOfDebtSnapshotIndex = findIndex(
                debtStates,
                (ds) => ds.timestamp < debtSnapshots[currentDebtSnapshotIndex].timestamp
              );
            }

            const currentDebtSnapshot = debtSnapshots[currentDebtSnapshotIndex];
            currentDebtSnapshot.debtBalanceOf = currentDebtSnapshot.debtBalanceOf || wei(0);
            const debtStateAsOfDebtSnapshot = debtStates[debtStateAsOfDebtSnapshotIndex];

            timeseries.push({
              timestamp: debtState.timestamp.toNumber(),
              debtPercentage:
                ((currentDebtSnapshot.debtBalanceOf.toNumber() /
                  debtState.totalIssuedSynths.toNumber()) *
                  debtStateAsOfDebtSnapshot.debtRatio.toNumber()) /
                debtState.debtRatio.toNumber(),
              debtAmount: wei(
                (currentDebtSnapshot.debtBalanceOf.toNumber() *
                  debtStateAsOfDebtSnapshot.debtRatio.toNumber()) /
                  debtState.debtRatio.toNumber()
              ),
            });
          }
        });
      }

      return sortBy(
        timeseries.filter((d) => d.timestamp > 0),
        'timestamp'
      );
    },
    {
      enabled: ctx.networkId != null && walletAddress != null,
      ...options,
    }
  );
};

export default useGetDebtTimeseries;
