import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { loadPosition, selectPosition } from '@snx-v3/useLiquidityPosition';
import { usePools } from '@snx-v3/usePools';
import Wei from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';

export type LiquidityPositionType = {
  id: `${string}-${string}`;
  accountId: string;
  poolId: string;
  poolName: string;
  collateralAmount: Wei;
  collateralValue: Wei;
  collateralType: CollateralType;
  cRatio: Wei;
  debt: Wei;
};
export type LiquidityPositionsById = {
  [poolIdDashSymbol: `${string}-${string}`]: LiquidityPositionType;
};

const selectPositions = (positions: LiquidityPositionType[]) =>
  Object.fromEntries(positions.map((position) => [position.id, position]));

export const useLiquidityPositions = ({ accountId }: { accountId?: string }) => {
  const { data: CoreProxy } = useCoreProxy();
  const { data: pools } = usePools();
  const { data: collateralTypes } = useCollateralTypes();

  return useQuery({
    queryKey: [
      'LiquidityPositions',
      {
        collateralTypes: collateralTypes?.map((x) => x.tokenAddress),
        pools,
        accountId,
        CoreProxy: CoreProxy?.address,
      },
    ],
    queryFn: async () => {
      if (!pools || !collateralTypes || !CoreProxy || !accountId) {
        throw Error('Query should not be enabled');
      }

      const nestedResult = await Promise.all(
        pools.map(async ({ id: poolId, name: poolName }) =>
          Promise.all(
            collateralTypes.map(async (collateralType) => {
              const posRaw = await loadPosition({
                CoreProxy,
                accountId,
                poolId,
                tokenAddress: collateralType.tokenAddress,
              });
              const { cRatio, collateralAmount, collateralValue, debt } = selectPosition(posRaw);

              return {
                id: `${poolId}-${collateralType.symbol}` as const,
                accountId,
                poolId,
                poolName,
                collateralAmount,
                collateralValue,
                collateralType,
                cRatio,
                debt,
              };
            })
          )
        )
      );
      return nestedResult.flat();
    },
    select: selectPositions,
    enabled: Boolean(CoreProxy && collateralTypes?.length && accountId && pools?.length),
  });
};
