import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CallOverrides } from 'ethers';
import { parseUnits } from '@snx-v3/format';
import { useAccounts } from '@snx-v3/useAccounts';
import type { CollateralType } from '@snx-v3/useCollateralTypes';
import { useCallback, useMemo, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { contracts } from '../../../utils/constants';
import { useApprove } from '@snx-v3/useApprove';
import { useContract } from '../../../hooks/useContract';
import { MulticallCall, useMulticall } from '../../../hooks/useMulticall';
import { useWrapEth } from '../../../hooks/useWrapEth';
import { TransactionReview, TransactionStatus } from '@snx-v3/TransactionReview';
import { useTokenBalance } from '../../../hooks/useTokenBalance';

export function DepositModal({
  amount,
  poolId,
  collateralType,
  isOpen,
  setIsOpen,
}: {
  amount: string;
  poolId: string;
  collateralType: CollateralType;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const navigate = useNavigate();
  const params = useParams();

  const accountId = params.accountId;

  const toast = useToast({
    isClosable: true,
    duration: 9000,
  });

  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);

  const amountBN =
    Boolean(amount && collateralType) && Number(amount) > 0 ? parseUnits(amount) : parseUnits(0);

  const { wrap, balance: wrapEthBalance, isLoading: wrapEthLoading } = useWrapEth();

  const newAccountId = useMemo(() => `${Math.floor(Math.random() * 10000000000)}`, []);

  const { data: liquidityPositions } = useLiquidityPositions({ accountId });
  const calls: MulticallCall[] = useMemo(() => {
    if (!collateralType?.tokenAddress || !collateralType?.symbol || !liquidityPositions) {
      return [];
    }
    const id = accountId ?? newAccountId;
    const key = `${poolId}-${collateralType.symbol}` as const;
    const currentLiquidityPosition = liquidityPositions[key];

    const amountToDelegate = Boolean(accountId)
      ? (currentLiquidityPosition?.collateralAmount.toBN() || parseUnits(0)).add(amountBN)
      : amountBN;

    if (!snxProxy) return [];

    const depositingCalls: MulticallCall[] = [
      {
        contract: snxProxy.contract,
        functionName: 'deposit',
        callArgs: [id, collateralType.tokenAddress, amountBN],
      },
      {
        contract: snxProxy.contract,
        functionName: 'delegateCollateral',
        callArgs: [
          id,
          parseInt(Boolean(accountId) ? poolId : poolId || '0'),
          collateralType.tokenAddress,
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
    poolId,
    collateralType.symbol,
    collateralType.tokenAddress,
    liquidityPositions,
    amountBN,
    snxProxy,
  ]);

  const { refetch: balanceRefetch } = useTokenBalance(collateralType?.tokenAddress);
  const { refetch: refetchAccounts } = useAccounts();
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
      await Promise.all([balanceRefetch(), refetchAccounts()]);

      setIsOpen(false);

      if (!Boolean(accountId)) {
        navigate(
          generatePath('/accounts/:accountId/positions/:collateral/:poolId', {
            accountId: newAccountId,
            collateral: collateralType.symbol,
            poolId: poolId,
          })
        );
      } else {
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

  const {
    approve,
    requireApproval,
    isLoading: approvalLoading,
  } = useApprove(
    {
      contractAddress: collateralType?.tokenAddress,
      amount: amountBN,
      spender: snxProxy?.address,
    },
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

  const [skipWrappingEth, setSkipWrappingEth] = useState(false);
  const [infiniteApproval, setInfiniteApproval] = useState(false);
  const [status, setStatus] = useState<TransactionStatus>('idle');

  const onSubmit = useCallback(async () => {
    if (status === 'completed') {
      // Close window
      setIsOpen(false);
      return;
    }

    setStatus('processing');

    // Step 1, maybe wrapping ETH
    if (collateralType?.symbol === 'WETH') {
      try {
        await wrap(amountBN, skipWrappingEth);
      } catch (e) {
        console.error(e);
        setStatus('failed');
        return;
      }
    }

    // Step 2, get token approval
    if (requireApproval) {
      try {
        await approve(Boolean(infiniteApproval));
      } catch (e) {
        console.error(e);
        setStatus('failed');
        return;
      }
    }
    // step 3, deposit collateral
    try {
      await multiTxn.exec();
    } catch (e) {
      console.error(e);
      setStatus('failed');
      return;
    }

    setStatus('completed');
  }, [
    status,
    collateralType?.symbol,
    requireApproval,
    setIsOpen,
    wrap,
    amountBN,
    skipWrappingEth,
    approve,
    infiniteApproval,
    multiTxn,
  ]);

  return (
    <Modal size="lg" isOpen={isOpen} onClose={() => setIsOpen(false)} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>Complete this action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">Please execute the following transactions:</Text>

          <TransactionReview
            step={1}
            title="Wrap ETH"
            subtitle={
              amountBN.gt(wrapEthBalance?.value || 0)
                ? 'You must wrap your ether before depositing.'
                : ''
            }
            status={collateralType?.symbol === 'WETH' ? status : 'completed'}
            checkbox={{
              label: amountBN.gt(wrapEthBalance?.value || 0)
                ? ''
                : `Skip this step and use my existing ${amount} wETH.`,
              isChecked: skipWrappingEth,
              onChange: (e) => setSkipWrappingEth(e.target.checked),
            }}
            isLoading={wrapEthLoading}
          />

          <TransactionReview
            step={2}
            title={`Approve ${collateralType.symbol.toUpperCase()} transfer`}
            status={requireApproval ? status : 'completed'}
            checkbox={{
              label: `Approve unlimited ${collateralType.symbol.toUpperCase()} transfers to Synthetix.`,
              isChecked: infiniteApproval,
              onChange: (e) => setInfiniteApproval(e.target.checked),
            }}
            isLoading={approvalLoading}
          />

          <TransactionReview
            step={3}
            title={`Deposit ${collateralType.symbol.toUpperCase()}`}
            subtitle={`This will transfer your ${collateralType.symbol.toUpperCase()} to Synthetix.`}
            status={requireApproval ? status : 'completed'}
            isLoading={multiTxn.isLoading}
          />

          <Button disabled={status === 'processing'} onClick={onSubmit} width="100%" my="4">
            {status === 'idle' ? 'Start' : null}
            {status === 'completed' ? 'Done' : null}
            {status === 'failed' ? 'Retry' : null}
            {status === 'processing' ? 'Processing...' : null}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
