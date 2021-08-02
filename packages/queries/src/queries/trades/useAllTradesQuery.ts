import { useQuery, UseQueryOptions } from 'react-query';
import { SynthExchangeExpanded } from '@synthetixio/data/build/node/src/types';
import { QueryContext } from '../../context';

export const useAllTradesQuery = (
	ctx: QueryContext,
	maxBlock = Number.MAX_SAFE_INTEGER,
	max = 100,
	options?: UseQueryOptions<SynthExchangeExpanded[] | null>
) => {
	return useQuery<SynthExchangeExpanded[] | null>(
		['trades', 'allTrades', ctx.networkId],
		() =>
			ctx.snxData!.synthExchanges({
				maxBlock,
				max,
			}),
		{
			enabled: ctx.snxData != null,
			...options,
		}
	);
};

export default useAllTradesQuery;
