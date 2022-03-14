import { useQuery, UseQueryOptions } from 'react-query';
import Wei from '@synthetixio/wei';

import { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';
import { providers, utils } from 'ethers';
import { useGetShorts, useGetSynths, useGetWrappers } from 'generated/mainSubgraphQueries';
import { DEFAULT_SUBGRAPH_ENDPOINTS } from '../../constants';

type DebtOnL2 = {
	debt: Wei;
};

const useGetDebtL2 = (
	ctx: QueryContext,
	L2Provider: providers.BaseProvider,
	options?: UseQueryOptions<DebtOnL2>
) => {
	const wrappersQuery = useGetWrappers(
		DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
		{
			where: {
				maxAmount_gt: 0,
			},
		},
		{
			currencyKey: true,
			amount: true,
		},
		{
			queryKey: ['L2', 'wrappers'],
		}
	);
	const synths = useGetSynths(
		DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
		{},
		{
			totalSupply: true,
			symbol: true,
		},

		{
			queryKey: ['L2', 'synths'],
		}
	);
	const shorts = useGetShorts(
		DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
		{ where: { isOpen: true } },
		{
			synthBorrowed: true,
			synthBorrowedAmount: true,
			collateralLocked: true,
			collateralLockedAmount: true,
		},
		{
			queryKey: ['L2', 'shorts'],
		}
	);

	// TODO @MF add loans
	const wrapperData = wrappersQuery.isSuccess && wrappersQuery.data;
	const synthsData = synths.isSuccess && synths.data;
	const shortsData =
		shorts.isSuccess &&
		shorts.data.map((short) => {
			return {
				...short,
				synthBorrowed: utils.formatBytes32String(short.synthBorrowed),
				collateralLocked: utils.formatBytes32String(short.collateralLocked),
			};
		});
	return useQuery<DebtOnL2>(
		['debt', 'data', 'L2', ctx.networkId],
		async () => {
			return;
		},
		{
			enabled: ctx.networkId != null && L2Provider,
			...options,
		}
	);
};

export default useGetDebtL2;
