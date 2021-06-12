import Wei, { wei } from '@synthetixio/wei';
import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';

const useTotalIssuedSynthsExcludingEtherQuery = (
	ctx: QueryContext,
	currencyKey: string,
	block?: number | null,
	options?: UseQueryOptions<Wei>
) => {
	return useQuery<Wei>(
		['synth', 'totalIssuedExcludingEther', ctx.networkId, currencyKey],
		async () => {
			const totalIssuedSynthsExclEther =
				await ctx.snxjs!.contracts.Synthetix.totalIssuedSynthsExcludeEtherCollateral(
					ctx.snxjs!.utils.formatBytes32String(currencyKey),
					{
						blockTag: block ? block : 'latest',
					}
				);

			return wei(totalIssuedSynthsExclEther);
		},
		{
			enabled: !!ctx.snxjs,
			...options,
		}
	);
};

export default useTotalIssuedSynthsExcludingEtherQuery;
