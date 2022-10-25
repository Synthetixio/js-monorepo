import { useToast } from '@chakra-ui/react';
import { BigNumber, CallOverrides, ethers, utils } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Transaction } from '../components/shared/TransactionReview/TransactionReview.types';
import { contracts, getChainById } from '../utils/constants';
import { accountsState, chainIdState } from '../utils/state';
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
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const [{ refetchAccounts }] = useRecoilState(accountsState);

  const amountBN =
    Boolean(amount) && Number(amount) > 0
      ? ethers.utils.parseUnits(amount, selectedCollateralType.decimals)
      : BigNumber.from(0);

  const { wrap, isLoading: isWrapping } = useWrapEth();

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
      toast({
        title: 'Create your account',
        description: "You'll be redirected once your account is created.",
        status: 'info',
        isClosable: true,
        duration: 9000,
      });
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

  const createAccount = useCallback(async () => {
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
  }, [exec, isNativeCurrency, amountBN, wrap]);

  const updateTransactions = useCallback(() => {
    const calls: Transaction[] = [];

    if (isNativeCurrency) {
      calls.push({
        title: 'Wrap ETH',
        subtitle: 'you need to wrap your ether',
        call: async () => await wrap(amountBN),
      });
    }

    if (requireApproval) {
      calls.push({
        title: 'Approve ' + selectedCollateralType.symbol,
        subtitle: 'This step is a approval',
        call: async () => await approve(),
      });
    }

    calls.push({
      title: 'Stake ' + selectedCollateralType.symbol,
      subtitle: 'this step is a multicall',
      call: async () => await multiTxn.exec(),
    });

    setTransactions(calls);
  }, [
    amountBN,
    approve,
    isNativeCurrency,
    multiTxn,
    requireApproval,
    selectedCollateralType.symbol,
    wrap,
  ]);

  return {
    createAccount,
    updateTransactions,
    transactions,
    isLoading: isLoading || isWrapping,
    multiTxn,
  };
};
