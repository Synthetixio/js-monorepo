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
import { useCallback, useMemo, useState } from 'react';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { Amount } from '@snx-v3/Amount';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useAccounts } from '@snx-v3/useAccounts';
import { generatePath, useNavigate } from 'react-router-dom';
import { useApprove } from '@snx-v3/useApprove';
import { useWrapEth } from '../../../hooks/useWrapEth';
import { Multistep } from '@snx-v3/Multistep';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useEthBalance } from '@snx-v3/useEthBalance';
import { Wei, wei } from '@synthetixio/wei';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { FC } from 'react';
import { useDeposit } from '@snx-v3/useDeposit';

export type DepositModalProps = FC<{
  accountId?: string;
  amount: Wei;
  poolId: string;
  collateralType: CollateralType;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>;

export const DepositModal: DepositModalProps = ({
  accountId,
  amount,
  poolId,
  collateralType,
  isOpen,
  setIsOpen,
}) => {
  const navigate = useNavigate();
  const { data: CoreProxy } = useCoreProxy();
  const toast = useToast({
    isClosable: true,
    duration: 9000,
  });

  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [failed, setFailed] = useState(false);

  const { wrap, balance: wrapEthBalance, isLoading: wrapEthLoading } = useWrapEth();
  const wrapAmount =
    collateralType?.symbol === 'WETH' && amount.gt(wrapEthBalance?.value || 0)
      ? amount.sub(wrapEthBalance?.value || 0)
      : wei(0);

  const newAccountId = useMemo(() => `${Math.floor(Math.random() * 10000000000)}`, []);

  const { data: liquidityPosition, refetch: refetchLiquidityPosition } = useLiquidityPosition({
    accountId,
    tokenAddress: collateralType.tokenAddress,
    poolId: poolId,
  });

  const ethBalance = useEthBalance();
  const tokenBalance = useTokenBalance(collateralType.tokenAddress);
  const accounts = useAccounts();

  const {
    approve,
    requireApproval,
    refetchAllowance,
    isLoading: approvalLoading,
  } = useApprove(
    {
      contractAddress: collateralType?.tokenAddress,
      amount: amount.toBN(),
      spender: CoreProxy?.address,
    },
    {
      onMutate: () => {
        toast({
          title: 'Approve collateral for transfer',
          description: accountId
            ? 'The next transaction will deposit this collateral.'
            : 'The next transaction will create your account and and deposit this collateral',
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

  const [infiniteApproval, setInfiniteApproval] = useState(false);
  const [step, setStep] = useState<'idle' | 'wrap' | 'approve' | 'deposit'>('idle');
  const currentCollateral = liquidityPosition?.collateralAmount || wei(0);
  const { exec: execDeposit, isLoading: depositLoading } = useDeposit(
    {
      accountId,
      newAccountId,
      poolId: poolId,
      collateralTypeAddress: collateralType.tokenAddress,
      collateralChange: amount,
      currentCollateral: currentCollateral,
    },
    {
      onMutate: () => {
        toast.closeAll();

        toast({
          title: Boolean(accountId)
            ? 'Depositing your collateral'
            : 'Creating your account and depositing collateral',
          description: '',
          status: 'info',
          isClosable: true,
          duration: 9000,
        });
      },
      onSuccess: async () => {
        toast.closeAll();
        await Promise.all([
          ethBalance.refetch(),
          tokenBalance.refetch(),
          accounts.refetch(),
          Boolean(accountId) ? refetchLiquidityPosition() : Promise.resolve(),
        ]);
        toast({
          title: 'Success',
          description: 'Your deposited collateral amounts have been updated.',
          status: 'success',
          duration: 5000,
        });
      },
      onError: () => {
        toast({
          title: 'Could not complete account creation',
          description: 'Please try again.',
          status: 'error',
        });
      },
    }
  );
  const onClose = useCallback(() => {
    if (completed) {
      navigate(
        generatePath('/accounts/:accountId/positions/:collateralType/:poolId', {
          accountId: newAccountId,
          collateralType: collateralType.symbol,
          poolId: poolId,
        })
      );
    }
    setStep('idle');
    setCompleted(false);
    setFailed(false);
    setProcessing(false);
    setIsOpen(false);
  }, [collateralType.symbol, completed, navigate, newAccountId, poolId, setIsOpen]);

  const onSubmit = useCallback(async () => {
    if (completed) {
      onClose();
      return;
    }

    setFailed(false);
    setProcessing(true);

    setStep('wrap');
    if (collateralType?.symbol === 'WETH' && wrapAmount.gt(0)) {
      try {
        await wrap(wrapAmount.toBN());
      } catch (e) {
        console.error(e);
        setFailed(true);
        toast.closeAll();
        toast({
          title: 'Wrapping ETH failed',
          description: 'Please try again.',
          status: 'error',
        });
        return;
      }
    }

    // Step 2, get token approval
    setStep('approve');
    if (requireApproval) {
      try {
        await approve(Boolean(infiniteApproval));
        await refetchAllowance();
      } catch (e) {
        console.error(e);
        setFailed(true);
        setProcessing(false);
        return;
      }
    }

    setStep('deposit');
    try {
      await execDeposit();
    } catch (e) {
      console.error(e);
      setFailed(true);
      setProcessing(false);
      return;
    }

    setProcessing(false);
    setCompleted(true);
  }, [
    completed,
    collateralType?.symbol,
    wrapAmount,
    requireApproval,
    onClose,
    wrap,
    toast,
    approve,
    infiniteApproval,
    refetchAllowance,
    execDeposit,
  ]);

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white" data-testid="deposit modal">
        <ModalHeader>Complete this action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">Please execute the following transactions:</Text>

          <Multistep
            step={1}
            title="Wrap"
            subtitle={
              wrapAmount.eq(0) ? (
                <Text as="div">
                  <Amount value={amount} suffix={` ${collateralType.symbol}`} /> from balance will
                  be used.
                </Text>
              ) : (
                <Text as="div">
                  You must wrap additional <Amount value={wrapAmount} suffix=" ETH" /> before
                  depositing.
                </Text>
              )
            }
            status={{
              failed: step === 'wrap' && failed,
              disabled: collateralType?.symbol !== 'WETH',
              success: wrapAmount.eq(0),
              loading: (step === 'wrap' && processing) || wrapEthLoading,
            }}
          />

          <Multistep
            step={2}
            title={`Approve ${collateralType.symbol} transfer`}
            status={{
              failed: step === 'approve' && failed,
              success: !requireApproval,
              loading: (step === 'approve' && processing) || approvalLoading,
            }}
            checkboxLabel={`Approve unlimited ${collateralType.symbol} transfers to Synthetix.`}
            checkboxProps={{
              isChecked: infiniteApproval,
              onChange: (e) => setInfiniteApproval(e.target.checked),
            }}
          />

          <Multistep
            step={3}
            title={`Deposit ${collateralType.symbol}`}
            subtitle={`This will transfer your ${collateralType.symbol} to Synthetix.`}
            status={{
              failed: step === 'deposit' && failed,
              disabled: requireApproval,
              success: completed,
              loading: (step === 'deposit' && processing) || depositLoading,
            }}
          />

          <Button
            disabled={processing}
            onClick={onSubmit}
            width="100%"
            my="4"
            data-testid="deposit submit button"
          >
            {(() => {
              switch (true) {
                case failed:
                  return 'Retry';
                case processing:
                  return 'Processing...';
                case completed:
                  return 'Done';
                default:
                  return 'Start';
              }
            })()}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
