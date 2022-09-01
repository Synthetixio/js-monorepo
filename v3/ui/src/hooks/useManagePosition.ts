import { utils } from 'ethers';
import { useCallback, useMemo } from 'react';
import { CollateralType, contracts } from '../utils/constants';
import { parseUnits } from '../utils/helpers';
import { useApprove } from './useApprove';
import { useContract } from './useContract';
import { MulticallCall, useMulticall } from './useMulticall2';

interface IPosition {
  accountId: string;
  fundId: string;
  collateral: CollateralType;
}

export const useManagePosition = (
  position: IPosition,
  collateralChange: number,
  debtChange: number,
  collateralAmount: number
) => {
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const amountBN = parseUnits(collateralChange, position.collateral.decimals);

  const calls: MulticallCall[] = useMemo(() => {
    const list: MulticallCall[] = [];

    if (collateralChange > 0 && snxProxy) {
      const currentAmount = parseUnits(collateralAmount, position.collateral.decimals);
      list.push(
        {
          contract: snxProxy?.contract,
          functionName: 'stake',
          callArgs: [position.accountId, position.collateral.address, amountBN],
        },
        {
          contract: snxProxy.contract,
          functionName: 'delegateCollateral',
          callArgs: [
            position.accountId,
            position.fundId,
            position.collateral.address,
            currentAmount.add(amountBN),
            utils.parseEther('1'),
          ],
        }
      );
    }

    return list;
  }, [
    collateralAmount,
    collateralChange,
    position.accountId,
    position.collateral.address,
    position.collateral.decimals,
    position.fundId,
    snxProxy,
    amountBN,
  ]);

  const multiTxn = useMulticall(calls);
  const { approve, isLoading } = useApprove(
    position.collateral.address,
    amountBN,
    snxProxy?.address
  );
  const exec = useCallback(async () => {
    try {
      if (collateralChange > 0) {
        await approve();
      }
      multiTxn.exec();
    } catch (error) {}
  }, [approve, collateralChange, multiTxn]);
  return {
    isLoading,
    exec,
  };
};
