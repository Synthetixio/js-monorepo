import { useQuery, UseQueryOptions } from 'react-query';
import Wei from '@synthetixio/wei';
import { wei } from '@synthetixio/wei/build/node/wei';
import { QueryContext } from '../../context';
import { getDebtStates, getDebtSnapshots } from '../../../generated/mainSubgraphFunctions';
import { times, findIndex } from 'lodash';

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
			const debtStates = await getDebtStates(
				ctx.subgraphEndpoints.main,
				{ first: 100000, orderBy: 'timestamp', orderDirection: 'asc' },
				{ timestamp: true, debtRatio: true, totalIssuedSynths: true }
			);
			const debtSnapshots = await getDebtSnapshots(
				ctx.subgraphEndpoints.main,
				{
					first: 100000,
					orderBy: 'timestamp',
					orderDirection: 'asc',
					where: { account: walletAddress },
				},
				{ timestamp: true, account: true, debtBalanceOf: true }
			);
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

			return timeseries
				.filter((d) => d.timestamp > 0)
				.sort(function (a, b) {
					return a.timestamp - b.timestamp;
				});
		},
		{
			enabled: ctx.networkId != null && walletAddress != null,
			...options,
		}
	);
};

export default useGetDebtTimeseries;
