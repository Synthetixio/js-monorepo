import { utils } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { useMemo } from 'react';
import { CollateralType, contracts } from '../utils/constants';
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

    const amountBN = parseUnits(amount.toString(), position.collateral.decimals);
    return [
      {
        contract: snxProxy.contract,
        functionName: 'delegateCollateral',
        callArgs: [
          position.accountId,
          position.poolId,
          position.collateral.address,
          0,
          utils.parseEther('1'),
        ],
      },
      {
        contract: snxProxy.contract,
        functionName: 'delegateCollateral',
        callArgs: [
          position.accountId,
          newPoolId,
          position.collateral.address,
          amountBN,
          utils.parseEther('1'),
        ],
      },
    ];
  }, [
    amount,
    newPoolId,
    position.accountId,
    position.collateral.address,
    position.collateral.decimals,
    position.poolId,
    snxProxy,
  ]);

  return useMulticall(calls, undefined, {
    onSuccess,
  });
};
