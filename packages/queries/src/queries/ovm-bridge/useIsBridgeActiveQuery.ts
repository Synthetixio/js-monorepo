import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';

const useIsBridgeActiveQuery = (
	ctx: QueryContext,
	options?: UseQueryOptions<{ deposit: boolean; withdrawal: boolean }>
) => {
	return useQuery<{ deposit: boolean; withdrawal: boolean }>(
		['ovm-bridge', 'depositsActive', ctx.networkId],
		async () => {
			return {
				deposit: ctx.snxjs!.contracts.SynthetixBridgeToOptimism
					? ctx.snxjs!.contracts.SynthetixBridgeToOptimism.initiationActive()
					: false,
				withdrawal: ctx.snxjs!.contracts.SynthetixBridgeToBase
					? ctx.snxjs!.contracts.SynthetixBridgeToBase.initiationActive()
					: false,
			};
		},
		{
			enabled: ctx.snxjs != null,
			...options,
		}
	);
};

export default useIsBridgeActiveQuery;
