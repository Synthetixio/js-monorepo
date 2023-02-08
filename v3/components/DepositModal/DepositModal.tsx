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
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { Amount } from '@snx-v3/Amount';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useAccounts } from '@snx-v3/useAccounts';
import { generatePath, useNavigate } from 'react-router-dom';
import { useApprove } from '@snx-v3/useApprove';
import { useWrapEth } from '@snx-v3/useWrapEth';
import { Multistep } from '@snx-v3/Multistep';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useEthBalance } from '@snx-v3/useEthBalance';
import { Wei, wei } from '@synthetixio/wei';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { FC } from 'react';
import { useDeposit } from '@snx-v3/useDeposit';
import { useParams } from '@snx-v3/useParams';

export const DepositModalUi: FC<{
  collateralChange: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  wrapAmount: Wei;
  wrapEthLoading: boolean;
  step: 'idle' | 'wrap' | 'approve' | 'deposit';
  failed: boolean;
  processing: boolean;
  completed: boolean;
  requireApproval: boolean;
  approvalLoading: boolean;
  depositLoading: boolean;
  infiniteApproval: boolean;
  setInfiniteApproval: (x: boolean) => void;
  onSubmit: () => void;
}> = ({
  collateralChange,
  isOpen,
  onClose,
  collateralType,
  wrapAmount,
  wrapEthLoading,
  step,
  failed,
  processing,
  completed,
  requireApproval,
  approvalLoading,
  depositLoading,
  infiniteApproval,
  setInfiniteApproval,
  onSubmit,
}) => {
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
                  <Amount value={collateralChange} suffix={` ${collateralType?.symbol}`} /> from
                  balance will be used.
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
            title={`Approve ${collateralType?.symbol} transfer`}
            status={{
              failed: step === 'approve' && failed,
              success: !requireApproval,
              loading: (step === 'approve' && processing) || approvalLoading,
            }}
            checkboxLabel={`Approve unlimited ${collateralType?.symbol} transfers to Synthetix.`}
            checkboxProps={{
              isChecked: infiniteApproval,
              onChange: (e) => setInfiniteApproval(e.target.checked),
            }}
          />

          <Multistep
            step={3}
            title={`Deposit ${collateralType?.symbol}`}
            subtitle={`This will transfer your ${collateralType?.symbol} to Synthetix.`}
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
            data-testid="deposit confirm button"
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
export type DepositModalProps = FC<{
  collateralChange: Wei;
  isOpen: boolean;
  onClose: () => void;
}>;
export const DepositModal: DepositModalProps = ({ onClose, isOpen, collateralChange }) => {
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [infiniteApproval, setInfiniteApproval] = useState(false);
  const [step, setStep] = useState<'idle' | 'wrap' | 'approve' | 'deposit'>('idle');

  const navigate = useNavigate();
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const ethBalance = useEthBalance();
  const tokenBalance = useTokenBalance(collateralType?.tokenAddress);
  const accounts = useAccounts();
  const { data: liquidityPosition, refetch: refetchLiquidityPosition } = useLiquidityPosition({
    accountId: params.accountId,
    tokenAddress: collateralType?.tokenAddress,
    poolId: params.poolId,
  });
  const { data: CoreProxy } = useCoreProxy();

  const toast = useToast({ isClosable: true, duration: 9000 });
  const newAccountId = useMemo(() => `${Math.floor(Math.random() * 10000000000)}`, []);

  const { exec: wrap, wethBalance, isLoading: wrapEthLoading } = useWrapEth();
  const wrapAmount =
    collateralType?.symbol === 'WETH' && collateralChange.gt(wethBalance || 0)
      ? collateralChange.sub(wethBalance || 0)
      : wei(0);

  const {
    approve,
    requireApproval,
    refetchAllowance,
    isLoading: approvalLoading,
  } = useApprove({
    contractAddress: collateralType?.tokenAddress,
    amount: collateralChange.toBN(),
    spender: CoreProxy?.address,
  });

  const currentCollateral = liquidityPosition?.collateralAmount || wei(0);
  const { exec: execDeposit, isLoading: depositLoading } = useDeposit({
    accountId: params.accountId,
    newAccountId,
    poolId: params.poolId,
    collateralTypeAddress: collateralType?.tokenAddress,
    collateralChange,
    currentCollateral: currentCollateral,
  });
  const handleClose = useCallback(() => {
    setStep('idle');
    setCompleted(false);
    setFailed(false);
    setProcessing(false);
    onClose();
    if (completed && params.poolId && collateralType?.symbol) {
      navigate(
        generatePath('/accounts/:accountId/positions/:collateralType/:poolId', {
          accountId: params.accountId || newAccountId,
          collateralType: collateralType.symbol,
          poolId: params.poolId,
        })
      );
    }
    onClose();
  }, [
    completed,
    params.poolId,
    params.accountId,
    collateralType?.symbol,
    onClose,
    navigate,
    newAccountId,
  ]);

  const onSubmit = useCallback(async () => {
    if (completed) {
      handleClose();
      return;
    }

    setFailed(false);
    setProcessing(true);

    setStep('wrap');
    if (collateralType?.symbol === 'WETH' && wrapAmount.gt(0)) {
      try {
        await wrap(wrapAmount);
      } catch (e) {
        console.error(e);
        setFailed(true);
        setProcessing(false);
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
        toast({
          title: 'Approve collateral for transfer',
          description: params.accountId
            ? 'The next transaction will deposit this collateral.'
            : 'The next transaction will create your account and and deposit this collateral',
          status: 'info',
        });
        await approve(Boolean(infiniteApproval));
        await refetchAllowance();
      } catch (e) {
        console.error(e);
        toast.closeAll();
        toast({ title: 'Approval failed', description: 'Please try again.', status: 'error' });
        setFailed(true);
        setProcessing(false);
        return;
      }
    }

    setStep('deposit');
    try {
      toast.closeAll();
      toast({
        title: Boolean(params.accountId)
          ? 'Depositing your collateral'
          : 'Creating your account and depositing collateral',
        description: '',
      });
      await execDeposit();
      await Promise.all([
        ethBalance.refetch(),
        tokenBalance.refetch(),
        accounts.refetch(),
        Boolean(params.accountId) ? refetchLiquidityPosition() : Promise.resolve(),
      ]);
      toast.closeAll();
      toast({
        title: 'Success',
        description: 'Your deposited collateral amounts have been updated.',
        status: 'success',
        duration: 5000,
      });
    } catch (e) {
      toast({
        title: 'Could not complete account creation',
        description: 'Please try again.',
        status: 'error',
      });
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
    handleClose,
    wrap,
    toast,
    params.accountId,
    approve,
    infiniteApproval,
    refetchAllowance,
    execDeposit,
    ethBalance,
    tokenBalance,
    accounts,
    refetchLiquidityPosition,
  ]);

  return (
    <DepositModalUi
      collateralChange={collateralChange}
      isOpen={isOpen}
      onClose={onClose}
      collateralType={collateralType}
      wrapAmount={wrapAmount}
      wrapEthLoading={wrapEthLoading}
      step={step}
      failed={failed}
      processing={processing}
      completed={completed}
      requireApproval={requireApproval}
      approvalLoading={approvalLoading}
      depositLoading={depositLoading}
      infiniteApproval={infiniteApproval}
      setInfiniteApproval={setInfiniteApproval}
      onSubmit={onSubmit}
    />
  );
};
