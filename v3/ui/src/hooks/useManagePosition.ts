import { utils } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Transaction } from '../components/shared/TransactionReview/TransactionReview.types';
import { contracts } from '../utils/constants';
import { compareAddress, parseUnits } from '../utils/helpers';
import { transactionState } from '../utils/state';
import { CollateralType } from '../utils/types';
import { useApprove } from './useApprove';
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
  const { approve } = useApprove(
    position.collateral.address,
    collateralChange > 0 ? collateralChangeBN : 0,
    snxProxy?.address
  );

  const multicallTitles = useMemo(() => {
    const title: string[] = [];
    if (collateralChange > 0) {
      title.push('Stake ' + position.collateral.symbol.toUpperCase());
    } else if (collateralChange < 0) {
      title.push('Unstake ' + position.collateral.symbol.toUpperCase());
    }

    if (debtChange > 0) {
      title.push('Mint snxUSD');
    } else if (debtChange < 0) {
      title.push('Burn snxUSD');
    }

    return title;
  }, [collateralChange, debtChange, position.collateral.symbol]);

  const setTransaction = useSetRecoilState(transactionState);

  const updateTransactions = useCallback(() => {
    const transactions: Transaction[] = [];

    if (isNativeCurrency && collateralChange > 0) {
      transactions.push({
        title: 'Wrap ETH',
        subtitle: 'You need to wrap your ether',
        call: async () => await wrap(collateralChangeBN),
      });
    }

    if (collateralChange > 0) {
      transactions.push({
        title: 'Approve ' + position.collateral.symbol.toUpperCase(),
        subtitle: 'This step is a approval',
        call: async () => await approve(),
      });
    }

    transactions.push({
      title: multicallTitles.join(' - '),
      subtitle: 'this step is a multicall',
      call: async () => await multiTxn.exec(),
    });

    if (isNativeCurrency && collateralChange < 0) {
      transactions.push({
        title: 'unWrap ETH',
        subtitle: 'You need to un-wrap your WETH',
        call: async () => await unWrap(collateralChangeBN),
      });
    }

    setTransaction({
      transactions,
      isOpen: true,
    });
  }, [
    multicallTitles,
    approve,
    collateralChange,
    collateralChangeBN,
    isNativeCurrency,
    multiTxn,
    position.collateral.symbol,
    setTransaction,
    unWrap,
    wrap,
  ]);

  const exec = useCallback(
    async (useDialog = true) => {
      if (useDialog) {
        return updateTransactions();
      }
      try {
        setIsLoading(true);
        if (isNativeCurrency && collateralChange > 0) {
          await wrap(collateralChangeBN);
        }
        await approve();
        await multiTxn.exec();
        if (isNativeCurrency && collateralChange < 0) {
          await unWrap(collateralChangeBN);
        }
        refetch?.();
      } catch (error) {
        //console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      updateTransactions,
      approve,
      collateralChange,
      collateralChangeBN,
      isNativeCurrency,
      multiTxn,
      refetch,
      unWrap,
      wrap,
    ]
  );

  return {
    isLoading: isLoading || isWrapping || isUnWrapping,
    exec,
  };
};
