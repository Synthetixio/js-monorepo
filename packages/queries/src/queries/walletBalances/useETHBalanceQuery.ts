import { useQuery, UseQueryOptions } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';

import { QueryContext } from '../../context';

const useETHBalanceQuery = (ctx: QueryContext, walletAddress: string | null, options?: UseQueryOptions<Wei>) => {
	return useQuery<Wei>(
		['walletBalances', 'eth', ctx.network, walletAddress],
		async () => {
			const balance = await ctx.provider.getBalance(walletAddress!);

			return wei(balance);
		},
		{
			enabled: !!walletAddress,
			...options,
		}
	);
};

export default useETHBalanceQuery;
