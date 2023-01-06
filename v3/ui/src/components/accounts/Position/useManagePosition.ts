import { useCallback, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Transaction } from '../../shared/TransactionReview/TransactionReview.types';
import { contracts } from '../../../utils/constants';
import { compareAddress, parseUnits } from '@snx-v3/format';
import { transactionState } from '../../../utils/state';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useApprove } from '../../../hooks/useApprove';
import { useContract } from '../../../hooks/useContract';
import { MulticallCall, useMulticall } from '../../../hooks/useMulticall';
import { useUnWrapEth, useWrapEth } from '../../../hooks/useWrapEth';
import { useEthCollateralType } from '@snx-v3/useCollateralTypes';
import { BigNumber } from 'ethers';

export const useManagePosition = ({
  accountId,
  poolId,
  collateral,
  collateralChange,
  debtChange,
  collateralAmount,
  refetch,
}: {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
  collateralChange: number;
  debtChange: number;
  collateralAmount: number;
  refetch?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const collateralChangeBN = parseUnits(Math.abs(collateralChange));

  const ethCollateral = useEthCollateralType();
  const isNativeCurrency = compareAddress(ethCollateral?.tokenAddress, collateral.tokenAddress);

  const { wrap, balance: wrapEthBalance, isLoading: isWrapping } = useWrapEth();
  const { unWrap, isLoading: isUnWrapping } = useUnWrapEth();

  const calls: MulticallCall[] = useMemo(() => {
    const list: MulticallCall[] = [];

    if (!snxProxy) return [];

    if (collateralChange > 0) {
      const currentAmount = parseUnits(collateralAmount);

      list.push(
        {
          contract: snxProxy?.contract,
          functionName: 'deposit',
          callArgs: [accountId, collateral.tokenAddress, collateralChangeBN],
        },
        {
          contract: snxProxy.contract,
          functionName: 'delegateCollateral',
          callArgs: [
            accountId,
            poolId,
            collateral.tokenAddress,
            currentAmount.add(collateralChangeBN),
            parseUnits(1, 18),
          ],
        }
      );
    }

    if (debtChange < 0) {
      const amount = parseUnits(-1 * debtChange);
      list.push({
        contract: snxProxy?.contract,
        functionName: 'burnUsd',
        callArgs: [accountId, poolId, collateral.tokenAddress, amount],
      });
    }

    if (debtChange > 0) {
      const amount = parseUnits(debtChange);
      list.push({
        contract: snxProxy?.contract,
        functionName: 'mintUsd',
        callArgs: [accountId, poolId, collateral.tokenAddress, amount],
      });
    }

    if (collateralChange < 0) {
      const currentAmount = parseUnits(collateralAmount);
      list.push(
        {
          contract: snxProxy.contract,
          functionName: 'delegateCollateral',
          callArgs: [
            accountId,
            poolId,
            collateral.tokenAddress,
            currentAmount.sub(collateralChangeBN),
            parseUnits(1, 18),
          ],
        },
        {
          contract: snxProxy.contract,
          functionName: 'withdraw',
          callArgs: [accountId, collateral.tokenAddress, collateralChangeBN],
        }
      );
    }

    return list;
  }, [
    snxProxy,
    collateralChange,
    debtChange,
    collateralAmount,
    collateral.tokenAddress,
    accountId,
    poolId,
    collateralChangeBN,
  ]);

  const multiTxn = useMulticall(calls);
  const { approve, requireApproval } = useApprove(
    collateral.tokenAddress,
    collateralChange > 0 ? collateralChangeBN : BigNumber.from(0),
    snxProxy?.address
  );

  const multicallTitles = useMemo(() => {
    const title: string[] = [];
    if (collateralChange > 0) {
      title.push('Deposit ' + collateral.symbol.toUpperCase());
    } else if (collateralChange < 0) {
      title.push('Withdraw ' + collateral.symbol.toUpperCase());
    }

    if (debtChange > 0) {
      title.push('Mint snxUSD');
    } else if (debtChange < 0) {
      title.push('Burn snxUSD');
    }

    return title;
  }, [collateralChange, debtChange, collateral.symbol]);

  const setTransaction = useSetRecoilState(transactionState);

  const updateTransactions = useCallback(() => {
    const transactions: Transaction[] = [];

    if (isNativeCurrency && collateralChange > 0) {
      transactions.push({
        title: 'Wrap ETH',
        subtitle: collateralChangeBN.gt(wrapEthBalance?.value || 0)
          ? 'You must wrap your ether before depositing.'
          : undefined,
        call: async (useBalance) => await wrap(collateralChangeBN, useBalance),
        checkboxLabel: collateralChangeBN.gt(wrapEthBalance?.value || 0)
          ? undefined
          : `Skip this step and use my existing ${collateralChange} wETH.`,
      });
    }

    if (collateralChange > 0 && requireApproval) {
      transactions.push({
        title: 'Approve ' + collateral.symbol.toUpperCase() + ' transfer',
        call: async (infiniteApproval) => await approve(infiniteApproval),
        checkboxLabel: requireApproval
          ? `Approve unlimited ${collateral.symbol.toUpperCase()} transfers to Synthetix.`
          : undefined,
      });
    }

    transactions.push({
      title: multicallTitles.join(', '),
      subtitle: 'This is a multicall.',
      call: async () => await multiTxn.exec(),
    });

    if (isNativeCurrency && collateralChange < 0) {
      transactions.push({
        title: 'Unwrap ETH',
        subtitle: 'Convert wETH to native ETH.',
        call: async () => await unWrap(collateralChangeBN),
      });
    }

    setTransaction({
      transactions,
      isOpen: true,
      onSuccess: refetch,
    });
  }, [
    refetch,
    isNativeCurrency,
    collateralChange,
    multicallTitles,
    setTransaction,
    collateralChangeBN,
    wrapEthBalance?.value,
    wrap,
    collateral.symbol,
    approve,
    multiTxn,
    unWrap,
    requireApproval,
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
