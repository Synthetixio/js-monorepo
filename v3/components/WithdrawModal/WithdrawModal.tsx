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
import { useCallback, useContext, useEffect } from 'react';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { Amount } from '@snx-v3/Amount';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useUnWrapEth } from '@snx-v3/useWrapEth';
import { Multistep } from '@snx-v3/Multistep';
import { Wei, wei } from '@synthetixio/wei';
import { FC } from 'react';
import { useParams } from '@snx-v3/useParams';
import { WithdrawMachine } from './WithdrawMachine';
import { useMachine } from '@xstate/react';
import { useWithdraw } from '@snx-v3/useWithdraw';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';

export const WithdrawModalUi: FC<{
  amount: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  state: string;
  error: { error: Error; step: string } | null;
  onSubmit: () => void;
}> = ({ amount, isOpen, onClose, collateralType, onSubmit, state, error }) => {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white" data-testid="withdraw modal">
        <ModalHeader>Complete this action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">Please execute the following transactions:</Text>

          <Multistep
            step={1}
            title="Withdraw"
            subtitle={
              <Text as="div">
                <Amount value={amount} suffix={` ${collateralType?.symbol}`} /> will be withdrawn
              </Text>
            }
            status={{
              failed: Boolean(error?.step === 'withdraw'),
              disabled: amount.eq(0),
              success: state === 'unwrap',
              loading: state === 'withdraw' && !error,
            }}
          />

          <Multistep
            step={2}
            title={`Unwrap ${collateralType?.symbol}`}
            subtitle="This will unwrap your WETH to ETH"
            status={{
              failed: Boolean(error?.step === 'unwrap'),
              disabled: collateralType?.symbol !== 'WETH',
              success: state === 'success',
              loading: state === 'unwrap' && !error,
            }}
          />

          <Button
            disabled={['unwrap', 'withdraw'].includes(state) && !error}
            onClick={onSubmit}
            width="100%"
            my="4"
            data-testid="withdraw submit button"
          >
            {(() => {
              switch (true) {
                case Boolean(error):
                  return 'Retry';
                case ['unwrap', 'withdraw'].includes(state):
                  return 'Processing...';
                case state === 'success':
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
export type WithdrawModalProps = FC<{
  isOpen: boolean;
  onClose: () => void;
}>;
export const WithdrawModal: WithdrawModalProps = ({ onClose, isOpen }) => {
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const { collateralChange } = useContext(ManagePositionContext);
  const { data: liquidityPosition, refetch: refetchLiquidityPosition } = useLiquidityPosition({
    accountId: params.accountId,
    tokenAddress: collateralType?.tokenAddress,
    poolId: params.poolId,
  });
  const toast = useToast({ isClosable: true, duration: 9000 });

  const { exec: unwrap } = useUnWrapEth();
  const currentCollateral = liquidityPosition?.collateralAmount || wei(0);
  const { exec: execWithdraw } = useWithdraw({
    accountId: params.accountId,
    poolId: params.poolId,
    collateralTypeAddress: collateralType?.tokenAddress,
    collateralChange,
    currentCollateral: currentCollateral,
  });
  const [state, send] = useMachine(WithdrawMachine, {
    context: {
      amount: collateralChange.abs(),
    },
    services: {
      withdraw: async () => {
        try {
          await execWithdraw();
          await refetchLiquidityPosition();
        } catch (error) {
          toast.closeAll();
          toast({
            title: 'Withdraw failed',
            description: 'Please try again.',
            status: 'error',
          });
          throw Error('Wrapping failed', { cause: error });
        }
      },
      unwrap: async () => {
        try {
          toast({
            title: 'Unwrap',
            description:
              collateralType?.symbol === 'WETH' ? 'Unwrapping WETH to ETH.' : 'No unwrap needed',
            status: 'info',
          });

          await unwrap(state.context.amount);
        } catch (e) {
          toast.closeAll();
          toast({ title: 'Unwrap failed', description: 'Please try again.', status: 'error' });
          throw Error('Unwrap failed', { cause: e });
        }
      },
    },
  });
  const collateralChangeString = collateralChange.toString();
  useEffect(() => {
    send('SET_AMOUNT', { amount: wei(collateralChangeString).abs() });
  }, [collateralChangeString, send]);

  const handleClose = useCallback(() => {
    const isSuccess = state.matches('success');
    if (isSuccess && params.poolId && collateralType?.symbol) {
      send('RESET');
      onClose();
    }
    send('RESET');
    onClose();
  }, [send, onClose, state, params.poolId, collateralType?.symbol]);

  const onSubmit = useCallback(async () => {
    if (state.matches('success')) {
      handleClose();
      return;
    }
    if (state.context.error) {
      // I couldn't figure out a nice retry pattern..
      send('RETRY');
      return;
    }
    send('RUN');
  }, [handleClose, send, state]);

  return (
    <WithdrawModalUi
      amount={state.context.amount}
      isOpen={isOpen}
      onClose={onClose}
      collateralType={collateralType}
      state={(() => {
        switch (true) {
          case state.matches('unwrap'):
            return 'unwrap';
          case state.matches('withdraw'):
            return 'withdraw';
          case state.matches('success'):
            return 'success';
          default:
            return 'idle';
        }
      })()}
      error={state.context.error}
      onSubmit={onSubmit}
    />
  );
};
