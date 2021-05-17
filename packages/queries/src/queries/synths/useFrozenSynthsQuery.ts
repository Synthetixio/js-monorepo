import { useQuery, UseQueryOptions } from 'react-query';
import compact from 'lodash/compact';
import { ethers } from 'ethers';

import { CurrencyKey } from '../../currency';
import { QueryContext } from '../../context';

export type FrozenSynths = Set<CurrencyKey>;

const useFrozenSynthsQuery = (ctx: QueryContext, options?: UseQueryOptions<FrozenSynths>) => {
	return useQuery<FrozenSynths>(
		['synths', 'frozenSynths', ctx.network],
		async () => {
			const frozenSynths = await ctx.snxjs.contracts.SynthUtil!.frozenSynths();

			return new Set<CurrencyKey>([
				...compact(frozenSynths.map(ethers.utils.parseBytes32String)),
			] as CurrencyKey[]);
		},
		{
			...options,
		}
	);
};

export default useFrozenSynthsQuery;
