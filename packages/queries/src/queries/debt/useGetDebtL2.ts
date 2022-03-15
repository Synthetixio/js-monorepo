import { useQuery, UseQueryOptions } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';
import { providers, utils } from 'ethers';
import {
	useGetLoans,
	useGetShorts,
	useGetSynths,
	useGetWrappers,
} from 'generated/mainSubgraphQueries';
import { DEFAULT_SUBGRAPH_ENDPOINTS } from '../../constants';

type DebtOnL2 = {
	debt: Wei;
};

const useGetDebtL2 = (
	ctx: QueryContext,
	L2Provider: providers.BaseProvider,
	options?: UseQueryOptions<DebtOnL2>
) => {
	const wrappers = useGetWrappers(
		DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
		{
			where: {
				maxAmount_gt: 0,
			},
			first: 1000,
		},
		{
			currencyKey: true,
			amount: true,
			maxAmount: true,
		},
		{
			queryKey: ['L2', 'wrappers'],
		}
	);
	const synths = useGetSynths(
		DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
		{ first: 1000 },
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
		{
			where: { isOpen: true },
			first: 1000,
			orderBy: 'synthBorrowedAmount',
			orderDirection: 'desc',
		},
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

	const loans = useGetLoans(
		DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
		{ where: { isOpen: true }, first: 1000, orderDirection: 'desc', orderBy: 'amount' },
		{
			collateralMinted: true,
			amount: true,
			collateralAmount: true,
			currency: true,
		},
		{
			queryKey: ['L2', 'loans'],
		}
	);

	const wrapperData = wrappers.isSuccess && wrappers.data;
	const synthsData = synths.isSuccess && synths.data;
	const shortsData =
		shorts.isSuccess &&
		shorts.data
			.map((short) => {
				return {
					...short,
					synthBorrowed: utils.formatBytes32String(short.synthBorrowed),
					collateralLocked: utils.formatBytes32String(short.collateralLocked),
				};
			})
			.reduce((acc, short) => {
				acc[short.synthBorrowed] = acc[short.synthBorrowed].add(short.synthBorrowedAmount);
				return acc;
			}, {} as Record<string, Wei>);
	const loansData =
		loans.isSuccess &&
		loans.data.reduce((acc, loan) => {
			acc[loan.currency] = acc[loan.currency].add(loan.amount);
			return acc;
		}, {} as Record<string, Wei>);
	return useQuery<DebtOnL2>(
		['debt', 'data', 'L2', ctx.networkId],
		() => {
			const synthDataWithSkew =
				wrapperData &&
				synthsData &&
				synthsData.map((synth) => {
					for (const wrapper of wrapperData) {
						if (synth.symbol === wrapper.currencyKey) {
							return {
								...synth,
								hasNegativeSkew: wei(wrapper.amount).sub(synth.totalSupply).gt(0),
								totalSupply: synth.totalSupply.sub(wrapper.amount),
							};
						}
						return { ...synth, hasNegativeSkew: false };
					}
					return {
						...synth,
						hasNegativeSkew: false,
					};
				});

			const synthDataWithShorts =
				synthDataWithSkew &&
				synthDataWithSkew.length &&
				shortsData &&
				synthDataWithSkew.map((synth) => ({
					...synth,
					totalSupply: synth.totalSupply.sub(shortsData[synth.symbol] as Wei),
				}));

			const synthDataWithLoans =
				synthDataWithShorts &&
				synthDataWithShorts.length &&
				loansData &&
				synthDataWithShorts.map((synth) => ({
					...synth,
					totalSupply: synth.totalSupply?.sub(loansData[synth.symbol] as Wei),
				}));
			return { debt: wei(2) };
		},
		{
			enabled: ctx.networkId === 10 && !!L2Provider,
			...options,
		}
	);
};

export default useGetDebtL2;
