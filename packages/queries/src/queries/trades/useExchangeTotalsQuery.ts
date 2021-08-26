import { useQuery, UseQueryOptions } from 'react-query';
import { ExchangeTotals } from '@synthetixio/data';
import { QueryContext } from '../../context';

export const useExchangeTotalsQuery = (
	ctx: QueryContext,
	args: any,
	options?: UseQueryOptions<ExchangeTotals[] | null>
) => {
	return useQuery<ExchangeTotals[] | null>(
		['trading', 'exchangeTotals', args],
		() => ctx.snxData!.exchangeTotals(args),
		{
			enabled: ctx.snxData != null,
			...options,
		}
	);
};

export default useExchangeTotalsQuery;
