import { useQuery, UseQueryOptions } from 'react-query';
import compact from 'lodash/compact';
import { ethers } from 'ethers';

import { CurrencyKey } from '@synthetixio/contracts-interface';
import { QueryContext } from '../../context';
import { FrozenSynths } from '../../types';

const useFrozenSynthsQuery = (ctx: QueryContext, options?: UseQueryOptions<FrozenSynths>) => {
	return useQuery<FrozenSynths>(
		['synths', 'frozenSynths', ctx.networkId],
		async () => {
			const frozenSynths = await ctx.snxjs!.contracts.SynthUtil!.frozenSynths();

			return new Set<CurrencyKey>([
				...compact(frozenSynths.map(ethers.utils.parseBytes32String)),
			] as CurrencyKey[]);
		},
		{
			enabled: !!ctx.snxjs,
			...options,
		}
	);
};

export default useFrozenSynthsQuery;
