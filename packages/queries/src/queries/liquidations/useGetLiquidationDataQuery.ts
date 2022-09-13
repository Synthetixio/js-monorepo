import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import Wei, { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';

type LiquidationData = {
  liquidationRatio: Wei;
  liquidationDelay: Wei;
  liquidationDeadlineForAccount: Wei;
  liquidationPenalty: Wei;
  selfLiquidationPenalty: Wei;
};

const useGetLiquidationDataQuery = (
  ctx: QueryContext,
  walletAddress: string | null,
  options?: UseQueryOptions<LiquidationData>
) => {
  return useQuery<LiquidationData>(
    ['liquidations', 'info', ctx.networkId, walletAddress],
    async () => {
      if (!ctx.snxjs) {
        throw Error('Expected ctx.snxjs do be defined');
      }
      const {
        contracts: { Liquidator },
      } = ctx.snxjs;
      const [
        liquidationRatioBN,
        liquidationDelayBN,
        liquidationDeadlineForAccountBN,
        liquidationPenaltyBN,
        selfLiquidationPenaltyBN,
      ] = await Promise.all([
        Liquidator.liquidationRatio(),
        Liquidator.liquidationDelay(),
        Liquidator.getLiquidationDeadlineForAccount(walletAddress),
        Liquidator.liquidationPenalty(),
        Liquidator.selfLiquidationPenalty(),
      ]);
      return {
        liquidationRatio: wei(liquidationRatioBN),
        liquidationDelay: wei(liquidationDelayBN, 0),
        liquidationDeadlineForAccount: wei(liquidationDeadlineForAccountBN, 0),
        liquidationPenalty: wei(liquidationPenaltyBN),
        selfLiquidationPenalty: wei(selfLiquidationPenaltyBN),
      };
    },
    {
      enabled: ctx.snxjs != null && !!walletAddress,
      ...options,
    }
  );
};

export default useGetLiquidationDataQuery;
