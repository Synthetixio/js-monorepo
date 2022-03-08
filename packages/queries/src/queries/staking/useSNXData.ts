import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from 'src/context';
import Wei, { wei } from '@synthetixio/wei';
import { ethers, providers } from 'ethers';
import { useGetSNXHolders } from '../../../generated/mainSubgraphQueries';
import synthetix, { NetworkIdByName, NetworkNameById } from '@synthetixio/contracts-interface';
import { DEFAULT_SUBGRAPH_ENDPOINTS } from '../../constants';

interface SNXData {
	lockedSupply: Wei;
	lockedValue: Wei;
	totalSNXSupply: Wei;
}
const useSNXData = (
	ctx: QueryContext,
	L1Provider?: providers.BaseProvider,
	options?: UseQueryOptions<SNXData>
) => {
	const snxHoldersQueryL1 = useGetSNXHolders(
		DEFAULT_SUBGRAPH_ENDPOINTS[1].subgraph,
		{
			first: 8000,
			orderBy: 'collateral',
			orderDirection: 'desc',
			where: { initialDebtOwnership_not: '0' },
		},
		{
			collateral: true,
			transferable: true,
			initialDebtOwnership: true,
		},
		{
			queryKey: ['L1', 'SNXHoldersL1'],
		}
	);

	const snxHoldersQueryL2 = useGetSNXHolders(
		DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
		{
			first: 8000,
			orderBy: 'collateral',
			orderDirection: 'desc',
			where: { initialDebtOwnership_not: '0' },
		},
		{
			collateral: true,
			transferable: true,
			initialDebtOwnership: true,
		},
		{
			queryKey: ['L2', 'SNXHoldersL2'],
		}
	);

	const lockedSupplyL1 =
		snxHoldersQueryL1.data?.reduce(
			(acc, val) => acc.add(val.collateral?.sub(val.transferable || wei(0)) || wei(0)),
			wei(0)
		) || wei(0);

	const lockedSupplyL2 =
		snxHoldersQueryL2.data?.reduce(
			(acc, val) => acc.add(val.collateral?.sub(val.transferable || wei(0)) || wei(0)),
			wei(0)
		) || wei(0);

	const snxJSL1 = synthetix({
		network: NetworkNameById[1],
		networkId: NetworkIdByName['mainnet'],
		provider: L1Provider || ctx.provider!,
	});
	return useQuery<SNXData>(
		[
			'staking',
			'snxLockedValue',
			ctx.networkId,
			lockedSupplyL1.toString(),
			lockedSupplyL2.toString(),
		],
		async () => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const snxPrice = await ctx.snxjs!.contracts.ExchangeRates.rateForCurrency(
				ethers.utils.formatBytes32String('SNX')
			);

			const totalSNXSupply = wei(await snxJSL1.contracts.Synthetix.totalSupply());

			if (
				snxHoldersQueryL1.isSuccess &&
				snxHoldersQueryL1.data.length > 100 &&
				snxHoldersQueryL2.isSuccess &&
				snxHoldersQueryL2.data.length > 100
			) {
				const lockedSupply = lockedSupplyL1.add(lockedSupplyL2);
				return {
					totalSNXSupply,
					lockedSupply,
					lockedValue: lockedSupply.mul(snxPrice),
				};
			}
			return {
				totalSNXSupply: wei(0),
				lockedSupply: wei(0),
				lockedValue: wei(0),
			};
		},
		{
			enabled: ctx.snxjs != null,
			...options,
		}
	);
};
export default useSNXData;
