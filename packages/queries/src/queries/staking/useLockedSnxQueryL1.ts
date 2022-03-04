import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from 'src/context';
import Wei, { wei } from '@synthetixio/wei';
import { ethers, providers } from 'ethers';
import { useGetSNXHolders } from '../../../generated/mainSubgraphQueries';
import synthetix, { NetworkIdByName, NetworkNameById } from '@synthetixio/contracts-interface';
import { DEFAULT_SUBGRAPH_ENDPOINTS } from '../../constants';

interface LockedSnx {
	lockedSupply: Wei;
	lockedValue: Wei;
	totalSNXSupply: Wei;
	totalNotTransferableSNX: Wei;
}
const useLockedSnxQueryL1 = (
	ctx: QueryContext,
	L1Provider?: providers.BaseProvider,
	options?: UseQueryOptions<LockedSnx>
) => {
	const snxHoldersQueryL1 = useGetSNXHolders(
		DEFAULT_SUBGRAPH_ENDPOINTS[1].subgraph,
		{
			first: 1000,
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
			first: 1000,
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
	return useQuery<LockedSnx>(
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
			const rewardEscrowV2AddressL1 = snxJSL1.contracts.RewardEscrowV2.address;
			const escrowBridgeToL2Address = snxJSL1.contracts.SynthetixBridgeEscrow.address;

			const totalSNXSupply = wei(await snxJSL1.contracts.Synthetix.totalSupply());
			const escrowedSNXL1 = wei(
				await snxJSL1.contracts.Synthetix.balanceOf(rewardEscrowV2AddressL1)
			);
			const escrowedSNXInBridge = wei(
				await snxJSL1.contracts.Synthetix.balanceOf(escrowBridgeToL2Address)
			);
			const totalNotTransferableSNX = totalSNXSupply.add(escrowedSNXL1).sub(escrowedSNXInBridge);

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
					totalNotTransferableSNX,
				};
			}
			return {
				totalSNXSupply: wei(0),
				lockedSupply: wei(0),
				lockedValue: wei(0),
				totalNotTransferableSNX: wei(0),
			};
		},
		{
			enabled: ctx.snxjs != null,
			...options,
		}
	);
};
export default useLockedSnxQueryL1;
