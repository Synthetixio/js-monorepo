import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryContext } from '../../context';

const useIsBridgeActiveQuery = (
  ctx: QueryContext,
  options?: UseQueryOptions<{ deposit: boolean; withdrawal: boolean }>
) => {
  return useQuery<{ deposit: boolean; withdrawal: boolean }>(
    ['ovm-bridge', 'depositsActive', ctx.networkId],
    async () => {
      if (!ctx.snxjs) throw Error('Expected snxjs to be defined');
      const bridgeToOptimism = ctx.snxjs.contracts?.SynthetixBridgeToOptimism ?? null;
      const bridgeToBase = ctx.snxjs.contracts?.SynthetixBridgeToBase ?? null;
      return {
        deposit: bridgeToOptimism ? await bridgeToOptimism.initiationActive() : false,
        withdrawal: bridgeToBase ? await bridgeToBase.initiationActive() : false,
      };
    },
    {
      enabled: ctx.snxjs != null,
      ...options,
    }
  );
};

export default useIsBridgeActiveQuery;
