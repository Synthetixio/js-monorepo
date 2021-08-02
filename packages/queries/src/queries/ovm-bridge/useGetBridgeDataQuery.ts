import { useEffect, useState } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import providers from '@ethersproject/providers';
import orderBy from 'lodash/orderBy';
import {
	optimismMessengerWatcher,
	L1_TO_L2_NETWORK_MAPPER,
	OptimismWatcher,
	OPTIMISM_NETWORKS,
} from '@synthetixio/optimism-networks';
import { getOptimismProvider } from '@synthetixio/providers';
import { QueryContext } from '../../context';
import { DepositHistory, DepositRecord } from '../../types';
import { wei } from '@synthetixio/wei';

const NUM_BLOCKS_TO_FETCH = 1000000;

// NOTE: query context for this query must always be on the L1 side (even if withdrawing)
const useGetDepositsDataQuery = (
	ctx: QueryContext,
	walletAddress: string | null,
	options?: UseQueryOptions<DepositHistory>
) => {
	const [watcher, setWatcher] = useState<OptimismWatcher | null>(null);

	useEffect(() => {
		if (ctx.networkId && OPTIMISM_NETWORKS[ctx.networkId] != null && ctx.provider) {
			setWatcher(
				optimismMessengerWatcher({
					// @ts-ignore
					layerOneProvider: ctx.provider as providers.Web3Provider,
					// @ts-ignore
					layerTwoProvider: getOptimismProvider({
						layerOneNetworkId: ctx.networkId,
					}) as providers.Web3Provider,
					layerTwoNetworkId: L1_TO_L2_NETWORK_MAPPER[ctx.networkId],
				})
			);
		}
	}, [ctx.networkId, ctx.provider]);

	return useQuery<DepositHistory>(
		['ovm-bridge', 'depositData', ctx.networkId, walletAddress],
		async () => {
			const {
				contracts: { SynthetixBridgeToOptimism, SynthetixBridgeToBase },
			} = ctx.snxjs!;

			const blockNumber = await ctx.provider!.getBlockNumber();
			const startBlock = Math.max(blockNumber - NUM_BLOCKS_TO_FETCH, 0);
			const depositFilters = SynthetixBridgeToOptimism.filters.DepositInitiated(walletAddress);
			const withdrawalFilters = SynthetixBridgeToBase.filters.DepositInitiated(walletAddress);

			const depositLogs = await ctx.provider!.getLogs({ ...depositFilters, fromBlock: startBlock });
			const withdrawalLogs = await ctx.provider!.getLogs({
				...withdrawalFilters,
				fromBlock: startBlock,
			});
			const events: DepositHistory = await Promise.all([
				...depositLogs.map(async (l) => {
					const block = await ctx.provider!.getBlock(l.blockNumber);
					const { args } = SynthetixBridgeToOptimism.interface.parseLog(l);
					const timestamp = Number(block.timestamp * 1000);
					return {
						timestamp,
						amount: wei(args._amount),
						transactionHash: l.transactionHash,
						type: 'deposit',
						status: 'pending',
					} as DepositRecord;
				}),
				...withdrawalLogs.map(async (l) => {
					const block = await ctx.provider!.getBlock(l.blockNumber);
					const { args } = SynthetixBridgeToBase.interface.parseLog(l);
					const timestamp = Number(block.timestamp * 1000);
					const msgHashes = await watcher!.getMessageHashesFromL1Tx(l.transactionHash);
					const receipt = await watcher!.getL2TransactionReceipt(msgHashes[0], false);
					const readyToRelay =
						Date.now() - timestamp > OPTIMISM_NETWORKS[ctx.networkId!].fraudProofWindow;
					return {
						timestamp,
						amount: wei(args._amount),
						transactionHash: l.transactionHash,
						type: 'withdrawal',
						status: !!receipt
							? ('confirmed' as const)
							: readyToRelay
							? ('relay' as const)
							: ('pending' as const),
					} as DepositRecord;
				}),
			]);

			return orderBy(events, ['timestamp'], ['desc']);
		},
		{
			enabled: !!ctx.provider && !!watcher,
			...options,
		}
	);
};

export default useGetDepositsDataQuery;
