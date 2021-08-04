import { useQuery, UseQueryOptions } from 'react-query';
import { CurrencyKey } from '@synthetixio/contracts-interface';
import { wei } from '@synthetixio/wei';

import { QueryContext } from '../../context';
import { SettlementOwingData } from '../../types';

export const useSettlementOwing = (
	ctx: QueryContext,
	currencyKey: CurrencyKey,
	walletAddress: string,
	options?: UseQueryOptions<SettlementOwingData>
) => {
	return useQuery<SettlementOwingData>(
		['trades', 'settlementOwing', walletAddress, currencyKey],
		async () => {
			const [rebate, reclaim, numEntries] = await ctx.snxjs!.contracts.Exchanger.settlementOwing(
				walletAddress,
				ctx.snxjs!.utils.formatBytes32String(currencyKey)
			);
			return { rebate: wei(rebate), reclaim: wei(reclaim), numEntries: wei(numEntries) };
		},
		{
			enabled: ctx.snxData != null && !!walletAddress,
			...options,
		}
	);
};

export default useSettlementOwing;
