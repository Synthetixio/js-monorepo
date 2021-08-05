import { useQuery, UseQueryOptions } from 'react-query';
import { OptionsTransaction } from '@synthetixio/data/build/node/src/types';

import { QueryContext } from '../../context';

const useOptionsTransactionsQuery = (
	ctx: QueryContext,
	args: any,
	options?: UseQueryOptions<OptionsTransaction[]>
) => {
	return useQuery<OptionsTransaction[]>(
		['markets', 'optionsTransactions', args],
		async () => {
			const unformattedOptionTransactions =
				(await ctx.snxData!.binaryOptionsTransactions(args)) ?? [];

			const yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			return unformattedOptionTransactions.filter((optionTx: { timestamp: number }) => {
				return new Date(optionTx.timestamp) > yesterday;
			});
		},
		{
			enabled: !!ctx.snxjs && !!args,
			...options,
		}
	);
};

export default useOptionsTransactionsQuery;
