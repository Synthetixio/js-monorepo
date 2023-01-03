import { useToast } from '@chakra-ui/react';
import { BigNumber, CallOverrides } from 'ethers';
import { parseUnits } from '../utils/helpers';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Transaction } from '../components/shared/TransactionReview/TransactionReview.types';
import { contracts, getChainById } from '../utils/constants';
import { accountsState, chainIdState, transactionState } from '../utils/state';
import { CollateralType, LiquidityPositionType } from '../utils/types';
import { useApprove } from './useApprove';
import { useContract } from './useContract';
import { MulticallCall, useMulticall } from './useMulticall';
import { useWrapEth } from './useWrapEth';

interface Props {
  accountId?: string;
  liquidityPositions: Record<string, LiquidityPositionType>;
  amount: string;
  selectedCollateralType: CollateralType;
  selectedPoolId: string;
  poolId?: string;
  isNativeCurrency: boolean;
  onSuccess: () => void;
}

export const useDeposit = ({
  accountId,
  liquidityPositions,
  amount,
  selectedCollateralType,
  selectedPoolId,
  isNativeCurrency,
  poolId,
  onSuccess,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localChainId] = useRecoilState(chainIdState);
  const chain = getChainById(localChainId);

  const navigate = useNavigate();

  const toast = useToast({
    isClosable: true,
    duration: 9000,
  });

  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const [{ refetchAccounts }] = useRecoilState(accountsState);

  const amountBN =
    Boolean(amount && selectedCollateralType) && Number(amount) > 0
      ? parseUnits(amount, selectedCollateralType.decimals)
      : BigNumber.from(0);

  const { wrap, balance: wrapEthBalance, isLoading: isWrapping } = useWrapEth();

  const newAccountId = useMemo(() => Math.floor(Math.random() * 10000000000), []);

  const calls: MulticallCall[] = useMemo(() => {
    if (!selectedCollateralType?.tokenAddress || !selectedCollateralType?.symbol) {
      return [];
    }
    const id = accountId ?? newAccountId;
    const key = `${selectedPoolId}-${selectedCollateralType.symbol}`;
    const currentLiquidityPosition = liquidityPositions[key];

    const amountToDelegate = Boolean(accountId)
      ? (currentLiquidityPosition?.collateralAmount || BigNumber.from(0)).add(amountBN)
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
      await Promise.all([refetchAccounts!({ cancelRefetch: Boolean(accountId) })]);
      if (!Boolean(accountId)) {
        navigate(
          `/accounts/${newAccountId}/positions/${selectedCollateralType.symbol}/${selectedPoolId}?chain=${chain?.network}`
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

  const setTransaction = useSetRecoilState(transactionState);

  const updateTransactions = useCallback(() => {
    const transactions: Transaction[] = [];

    if (isNativeCurrency) {
      transactions.push({
        title: 'Wrap ETH',
        subtitle: amountBN.gt(wrapEthBalance?.value || 0)
          ? 'You must wrap your ether before depositing.'
          : undefined,
        call: async (useBalance) => await wrap(amountBN, useBalance),
        checkboxLabel: amountBN.gt(wrapEthBalance?.value || 0)
          ? undefined
          : `Skip this step and use my existing ${amount} wETH.`,
      });
    }
    if (requireApproval) {
      transactions.push({
        title: 'Approve ' + selectedCollateralType.symbol.toUpperCase() + ' transfer',
        call: async (infiniteApproval) => await approve(infiniteApproval),
        checkboxLabel: requireApproval
          ? `Approve unlimited ${selectedCollateralType.symbol.toUpperCase()} transfers to Synthetix.`
          : undefined,
      });
    }

    transactions.push({
      title: 'Deposit ' + selectedCollateralType.symbol.toUpperCase(),
      subtitle: `This will transfer your ${selectedCollateralType.symbol.toUpperCase()} to Synthetix.`,
      call: async () => await multiTxn.exec(),
    });

    setTransaction({
      transactions,
      isOpen: true,
    });
  }, [
    isNativeCurrency,
    selectedCollateralType?.symbol,
    requireApproval,
    setTransaction,
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
