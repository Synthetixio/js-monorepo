import { useQuery, UseQueryOptions } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';

export const useTxReclaimFeeQuery = (
	ctx: QueryContext,
	timestamp: number,
	walletAddress: string | null,
	options?: UseQueryOptions<Wei>
) => {
	return useQuery<Wei>(
		['trades', 'txReclaimFee', walletAddress, ctx.networkId, timestamp],
		async () => {
			const exchangeEntrySettleds = await ctx.snxData!.exchangeEntrySettleds({
				from: walletAddress ?? undefined,
				minExchangeTimestamp: timestamp,
				maxExchangeTimestamp: timestamp,
			});
			const exchangeEntrySettled = exchangeEntrySettleds?.[0];
			if (!exchangeEntrySettled) return wei(0);
			return wei(exchangeEntrySettled.rebate.sub(exchangeEntrySettled.reclaim));
		},
		{
			enabled: ctx.snxData != null && !!walletAddress,
			...options,
		}
	);
};

export default useTxReclaimFeeQuery;
