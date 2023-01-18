import { parseUnits } from '@snx-v3/format';
import { useMemo } from 'react';
import { contracts } from '../utils/constants';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useContract } from './useContract';
import { MulticallCall, useMulticall } from './useMulticall';
import { Wei } from '@synthetixio/wei';

export function useUpdatePool({
  accountId,
  poolId,
  collateral,
  collateralAmount,
  newPoolId,
  onSuccess,
}: {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
  collateralAmount?: Wei;
  newPoolId: string;
  onSuccess?: () => void;
}) {
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);

  const calls: MulticallCall[] = useMemo(() => {
    if (!snxProxy || poolId === newPoolId || !collateralAmount) return [];

    return [
      {
        contract: snxProxy.contract,
        functionName: 'delegateCollateral',
        callArgs: [accountId, poolId, collateral.tokenAddress, 0, parseUnits(1, 18)],
      },
      {
        contract: snxProxy.contract,
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
  }, [collateralAmount, newPoolId, accountId, collateral.tokenAddress, poolId, snxProxy]);

  return useMulticall(calls, undefined, {
    onSuccess,
  });
}
