import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { Amount } from '@snx-v3/Amount';
import { generatePath, useNavigate } from 'react-router-dom';
import { Multistep } from '@snx-v3/Multistep';
import { Wei, wei } from '@synthetixio/wei';
import { FC } from 'react';
import { useParams } from '@snx-v3/useParams';
import { useCombinedDepositMutation } from './useCombinedDepositMutation';
import { useApprove } from '@snx-v3/useApprove';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useWrapEth } from '@snx-v3/useWrapEth';

export const DepositModalUi: FC<{
  collateralChange: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  wrapAmount: Wei;
  step: 'idle' | 'wrap' | 'approve' | 'deposit';
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  requireApproval: boolean;
  infiniteApproval: boolean;
  setInfiniteApproval: (x: boolean) => void;
  onSubmit: () => void;
}> = ({
  collateralChange,
  isOpen,
  onClose,
  collateralType,
  wrapAmount,
  isSuccess,
  step,
  error,
  isLoading,
  requireApproval,
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
              isSuccess ? (
                ''
              ) : wrapAmount.eq(0) ? (
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
              failed: step === 'wrap' && Boolean(error),
              disabled: collateralType?.symbol !== 'WETH',
              success: isSuccess || wrapAmount.eq(0),
              loading: step === 'wrap' && isLoading,
            }}
          />

          <Multistep
            step={2}
            title={`Approve ${collateralType?.symbol} transfer`}
            status={{
              failed: step === 'approve' && Boolean(error),
              success: !requireApproval,
              loading: step === 'approve' && isLoading,
            }}
            checkboxLabel={
              isSuccess
                ? undefined
                : `Approve unlimited ${collateralType?.symbol} transfers to Synthetix.`
            }
            checkboxProps={{
              isChecked: infiniteApproval,
              onChange: (e) => setInfiniteApproval(e.target.checked),
            }}
          />

          <Multistep
            step={3}
            title={`Deposit ${collateralType?.symbol}`}
            subtitle={
              isSuccess ? (
                <Text>
                  <Amount value={collateralChange} suffix={` ${collateralType?.symbol}`} />{' '}
                  deposited
                </Text>
              ) : (
                `This will transfer your ${collateralType?.symbol} to Synthetix.`
              )
            }
            status={{
              failed: step === 'deposit' && Boolean(error),
              disabled: requireApproval,
              success: isSuccess,
              loading: step === 'deposit' && isLoading,
            }}
          />

          <Button
            disabled={isLoading}
            onClick={onSubmit}
            width="100%"
            my="4"
            data-testid="deposit submit button"
          >
            {(() => {
              switch (true) {
                case Boolean(error):
                  return 'Retry';
                case isLoading:
                  return 'Processing...';
                case isSuccess:
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
  const [infiniteApproval, setInfiniteApproval] = useState(false);
  const [step, setStep] = useState<'idle' | 'wrap' | 'approve' | 'deposit'>('idle');
  const { data: CoreProxy } = useCoreProxy();
  const navigate = useNavigate();
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const newAccountId = useMemo(() => `${Math.floor(Math.random() * 10000000000)}`, []);
  const { wethBalance } = useWrapEth();

  const wrapAmount =
    collateralType?.symbol === 'WETH' && collateralChange.gt(wethBalance || 0)
      ? collateralChange.sub(wethBalance || 0)
      : wei(0);
  const { requireApproval } = useApprove({
    contractAddress: collateralType?.tokenAddress,
    amount: collateralChange.toBN(),
    spender: CoreProxy?.address,
  });
  const { isSuccess, mutate, error, isLoading } = useCombinedDepositMutation({
    setStep,
    collateralChange,
    newAccountId,
    infiniteApproval,
    wrapAmount,
  });

  const handleClose = useCallback(() => {
    if (isSuccess && params.poolId && collateralType?.symbol) {
      navigate(
        generatePath('/accounts/:accountId/positions/:collateralType/:poolId', {
          accountId: params.accountId || newAccountId,
          collateralType: collateralType.symbol,
          poolId: params.poolId,
        })
      );
    }
    setStep('idle');
    onClose();
  }, [
    collateralType?.symbol,
    isSuccess,
    navigate,
    newAccountId,
    onClose,
    params.accountId,
    params.poolId,
  ]);

  const onSubmit = useCallback(async () => {
    if (isSuccess) {
      handleClose();
      return;
    }

    mutate();
  }, [handleClose, isSuccess, mutate]);

  return (
    <DepositModalUi
      collateralChange={collateralChange}
      isOpen={isOpen}
      onClose={onClose}
      collateralType={collateralType}
      wrapAmount={wrapAmount}
      step={step}
      requireApproval={requireApproval}
      infiniteApproval={infiniteApproval}
      setInfiniteApproval={setInfiniteApproval}
      onSubmit={onSubmit}
      isSuccess={isSuccess}
      isLoading={isLoading}
      error={error as Error | null}
    />
  );
};
