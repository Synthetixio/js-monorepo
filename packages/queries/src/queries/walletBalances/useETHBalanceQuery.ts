import { useQuery, UseQueryOptions } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';

import QUERY_KEYS from '../../queryKeys';
import { QueryContext } from '../../context';

const useETHBalanceQuery = (ctx: QueryContext, walletAddress: string | null, options?: UseQueryOptions<Wei>) => {
	return useQuery<Wei>(
		QUERY_KEYS.WalletBalances.ETH(walletAddress ?? '', ctx.network),
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
