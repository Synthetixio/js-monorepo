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
import { WithdrawMachine, State, Events, ServiceNames } from './WithdrawMachine';
import { useMachine } from '@xstate/react';
import { useWithdraw } from '@snx-v3/useWithdraw';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import type { StateFrom } from 'xstate';

export const WithdrawModalUi: FC<{
  amount: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  state: StateFrom<typeof WithdrawMachine>;
  error: { error: Error; step: string } | null;
  onSubmit: () => void;
}> = ({ amount, isOpen, onClose, collateralType, onSubmit, state, error }) => {
  const isProcessing = state.matches(State.withdraw) || state.matches(State.unwrap);
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
              failed: Boolean(error?.step === State.withdraw),
              disabled: amount.eq(0),
              success: state.matches(State.unwrap) || state.matches(State.success),
              loading: state.matches(State.withdraw) && !error,
            }}
          />
          {collateralType?.symbol === 'WETH' ? (
            <Multistep
              step={2}
              title={`Unwrap ${collateralType?.symbol}`}
              subtitle="This will unwrap your WETH to ETH"
              status={{
                failed: Boolean(error?.step === State.unwrap),
                disabled: collateralType?.symbol !== 'WETH',
                success: state.matches(State.success),
                loading: state.matches(State.unwrap),
              }}
            />
          ) : null}

          <Button
            disabled={isProcessing}
            onClick={onSubmit}
            width="100%"
            my="4"
            data-testid="withdraw submit button"
          >
            {(() => {
              switch (true) {
                case Boolean(error):
                  return 'Retry';
                case isProcessing:
                  return 'Processing...';
                case state.matches(State.success):
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
      [ServiceNames.withdraw]: async () => {
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
      [ServiceNames.unwrap]: async () => {
        try {
          toast({
            title: 'Unwrap',
            description: 'Unwrapping WETH to ETH.',
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
    send(Events.SET_AMOUNT, { amount: wei(collateralChangeString).abs() });
  }, [collateralChangeString, send]);

  useEffect(() => {
    send(Events.SET_COLLATERAL_SYMBOL, { symbol: wei(collateralChangeString).abs() });
  }, [collateralChangeString, send]);

  const onSubmit = useCallback(async () => {
    if (state.matches(State.success)) {
      send(Events.RESET);
      onClose();
      return;
    }
    if (state.context.error) {
      send(Events.RETRY);
      return;
    }
    send(Events.RUN);
  }, [onClose, send, state]);

  return (
    <WithdrawModalUi
      amount={state.context.amount}
      isOpen={isOpen}
      onClose={onClose}
      collateralType={collateralType}
      state={state}
      error={state.context.error}
      onSubmit={onSubmit}
    />
  );
};
