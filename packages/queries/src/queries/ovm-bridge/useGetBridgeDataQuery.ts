import { useEffect, useState } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import orderBy from 'lodash/orderBy';
import {
	optimismMessengerWatcher,
	L1_TO_L2_NETWORK_MAPPER,
	OptimismWatcher,
	OPTIMISM_NETWORKS,
} from '@synthetixio/optimism-networks';
import loadProvider, { getOptimismProvider } from '@synthetixio/providers';
import { QueryContext } from '../../context';
import { DepositHistory, DepositRecord } from '../../types';
import { wei } from '@synthetixio/wei';

const NUM_BLOCKS_TO_FETCH = 1000000;

// NOTE: query context for this query must always be on the L1 side (even if withdrawing)
const useGetBridgeDataQuery = (
	ctx: QueryContext,
	infuraId: string,
	walletAddress: string | null,
	options?: UseQueryOptions<DepositHistory>
) => {
	const [watcher, setWatcher] = useState<OptimismWatcher | null>(null);

	useEffect(() => {
		if (ctx.networkId && ctx.provider) {
			const isFromL2 = !!OPTIMISM_NETWORKS[ctx.networkId!];

			const l1provider = isFromL2 ? loadProvider({ infuraId }) : ctx.provider;
			const l2provider = isFromL2
				? ctx.provider
				: getOptimismProvider({ networkId: ctx.networkId! });

			const watcher = optimismMessengerWatcher({
				// @ts-ignore
				layerOneProvider: l1provider,
				// @ts-ignore
				layerTwoProvider: l2provider,
				layerTwoNetworkId: isFromL2 ? ctx.networkId : L1_TO_L2_NETWORK_MAPPER[ctx.networkId],
			});

			setWatcher(watcher);
		}
	}, [ctx.networkId, ctx.provider]);

	return useQuery<DepositHistory>(
		['ovm-bridge', 'depositData', ctx.networkId, walletAddress],
		async () => {
			const isFromL2 = !!OPTIMISM_NETWORKS[ctx.networkId!];

			const l1provider = isFromL2 ? loadProvider({ infuraId }) : ctx.provider;

			const {
				contracts: { SynthetixBridgeToOptimism, SynthetixBridgeToBase },
			} = ctx.snxjs!;

			const blockNumber = await l1provider!.getBlockNumber();
			const startBlock = Math.max(blockNumber - NUM_BLOCKS_TO_FETCH, 0);
			const filters = SynthetixBridgeToOptimism
				? SynthetixBridgeToOptimism.filters.DepositInitiated(walletAddress)
				: SynthetixBridgeToBase.filters.DepositInitiated(walletAddress);

			const logs = await ctx.provider!.getLogs({ ...filters, fromBlock: startBlock });

			const events: DepositHistory = await Promise.all([
				...logs.map(async (l) => {
					const block = await ctx.provider!.getBlock(l.blockNumber);
					const { args } = (
						isFromL2 ? SynthetixBridgeToBase : SynthetixBridgeToOptimism
					).interface.parseLog(l);
					const timestamp = Number(block.timestamp * 1000);

					if (isFromL2) {
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
					}

					return {
						timestamp,
						amount: wei(args._amount),
						transactionHash: l.transactionHash,
						type: 'deposit',
						status: 'pending',
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

export default useGetBridgeDataQuery;
