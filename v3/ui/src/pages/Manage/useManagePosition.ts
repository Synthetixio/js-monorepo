import { useCallback, useMemo, useState } from 'react';
import { contracts } from '../../utils/constants';
import { getContract } from '../../hooks/useContract';
import { compareAddress } from '@snx-v3/format';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useApprove } from '@snx-v3/useApprove';
import { MulticallCall, useMulticall } from '../../hooks/useMulticall';
import { useUnWrapEth, useWrapEth } from '../../hooks/useWrapEth';
import { useSetTransactionState } from '@snx-v3/useTransactionState';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
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
  const network = useNetwork();
  const SYNTHETIX_PROXY = getContract(contracts.SYNTHETIX_PROXY, network.name);

  const ethCollateral = useCollateralType('WETH');
  const isNativeCurrency = compareAddress(
    ethCollateral?.tokenAddress,
    collateralType?.tokenAddress
  );

  const { wrap, balance: ethBalance, isLoading: isWrapping } = useWrapEth();
  const { unWrap, isLoading: isUnWrapping } = useUnWrapEth();

  const calls: MulticallCall[] = useMemo(() => {
    const list: MulticallCall[] = [];

    if (!(CoreProxy && collateralAmount && collateralType)) return [];

    if (collateralChange.gt(0)) {
      list.push(
        {
          contract: CoreProxy,
          functionName: 'deposit',
          callArgs: [accountId, collateralType.tokenAddress, collateralChange.toBN()],
        },
        {
          contract: CoreProxy,
          functionName: 'delegateCollateral',
          callArgs: [
            accountId,
            poolId,
            collateralType.tokenAddress,
            collateralAmount.add(collateralChange).toBN(),
            wei(1).toBN(),
          ],
        }
      );
    }

    if (debtChange.lt(0)) {
      list.push({
        contract: CoreProxy,
        functionName: 'burnUsd',
        callArgs: [accountId, poolId, collateralType.tokenAddress, debtChange.mul(-1).toBN()],
      });
    }

    if (debtChange.gt(0)) {
      list.push({
        contract: CoreProxy,
        functionName: 'mintUsd',
        callArgs: [accountId, poolId, collateralType.tokenAddress, debtChange.toBN()],
      });
    }

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
  }, [
    CoreProxy,
    collateralAmount,
    collateralType,
    collateralChange,
    debtChange,
    accountId,
    poolId,
  ]);

  const multiTxn = useMulticall(calls);
  const { approve, requireApproval } = useApprove({
    contractAddress: collateralType?.tokenAddress,
    amount: collateralChange.gt(0) ? collateralChange.toBN() : wei(0).toBN(),
    spender: SYNTHETIX_PROXY.address,
  });

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

    if (isNativeCurrency && collateralChange.gt(0)) {
      transactions.push({
        title: 'Wrap ETH',
        subtitle: collateralChange.gt(ethBalance?.value || 0)
          ? 'You must wrap your ether before depositing.'
          : '',
        call: async (useBalance?: boolean) => {
          if (!useBalance) {
            await wrap(collateralChange.toBN());
          }
        },
        checkboxLabel: collateralChange.gt(ethBalance?.value || 0)
          ? ''
          : `Skip this step and use my existing ${collateralChange} wETH.`,
        checked: false,
      });
    }

    if (collateralType?.symbol && collateralChange.gt(0) && requireApproval) {
      transactions.push({
        title: `Approve ${collateralType.symbol} transfer`,
        subtitle: '',
        call: async (infiniteApproval?: boolean) => await approve(Boolean(infiniteApproval)),
        checkboxLabel: requireApproval
          ? `Approve unlimited ${collateralType.symbol} transfers to Synthetix.`
          : '',
        checked: false,
      });
    }

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
        call: async () => await unWrap(collateralChange.mul(-1).toBN()),
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
    ethBalance?.value,
    wrap,
    collateralType?.symbol,
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
        if (isNativeCurrency && collateralChange.gt(0)) {
          await wrap(collateralChange.toBN());
        }
        await approve(false);
        await multiTxn.exec();
        if (isNativeCurrency && collateralChange.lt(0)) {
          await unWrap(collateralChange.mul(-1).toBN());
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
