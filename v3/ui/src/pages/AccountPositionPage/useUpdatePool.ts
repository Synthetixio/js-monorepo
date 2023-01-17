import { parseUnits } from '@snx-v3/format';
import { useMemo } from 'react';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { MulticallCall, useMulticall } from '../../hooks/useMulticall';
import { Wei } from '@synthetixio/wei';
import { useCoreProxy } from '@snx-v3/useCoreProxy';

export function useUpdatePool({
  accountId,
  poolId,
  collateral,
  collateralAmount,
  newPoolId,
  onSuccess,
}: {
  accountId?: string;
  poolId?: string;
  collateral?: CollateralType;
  collateralAmount?: Wei;
  newPoolId?: string;
  onSuccess?: () => void;
}) {
  const { data: CoreProxy } = useCoreProxy();

  const calls: MulticallCall[] = useMemo(() => {
    if (!CoreProxy || poolId === newPoolId || !collateralAmount || !collateral?.tokenAddress)
      return [];

    return [
      {
        contract: CoreProxy,
        functionName: 'delegateCollateral',
        callArgs: [accountId, poolId, collateral.tokenAddress, 0, parseUnits(1, 18)],
      },
      {
        contract: CoreProxy,
        functionName: 'delegateCollateral',
        callArgs: [
          accountId,
          newPoolId,
          collateral.tokenAddress,
          collateralAmount.toBN(),
          parseUnits(1, 18),
        ],
      },
    ];
  }, [CoreProxy, poolId, newPoolId, collateralAmount, collateral?.tokenAddress, accountId]);

  return useMulticall(calls, undefined, {
    onSuccess,
  });
}
