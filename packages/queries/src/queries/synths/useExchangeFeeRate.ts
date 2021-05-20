import { useQuery, UseQueryOptions } from 'react-query';
import { ethers } from 'ethers';

import Wei, { wei } from '@synthetixio/wei';

import { CurrencyKey } from '../../currency';

import { QueryContext } from '../../context';

const useExchangeFeeRate = (
	ctx: QueryContext,
	quoteCurrencyKey: CurrencyKey | null,
	baseCurrencyKey: CurrencyKey | null,
	options?: UseQueryOptions<Wei>
) => {
	return useQuery<Wei>(
		['synths', 'exchangeFeeRate', ctx.networkId, quoteCurrencyKey, baseCurrencyKey],
		async () => {
			const feeRateForExchange = (await ctx.snxjs.contracts.Exchanger.feeRateForExchange(
				ethers.utils.formatBytes32String(quoteCurrencyKey!),
				ethers.utils.formatBytes32String(baseCurrencyKey!)
			)) as ethers.BigNumber;

			return wei(feeRateForExchange);
		},
		{
			enabled: ctx.snxjs && quoteCurrencyKey != null && baseCurrencyKey != null,
			...options,
		}
	);
};

export default useExchangeFeeRate;
