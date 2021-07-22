import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';

const useGetDepositsIsActive = (ctx: QueryContext, options?: UseQueryOptions<{ deposit: boolean, withdrawal: boolean }>) => {

	return useQuery<{ deposit: boolean, withdrawal: boolean }>(
		['ovm-bridge', 'depositsActive', ctx.networkId],
		async () => {
			const {
				contracts: { SynthetixBridgeToOptimism, SynthetixBridgeToBase },
			} = ctx.snxjs!;

			return {
				deposit: await SynthetixBridgeToOptimism.initiationActive(),
				withdrawal: await SynthetixBridgeToBase.initiationActive()
			};
		},
		{
			enabled: ctx.snxjs != null,
			...options,
		}
	);
};

export default useGetDepositsIsActive;
