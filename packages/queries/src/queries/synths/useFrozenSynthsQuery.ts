import { useQuery, UseQueryOptions } from 'react-query';
import compact from 'lodash/compact';
import { ethers } from 'ethers';

import QUERY_KEYS from '../../queryKeys';
import { CurrencyKey } from '../../currency';
import { QueryContext } from '../../context';

export type FrozenSynths = Set<CurrencyKey>;

const useFrozenSynthsQuery = (ctx: QueryContext, options?: UseQueryOptions<FrozenSynths>) => {
	return useQuery<FrozenSynths>(
		QUERY_KEYS.Synths.FrozenSynths,
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
