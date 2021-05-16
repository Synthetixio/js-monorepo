import { useQuery, UseQueryOptions } from 'react-query';
import { ethers } from 'ethers';

import Wei, { wei } from '@synthetixio/wei';

import QUERY_KEYS from '../../queryKeys';
import { CurrencyKey } from '../../currency';

import synthetix from '../../synthetix';
import { QueryContext } from '../../context';

const useExchangeFeeRate = (
	ctx: QueryContext,
	quoteCurrencyKey: CurrencyKey | null,
	baseCurrencyKey: CurrencyKey | null,
	options?: UseQueryOptions<Wei>
) => {
	return useQuery<Wei>(
		QUERY_KEYS.Synths.ExchangeFeeRate(quoteCurrencyKey ?? '', baseCurrencyKey ?? ''),
		async () => {
			const feeRateForExchange = (await ctx.snxjs.contracts.Exchanger.feeRateForExchange(
				ethers.utils.formatBytes32String(quoteCurrencyKey!),
				ethers.utils.formatBytes32String(baseCurrencyKey!)
			)) as ethers.BigNumber;

			return wei(feeRateForExchange);
		},
		{
			enabled: quoteCurrencyKey != null && baseCurrencyKey != null,
			...options,
		}
	);
};

export default useExchangeFeeRate;
