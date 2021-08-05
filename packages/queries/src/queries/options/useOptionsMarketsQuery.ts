import { useQuery, UseQueryOptions } from 'react-query';
import { OptionsMarket } from '@synthetixio/data/build/node/src/types';

import { QueryContext } from '../../context';

const useOptionsMarketsQuery = (
	ctx: QueryContext,
	args: any,
	options?: UseQueryOptions<OptionsMarket[]>
) => {
	return useQuery<OptionsMarket[]>(
		['markets', 'optionsMarkets', args],
		async () => {
			const unformattedMarkets = (await ctx.snxData!.binaryOptionsMarkets(args)) ?? [];
			const sortedMarkets = unformattedMarkets.sort((a: OptionsMarket, b: OptionsMarket) => {
				return parseFloat(b.poolSize) - parseFloat(a.poolSize);
			});
			return sortedMarkets;
		},
		{
			enabled: !!ctx.snxjs && !!args,
			...options,
		}
	);
};

export default useOptionsMarketsQuery;
