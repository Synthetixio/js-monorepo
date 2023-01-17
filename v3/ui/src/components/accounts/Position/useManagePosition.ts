import { useCallback, useMemo, useState } from 'react';
import { contracts } from '../../../utils/constants';
import { getContract } from '../../../hooks/useContract';
import { compareAddress, parseUnits } from '@snx-v3/format';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useApprove } from '@snx-v3/useApprove';
import { MulticallCall, useMulticall } from '../../../hooks/useMulticall';
import { useUnWrapEth, useWrapEth } from '../../../hooks/useWrapEth';
import { useSetTransactionState } from '@snx-v3/useTransactionState';
import { BigNumber } from 'ethers';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
import { Wei } from '@synthetixio/wei';

export const useManagePosition = ({
  accountId,
  poolId,
  collateral,
  collateralChange,
  debtChange,
  collateralAmount,
  refetch,
}: {
  accountId?: string;
  poolId?: string;
  collateral?: CollateralType;
  collateralChange: number;
  debtChange: number;
  collateralAmount?: Wei;
  refetch?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: CoreProxy } = useCoreProxy();
  const network = useNetwork();
  const SYNTHETIX_PROXY = getContract(contracts.SYNTHETIX_PROXY, network.name);

  const collateralChangeBN = parseUnits(Math.abs(collateralChange));

  const ethCollateral = useCollateralType('WETH');
  const isNativeCurrency = compareAddress(ethCollateral?.tokenAddress, collateral?.tokenAddress);

  const { wrap, balance: wrapEthBalance, isLoading: isWrapping } = useWrapEth();
  const { unWrap, isLoading: isUnWrapping } = useUnWrapEth();

  const calls: MulticallCall[] = useMemo(() => {
    const list: MulticallCall[] = [];

    if (!(CoreProxy && collateralAmount && collateral)) return [];

    if (collateralChange > 0) {
      list.push(
        {
          contract: CoreProxy,
          functionName: 'deposit',
          callArgs: [accountId, collateral.tokenAddress, collateralChangeBN],
        },
        {
          contract: CoreProxy,
          functionName: 'delegateCollateral',
          callArgs: [
            accountId,
            poolId,
            collateral.tokenAddress,
            collateralAmount.add(collateralChangeBN).toBN(),
            parseUnits(1, 18),
          ],
        }
      );
    }

    if (debtChange < 0) {
      const amount = parseUnits(-1 * debtChange);
      list.push({
        contract: CoreProxy,
        functionName: 'burnUsd',
        callArgs: [accountId, poolId, collateral.tokenAddress, amount],
      });
    }

    if (debtChange > 0) {
      const amount = parseUnits(debtChange);
      list.push({
        contract: CoreProxy,
        functionName: 'mintUsd',
        callArgs: [accountId, poolId, collateral.tokenAddress, amount],
      });
    }

    if (collateralChange < 0) {
      list.push(
        {
          contract: CoreProxy,
          functionName: 'delegateCollateral',
          callArgs: [
            accountId,
            poolId,
            collateral.tokenAddress,
            collateralAmount.sub(collateralChangeBN).toBN(),
            parseUnits(1, 18),
          ],
        },
        {
          contract: CoreProxy,
          functionName: 'withdraw',
          callArgs: [accountId, collateral.tokenAddress, collateralChangeBN],
        }
      );
    }

    return list;
  }, [
    CoreProxy,
    collateralAmount,
    collateral,
    collateralChange,
    debtChange,
    accountId,
    collateralChangeBN,
    poolId,
  ]);

  const multiTxn = useMulticall(calls);
  const { approve, requireApproval } = useApprove({
    contractAddress: collateral?.tokenAddress,
    amount: collateralChange > 0 ? collateralChangeBN : BigNumber.from(0),
    spender: SYNTHETIX_PROXY.address,
  });

  const multicallTitles = useMemo(() => {
    const title: string[] = [];
    if (!collateral?.symbol) {
      return title;
    }
    if (collateralChange > 0) {
      title.push('Deposit ' + collateral.symbol);
    } else if (collateralChange < 0) {
      title.push('Withdraw ' + collateral.symbol);
    }

    if (debtChange > 0) {
      title.push('Mint snxUSD');
    } else if (debtChange < 0) {
      title.push('Burn snxUSD');
    }

    return title;
  }, [collateralChange, debtChange, collateral?.symbol]);

  const setTransactionState = useSetTransactionState();
  const updateTransactions = useCallback(() => {
    const transactions = [];

    if (isNativeCurrency && collateralChange > 0) {
      transactions.push({
        title: 'Wrap ETH',
        subtitle: collateralChangeBN.gt(wrapEthBalance?.value || 0)
          ? 'You must wrap your ether before depositing.'
          : '',
        call: async (useBalance?: boolean) => {
          if (!useBalance) {
            await wrap(collateralChangeBN);
          }
        },
        checkboxLabel: collateralChangeBN.gt(wrapEthBalance?.value || 0)
          ? ''
          : `Skip this step and use my existing ${collateralChange} wETH.`,
        checked: false,
      });
    }

    if (collateral?.symbol && collateralChange > 0 && requireApproval) {
      transactions.push({
        title: `Approve ${collateral.symbol} transfer`,
        subtitle: '',
        call: async (infiniteApproval?: boolean) => await approve(Boolean(infiniteApproval)),
        checkboxLabel: requireApproval
          ? `Approve unlimited ${collateral.symbol} transfers to Synthetix.`
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

    if (isNativeCurrency && collateralChange < 0) {
      transactions.push({
        title: 'Unwrap ETH',
        subtitle: 'Convert wETH to native ETH.',
        call: async () => await unWrap(collateralChangeBN),
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
    collateralChangeBN,
    wrapEthBalance?.value,
    wrap,
    collateral?.symbol,
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
        await approve(false);
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
