import { useQuery, UseQueryOptions } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';

type LiquidationData = {
	liquidationRatio: Wei;
	liquidationDelay: Wei;
	liquidationDeadlineForAccount: Wei;
	liquidationPenalty: Wei;
	selfLiquidationPenalty: Wei;
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
			const [
				liquidationRatio,
				liquidationDelay,
				liquidationDeadlineForAccount,
				liquidationPenalty,
				selfLiquidationPenalty,
			] = await Promise.all([
				Liquidator.liquidationRatio(),
				Liquidator.liquidationDelay(),
				Liquidator.getLiquidationDeadlineForAccount(walletAddress),
				Liquidator.liquidationPenalty(),
				Liquidator.selfLiquidationPenalty(),
			]).then((results) => results.map((x) => wei(x)));
			return {
				liquidationRatio,
				liquidationDelay,
				liquidationDeadlineForAccount,
				liquidationPenalty,
				selfLiquidationPenalty,
			};
		},
		{
			enabled: ctx.snxjs != null && !!walletAddress,
			...options,
		}
	);
};

export default useGetLiquidationDataQuery;
