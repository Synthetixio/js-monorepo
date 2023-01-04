import { parseUnits } from '@snx-v3/format';
import { useMemo } from 'react';
import { contracts } from '../utils/constants';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useContract } from './useContract';
import { MulticallCall, useMulticall } from './useMulticall';

interface IPosition {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
}

export const useUpdatePool = (
  position: IPosition,
  amount: string | number,
  newPoolId: string,
  onSuccess?: () => void
) => {
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);

  const calls: MulticallCall[] = useMemo(() => {
    if (!snxProxy || position.poolId === newPoolId) return [];

    const amountBN = parseUnits(amount);
    return [
      {
        contract: snxProxy.contract,
        functionName: 'delegateCollateral',
        callArgs: [
          position.accountId,
          position.poolId,
          position.collateral.tokenAddress,
          0,
          parseUnits(1, 18),
        ],
      },
      {
        contract: snxProxy.contract,
        functionName: 'delegateCollateral',
        callArgs: [
          position.accountId,
          newPoolId,
          position.collateral.tokenAddress,
          amountBN,
          parseUnits(1, 18),
        ],
      },
    ];
  }, [
    amount,
    newPoolId,
    position.accountId,
    position.collateral.tokenAddress,
    position.poolId,
    snxProxy,
  ]);

  return useMulticall(calls, undefined, {
    onSuccess,
  });
};
