import { utils } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { contracts } from '../utils/constants';
import { compareAddress, parseUnits } from '../utils/helpers';
import { CollateralType } from '../utils/types';
import { useApproveCall } from './useApproveCall';
import { useContract } from './useContract';
import { MulticallCall, useMulticall } from './useMulticall';
import { useUnWrapEth, useWrapEth } from './useWrapEth';

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
  const [isLoading, setIsLoading] = useState(false);
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const collateralChangeBN = parseUnits(Math.abs(collateralChange), position.collateral.decimals);
  const wethContract = useContract(contracts.WETH);
  const isNativeCurrency = compareAddress(wethContract?.address, position.collateral.address);

  const { wrap, isLoading: isWrapping } = useWrapEth();
  const { unWrap, isLoading: isUnWrapping } = useUnWrapEth();

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
            currentAmount.sub(collateralChangeBN),
            utils.parseEther('1'),
          ],
        },
        {
          contract: snxProxy.contract,
          functionName: 'withdrawCollateral',
          callArgs: [position.accountId, position.collateral.address, collateralChangeBN],
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

  const multiTxn = useMulticall(calls);
  const { exec: approve } = useApproveCall(
    position.collateral.address,
    collateralAmount > 0 ? collateralChangeBN : 0,
    snxProxy?.address,
    multiTxn.exec
  );

  const exec = useCallback(async () => {
    try {
      setIsLoading(true);
      if (isNativeCurrency && collateralChange > 0) {
        await wrap(collateralChangeBN);
      }
      await approve();
      if (isNativeCurrency && collateralChange < 0) {
        await unWrap(collateralChangeBN);
      }
      refetch?.();
    } catch (error) {
      //console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [approve, collateralChange, collateralChangeBN, isNativeCurrency, refetch, unWrap, wrap]);

  return {
    isLoading: isLoading || isWrapping || isUnWrapping,
    exec,
  };
};
