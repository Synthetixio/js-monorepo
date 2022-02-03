import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from 'src/context';
import Wei, { wei } from '@synthetixio/wei';
import { ethers } from 'ethers';
import { useGetSNXHolders } from '../../../generated/mainSubgraphQueries';

type LockedSnx = {
	lockedSupply: Wei;
	lockedValue: Wei;
};
const useLockedSnxQuery = (ctx: QueryContext, options?: UseQueryOptions<LockedSnx>) => {
	const snxHoldersQuery = useGetSNXHolders(
		ctx.subgraphEndpoints.subgraph,
		{
			first: 1000,
			orderBy: 'collateral',
			orderDirection: 'desc',
			where: { initialDebtOwnership_not: 0 },
		},
		{
			initialDebtOwnership: true,
			collateral: true,
		}
	);

	const lockedSupply =
		snxHoldersQuery.data?.reduce((acc, val) => acc.add(val.collateral || wei(0)), wei(0)) || wei(0);

	return useQuery<LockedSnx>(
		['staking', 'snxLockedValue', ctx.networkId, lockedSupply.toString()],
		async () => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const snxPrice = await ctx.snxjs!.contracts.ExchangeRates.rateForCurrency(
				ethers.utils.formatBytes32String('SNX')
			);

			return { lockedSupply, lockedValue: lockedSupply.mul(snxPrice) };
		},
		{
			enabled: ctx.snxjs != null,
			...options,
		}
	);
};
export default useLockedSnxQuery;
