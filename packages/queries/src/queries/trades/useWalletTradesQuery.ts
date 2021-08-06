import { useQuery, UseQueryOptions } from 'react-query';
import { SynthExchangeExpanded } from '@synthetixio/data/build/node/src/types';
import { QueryContext } from '../../context';

export const useWalletTradesQuery = (
	ctx: QueryContext,
	walletAddress: string | null,
	max = 100,
	options?: UseQueryOptions<SynthExchangeExpanded[] | null>
) => {
	return useQuery<SynthExchangeExpanded[] | null>(
		['trades', 'walletTrades', ctx.networkId, walletAddress],
		() =>
			ctx.snxData!.synthExchanges({
				fromAddress: walletAddress!,
				max,
			}),
		{
			enabled: ctx.snxData != null && !!walletAddress,
			...options,
		}
	);
};

export default useWalletTradesQuery;
