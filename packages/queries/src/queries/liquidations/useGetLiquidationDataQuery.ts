import { useQuery, UseQueryOptions } from 'react-query';
import Wei from '@synthetixio/wei';
import { QueryContext } from '../../context';

type LiquidationData = {
	liquidationRatio: Wei;
	liquidationDelay: Wei;
	liquidationDeadlineForAccount: Wei;
};

const useGetLiquidationDataQuery = (
	ctx: QueryContext,
	walletAddress: string | null,
	options?: UseQueryOptions<LiquidationData>
) => {
	return useQuery<LiquidationData>(
		['liquidations', 'info', ctx.networkId, walletAddress],
		async () => {
			const {
				contracts: { Liquidator },
			} = ctx.snxjs!;
			const [liquidationRatio, liquidationDelay, liquidationDeadlineForAccount] = await Promise.all(
				[
					Liquidator.liquidationRatio(),
					Liquidator.liquidationDelay(),
					Liquidator.getLiquidationDeadlineForAccount(walletAddress),
				]
			);
			return {
				liquidationRatio,
				liquidationDelay,
				liquidationDeadlineForAccount,
			};
		},
		{
			enabled: ctx.snxjs != null && !!walletAddress,
			...options,
		}
	);
};

export default useGetLiquidationDataQuery;
