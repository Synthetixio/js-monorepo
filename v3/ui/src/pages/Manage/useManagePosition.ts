import { useCallback, useMemo, useState } from 'react';
import { compareAddress } from '@snx-v3/format';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { MulticallCall, useMulticall } from '../../hooks/useMulticall';
import { useUnWrapEth } from '@snx-v3/useWrapEth';
import { useSetTransactionState } from '@snx-v3/useTransactionState';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { Wei, wei } from '@synthetixio/wei';

export const useManagePosition = ({
  accountId,
  poolId,
  collateralType,
  collateralChange,
  debtChange,
  collateralAmount,
  refetch,
}: {
  accountId?: string;
  poolId?: string;
  collateralType?: CollateralType;
  collateralChange: Wei;
  debtChange: Wei;
  collateralAmount?: Wei;
  refetch?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: CoreProxy } = useCoreProxy();

  const ethCollateral = useCollateralType('WETH');
  const isNativeCurrency = compareAddress(
    ethCollateral?.tokenAddress,
    collateralType?.tokenAddress
  );

  const { exec: unWrap, isLoading: isUnWrapping } = useUnWrapEth();

  const calls: MulticallCall[] = useMemo(() => {
    const list: MulticallCall[] = [];

    if (!(CoreProxy && collateralAmount && collateralType)) return [];

    if (collateralChange.lt(0)) {
      const newCollateralValue = collateralAmount.add(collateralChange).toBN();
      list.push(
        {
          contract: CoreProxy,
          functionName: 'delegateCollateral',
          callArgs: [
            accountId,
            poolId,
            collateralType.tokenAddress,
            newCollateralValue,
            wei(1).toBN(),
          ],
        },
        {
          contract: CoreProxy,
          functionName: 'withdraw',
          callArgs: [accountId, collateralType.tokenAddress, collateralChange.mul(-1).toBN()],
        }
      );
    }

    return list;
  }, [CoreProxy, collateralAmount, collateralType, collateralChange, accountId, poolId]);

  const multiTxn = useMulticall(calls);

  const multicallTitles = useMemo(() => {
    const title: string[] = [];
    if (!collateralType?.symbol) {
      return title;
    }
    if (collateralChange.gt(0)) {
      title.push('Deposit ' + collateralType.symbol);
    } else if (collateralChange.lt(0)) {
      title.push('Withdraw ' + collateralType.symbol);
    }

    if (debtChange.gt(0)) {
      title.push('Borrow snxUSD');
    } else if (debtChange.lt(0)) {
      title.push('Repay snxUSD');
    }

    return title;
  }, [collateralChange, debtChange, collateralType?.symbol]);

  const setTransactionState = useSetTransactionState();
  const updateTransactions = useCallback(() => {
    const transactions = [];

    transactions.push({
      title: multicallTitles.join(', '),
      subtitle: 'This is a multicall.',
      call: async () => await multiTxn.exec(),
      checkboxLabel: '',
      checked: false,
    });

    if (isNativeCurrency && collateralChange.lt(0)) {
      transactions.push({
        title: 'Unwrap ETH',
        subtitle: 'Convert wETH to native ETH.',
        call: async () => await unWrap(collateralChange.abs()),
        checkboxLabel: '',
        checked: false,
      });
    }

    setTransactionState({
      transactions,
      isOpen: true,
      onSuccess: () => {
        if (refetch) {
          refetch();
        }
      },
    });
  }, [
    refetch,
    isNativeCurrency,
    collateralChange,
    multicallTitles,
    setTransactionState,
    multiTxn,
    unWrap,
  ]);

  const exec = useCallback(
    async (useDialog = true) => {
      if (useDialog) {
        return updateTransactions();
      }
      try {
        setIsLoading(true);

        await multiTxn.exec();
        if (isNativeCurrency && collateralChange.lt(0)) {
          await unWrap(collateralChange.abs());
        }
        refetch?.();
      } catch (error) {
        //console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [updateTransactions, collateralChange, isNativeCurrency, multiTxn, refetch, unWrap]
  );

  return {
    isLoading: isLoading || isUnWrapping,
    exec,
  };
};
