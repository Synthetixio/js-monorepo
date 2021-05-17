import { useQuery, UseQueryOptions } from 'react-query';

import Wei, { wei } from '@synthetixio/wei';

import { CurrencyKey, synthToContractName } from '../../currency';
import { QueryContext } from '../../context';

const useSynthMarketCapQuery = (
	ctx: QueryContext,
	currencyKey: CurrencyKey | null,
	options?: UseQueryOptions<Wei>
) => {
	return useQuery<Wei>(
		['rates', 'marketCap', ctx.network, currencyKey],
		async () => {
			return wei(await ctx.snxjs.contracts[synthToContractName(currencyKey!)].totalSupply());
		},
		{
			enabled: currencyKey != null,
			...options,
		}
	);
};

export default useSynthMarketCapQuery;
