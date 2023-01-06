import { useToast } from '@chakra-ui/react';
import { CallOverrides } from 'ethers';
import { parseUnits } from '@snx-v3/format';
import { useAccounts } from '@snx-v3/useAccounts';
import type { CollateralType } from '@snx-v3/useCollateralTypes';
import { useCallback, useMemo, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { useSetTransactionState } from '@snx-v3/useTransactionState';
import { contracts } from '../utils/constants';
import { useApprove } from './useApprove';
import { useContract } from './useContract';
import { MulticallCall, useMulticall } from './useMulticall';
import { useWrapEth } from './useWrapEth';
import { LiquidityPositionsById } from '@snx-v3/useLiquidityPositions';

export const useDeposit = ({
  accountId,
  liquidityPositions,
  amount,
  selectedCollateralType,
  selectedPoolId,
  isWrappedEth,
  poolId,
  onSuccess,
}: {
  accountId?: string;
  liquidityPositions: LiquidityPositionsById;
  amount: string;
  selectedCollateralType: CollateralType;
  selectedPoolId: string;
  poolId?: string;
  isWrappedEth: boolean;
  onSuccess: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toast = useToast({
    isClosable: true,
    duration: 9000,
  });

  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const { refetch: refetchAccounts } = useAccounts();

  const amountBN =
    Boolean(amount && selectedCollateralType) && Number(amount) > 0
      ? parseUnits(amount)
      : parseUnits(0);

  const { wrap, balance: wrapEthBalance, isLoading: isWrapping } = useWrapEth();

  const newAccountId = useMemo(() => `${Math.floor(Math.random() * 10000000000)}`, []);

  const calls: MulticallCall[] = useMemo(() => {
    if (!selectedCollateralType?.tokenAddress || !selectedCollateralType?.symbol) {
      return [];
    }
    const id = accountId ?? newAccountId;
    const key = `${selectedPoolId}-${selectedCollateralType.symbol}` as const;
    const currentLiquidityPosition = liquidityPositions[key];

    const amountToDelegate = Boolean(accountId)
      ? (currentLiquidityPosition?.collateralAmount.toBN() || parseUnits(0)).add(amountBN)
      : amountBN;

    if (!snxProxy) return [];

    const depositingCalls: MulticallCall[] = [
      {
        contract: snxProxy.contract,
        functionName: 'deposit',
        callArgs: [id, selectedCollateralType.tokenAddress, amountBN],
      },
      {
        contract: snxProxy.contract,
        functionName: 'delegateCollateral',
        callArgs: [
          id,
          parseInt(Boolean(accountId) ? selectedPoolId : poolId || '0'),
          selectedCollateralType.tokenAddress,
          amountToDelegate || 0,
          parseUnits(1, 18),
        ],
      },
    ];

    const initialCalls: MulticallCall[] = [];

    if (!Boolean(accountId)) {
      initialCalls.push({
        contract: snxProxy.contract,
        functionName: 'createAccount',
        callArgs: [newAccountId],
      });
    }

    return [...initialCalls, ...depositingCalls];
  }, [
    accountId,
    newAccountId,
    selectedPoolId,
    selectedCollateralType?.symbol,
    selectedCollateralType?.tokenAddress,
    liquidityPositions,
    amountBN,
    snxProxy,
    poolId,
  ]);

  const overrides: CallOverrides = {};

  const multiTxn = useMulticall(calls, overrides, {
    onMutate: () => {
      toast.closeAll();

      if (!Boolean(accountId)) {
        toast({
          title: 'Create your account',
          description: "You'll be redirected once your account is created.",
          status: 'info',
          isClosable: true,
          duration: 9000,
        });
      } else {
        toast({
          title: 'Update your collateral',
          description: 'Your deposited collateral amounts have been updated.',
          status: 'info',
          isClosable: true,
          duration: 9000,
        });
      }
    },
    onSuccess: async () => {
      toast.closeAll();
      onSuccess();
      await refetchAccounts();
      if (!Boolean(accountId)) {
        navigate(
          generatePath('/accounts/:accountId/positions/:collateral/:poolId', {
            accountId: newAccountId,
            collateral: selectedCollateralType.symbol,
            poolId: selectedPoolId,
          })
        );
      } else {
        // TODO: get language from noah
        toast({
          title: 'Success',
          description: 'Your deposited collateral amounts have been updated.',
          status: 'success',
          duration: 5000,
        });
      }
    },
    onError: () => {
      toast({
        title: 'Could not complete account creation',
        description: 'Please try again.',
        status: 'error',
      });
    },
  });

  const { approve, requireApproval } = useApprove(
    selectedCollateralType?.tokenAddress,
    amountBN,
    snxProxy?.address,
    {
      onMutate: () => {
        toast({
          title: 'Approve collateral for transfer',
          description: 'The next transaction will create your account and deposit this collateral.',
          status: 'info',
        });
      },
      onError: () => {
        toast.closeAll();
        toast({
          title: 'Approval failed',
          description: 'Please try again.',
          status: 'error',
        });
      },
    }
  );

  const setTransactionState = useSetTransactionState();

  const updateTransactions = useCallback(() => {
    const transactions = [];

    if (isWrappedEth) {
      transactions.push({
        title: 'Wrap ETH',
        subtitle: amountBN.gt(wrapEthBalance?.value || 0)
          ? 'You must wrap your ether before depositing.'
          : '',
        call: async (useBalance?: boolean) => await wrap(amountBN, useBalance),
        checkboxLabel: amountBN.gt(wrapEthBalance?.value || 0)
          ? ''
          : `Skip this step and use my existing ${amount} wETH.`,
        checked: false,
      });
    }

    if (requireApproval) {
      transactions.push({
        title: 'Approve ' + selectedCollateralType.symbol.toUpperCase() + ' transfer',
        subtitle: '',
        call: async (infiniteApproval?: boolean) => await approve(infiniteApproval),
        checkboxLabel: requireApproval
          ? `Approve unlimited ${selectedCollateralType.symbol.toUpperCase()} transfers to Synthetix.`
          : '',
        checked: false,
      });
    }

    transactions.push({
      title: 'Deposit ' + selectedCollateralType.symbol.toUpperCase(),
      subtitle: `This will transfer your ${selectedCollateralType.symbol.toUpperCase()} to Synthetix.`,
      call: async () => await multiTxn.exec(),
      checkboxLabel: '',
      checked: false,
    });

    setTransactionState({
      transactions,
      isOpen: true,
      onSuccess: () => null,
    });
  }, [
    isWrappedEth,
    selectedCollateralType?.symbol,
    requireApproval,
    setTransactionState,
    amountBN,
    wrapEthBalance?.value,
    amount,
    wrap,
    approve,
    multiTxn,
  ]);

  const createAccount = useCallback(async () => {
    setIsLoading(true);
    try {
      await updateTransactions();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [updateTransactions]);

  return {
    createAccount,
    isLoading: isLoading || isWrapping,
    multiTxn,
  };
};
