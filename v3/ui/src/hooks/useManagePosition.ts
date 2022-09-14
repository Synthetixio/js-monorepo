import { utils } from 'ethers';
import { useMemo } from 'react';
import { CollateralType, contracts } from '../utils/constants';
import { parseUnits } from '../utils/helpers';
import { useApproveCall } from './useApproveCall';
import { useContract } from './useContract';
import { MulticallCall, useMulticall } from './useMulticall2';

interface IPosition {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
}

export const useManagePosition = (
  position: IPosition,
  collateralChange: number,
  debtChange: number,
  collateralAmount: number,
  refetch?: () => void
) => {
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const collateralChangeBN = parseUnits(collateralChange, position.collateral.decimals);

  const calls: MulticallCall[] = useMemo(() => {
    const list: MulticallCall[] = [];

    if (!snxProxy) return [];

    if (collateralChange > 0) {
      const currentAmount = parseUnits(collateralAmount, position.collateral.decimals);

      list.push(
        {
          contract: snxProxy?.contract,
          functionName: 'depositCollateral',
          callArgs: [position.accountId, position.collateral.address, collateralChangeBN],
        },
        {
          contract: snxProxy.contract,
          functionName: 'delegateCollateral',
          callArgs: [
            position.accountId,
            position.poolId,
            position.collateral.address,
            currentAmount.add(collateralChangeBN),
            utils.parseEther('1'),
          ],
        }
      );
    }

    if (debtChange < 0) {
      const amount = utils.parseEther(`${-debtChange}`);
      list.push({
        contract: snxProxy?.contract,
        functionName: 'burnUsd',
        callArgs: [position.accountId, position.poolId, position.collateral.address, amount],
      });
    }

    if (debtChange > 0) {
      const amount = utils.parseEther(`${debtChange}`);

      list.push({
        contract: snxProxy?.contract,
        functionName: 'mintUsd',
        callArgs: [position.accountId, position.poolId, position.collateral.address, amount],
      });
    }

    if (collateralChange < 0) {
      const currentAmount = parseUnits(collateralAmount, position.collateral.decimals);
      list.push(
        {
          contract: snxProxy.contract,
          functionName: 'delegateCollateral',
          callArgs: [
            position.accountId,
            position.poolId,
            position.collateral.address,
            currentAmount.add(collateralChangeBN),
            utils.parseEther('1'),
          ],
        },
        {
          contract: snxProxy.contract,
          functionName: 'withdrawCollateral',
          callArgs: [position.accountId, position.collateral.address, collateralChangeBN.abs()],
        }
      );
    }

    return list;
  }, [
    snxProxy,
    collateralChange,
    debtChange,
    collateralAmount,
    position.collateral.decimals,
    position.collateral.address,
    position.accountId,
    position.poolId,
    collateralChangeBN,
  ]);

  const multiTxn = useMulticall(calls, undefined, {
    onSuccess: refetch,
  });
  const { exec, isLoading } = useApproveCall(
    position.collateral.address,
    collateralAmount > 0 ? collateralChangeBN : 0,
    snxProxy?.address,
    multiTxn.exec
  );

  return {
    isLoading,
    exec,
  };
};
