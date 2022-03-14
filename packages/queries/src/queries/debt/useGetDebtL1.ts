import { useQuery, UseQueryOptions } from 'react-query';
import Wei from '@synthetixio/wei';
import { QueryContext } from '../../context';
import { providers, utils } from 'ethers';
import { useGetShorts, useGetSynths, useGetWrappers } from 'generated/mainSubgraphQueries';
import { DEFAULT_SUBGRAPH_ENDPOINTS } from '../../constants';

type DebtOnL1 = {
	debt: Wei;
};

const useGetDebtL1 = (
	ctx: QueryContext,
	L1Provider: providers.BaseProvider,
	options?: UseQueryOptions<DebtOnL1>
) => {
	const wrappersQuery = useGetWrappers(
		DEFAULT_SUBGRAPH_ENDPOINTS[1].subgraph,
		{},
		{
			currencyKey: true,
			amount: true,
		},
		{
			queryKey: ['L1', 'wrappers'],
		}
	);
	const synths = useGetSynths(
		DEFAULT_SUBGRAPH_ENDPOINTS[1].subgraph,
		{},
		{
			totalSupply: true,
			symbol: true,
		},
		{
			queryKey: ['L1', 'synths'],
		}
	);
	const shorts = useGetShorts(
		DEFAULT_SUBGRAPH_ENDPOINTS[1].subgraph,
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
	return useQuery<DebtOnL1>(
		['debt', 'data', 'L1', ctx.networkId],
		async () => {
			return;
		},
		{
			enabled: ctx.networkId != null && L1Provider,
			...options,
		}
	);
};

export default useGetDebtL1;
