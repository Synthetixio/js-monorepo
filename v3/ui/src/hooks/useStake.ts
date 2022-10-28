import { useToast } from '@chakra-ui/react';
import { BigNumber, CallOverrides, ethers, utils } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Transaction } from '../components/shared/TransactionReview/TransactionReview.types';
import { contracts, getChainById } from '../utils/constants';
import { accountsState, chainIdState, transactionState } from '../utils/state';
import { CollateralType, StakingPositionType } from '../utils/types';
import { useApprove } from './useApprove';
import { useContract } from './useContract';
import { MulticallCall, useMulticall } from './useMulticall';
import { useWrapEth } from './useWrapEth';

interface Props {
  accountId?: string;
  stakingPositions: Record<string, StakingPositionType>;
  amount: string;
  selectedCollateralType: CollateralType;
  selectedPoolId: string;
  poolId?: string;
  isNativeCurrency: boolean;
  onSuccess: () => void;
}

export const useStake = ({
  accountId,
  stakingPositions,
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
    Boolean(amount) && Number(amount) > 0
      ? ethers.utils.parseUnits(amount, selectedCollateralType.decimals)
      : BigNumber.from(0);

  const { wrap, balance: wrapEthBalance, isLoading: isWrapping } = useWrapEth();

  const newAccountId = useMemo(() => Math.floor(Math.random() * 10000000000), []);

  const calls: MulticallCall[] = useMemo(() => {
    const id = accountId ?? newAccountId;
    const key = `${selectedPoolId}-${selectedCollateralType.symbol}`;
    const currentStakingPosition = stakingPositions[key];

    const amountToDelegate = Boolean(accountId)
      ? (currentStakingPosition?.collateralAmount || BigNumber.from(0)).add(amountBN)
      : amountBN;

    if (!snxProxy) return [];

    const stakingCalls: MulticallCall[] = [
      {
        contract: snxProxy.contract,
        functionName: 'depositCollateral',
        callArgs: [id, selectedCollateralType.address, amountBN],
      },
      {
        contract: snxProxy.contract,
        functionName: 'delegateCollateral',
        callArgs: [
          id,
          Boolean(accountId) ? selectedPoolId : poolId || 0,
          selectedCollateralType.address,
          amountToDelegate || 0,
          utils.parseEther('1'),
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

    return [...initialCalls, ...stakingCalls];
  }, [
    accountId,
    newAccountId,
    selectedPoolId,
    selectedCollateralType.symbol,
    selectedCollateralType.address,
    stakingPositions,
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
          description: 'Your staked collateral amounts have been updated.',
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
          description: 'Your staked collateral amounts have been updated.',
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
    selectedCollateralType.address,
    amountBN,
    snxProxy?.address,
    {
      onMutate: () => {
        toast({
          title: 'Approve collateral for transfer',
          description: 'The next transaction will create your account and stake this collateral.',
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

  const exec = useCallback(async () => {
    try {
      await approve();
      await multiTxn.exec();
    } catch (error) {}
  }, [approve, multiTxn]);

  const setTransaction = useSetRecoilState(transactionState);

  const updateTransactions = useCallback(() => {
    const transactions: Transaction[] = [];

    if (isNativeCurrency) {
      transactions.push({
        title: 'Wrap ETH',
        subtitle: amountBN.gt(wrapEthBalance?.value || 0)
          ? 'You must wrap your ether before staking.'
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
          ? `Approve unlimited ${selectedCollateralType.symbol.toUpperCase()} transfers to the Synthetix protocol.`
          : undefined,
      });
    }

    transactions.push({
      title: 'Stake ' + selectedCollateralType.symbol.toUpperCase(),
      subtitle: `This will transfer your ${selectedCollateralType.symbol.toUpperCase()} to the Synthetix protocol.`,
      call: async () => await multiTxn.exec(),
    });

    setTransaction({
      transactions,
      isOpen: true,
    });
  }, [
    isNativeCurrency,
    selectedCollateralType.symbol,
    requireApproval,
    setTransaction,
    amountBN,
    wrapEthBalance?.value,
    amount,
    wrap,
    approve,
    multiTxn,
  ]);

  const createAccount = useCallback(
    async (useDialog = true) => {
      if (useDialog) {
        return updateTransactions();
      }
      try {
        setIsLoading(true);
        //  add extra step to convert to wrapped token if native (ex. ETH)
        if (isNativeCurrency) {
          await wrap(amountBN);
        }

        await exec();
      } catch (error) {
        //console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [updateTransactions, isNativeCurrency, exec, wrap, amountBN]
  );

  return {
    createAccount,
    isLoading: isLoading || isWrapping,
    multiTxn,
  };
};
