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
import React, { FC, useCallback } from 'react';
import { Amount } from '@snx-v3/Amount';
import { useUnWrapEth } from '@snx-v3/useWrapEth';
import { Multistep } from '@snx-v3/Multistep';
import { Wei } from '@synthetixio/wei';
import { useParams } from '@snx-v3/useParams';
import { Events, ServiceNames, State, WithdrawMachine } from './WithdrawMachine';
import { useMachine } from '@xstate/react';
import { useWithdraw } from '@snx-v3/useWithdraw';
import type { StateFrom } from 'xstate';
import { AccountCollateralType, useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { ContractError } from '@snx-v3/ContractError';

export const WithdrawModalUi: FC<{
  amount: Wei;
  isOpen: boolean;
  onClose: () => void;
  accountCollateral?: AccountCollateralType;
  state: StateFrom<typeof WithdrawMachine>;
  error: { error: Error; step: string } | null;
  onSubmit: () => void;
}> = ({ amount, isOpen, onClose, accountCollateral, onSubmit, state, error }) => {
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
                <Amount value={amount} suffix={` ${accountCollateral?.symbol}`} /> will be withdrawn
              </Text>
            }
            status={{
              failed: Boolean(error?.step === State.withdraw),
              disabled: amount.eq(0),
              success: state.matches(State.unwrap) || state.matches(State.success),
              loading: state.matches(State.withdraw) && !error,
            }}
          />
          {accountCollateral?.symbol === 'WETH' ? (
            <Multistep
              step={2}
              title={`Unwrap ${accountCollateral?.symbol}`}
              subtitle="This will unwrap your WETH to ETH"
              status={{
                failed: Boolean(error?.step === State.unwrap),
                disabled: accountCollateral?.symbol !== 'WETH',
                success: state.matches(State.success),
                loading: state.matches(State.unwrap),
              }}
            />
          ) : null}

          <Button
            isDisabled={isProcessing}
            onClick={onSubmit}
            width="100%"
            my="4"
            data-testid="withdraw confirm button"
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

export function WithdrawModal({
  accountCollateral,
  onClose,
  isOpen,
}: {
  accountCollateral: AccountCollateralType;
  isOpen: boolean;
  onClose: () => void;
}) {
  const params = useParams();
  const toast = useToast({ isClosable: true, duration: 9000 });

  const { exec: unwrap } = useUnWrapEth();
  const { exec: execWithdraw } = useWithdraw({
    accountId: params.accountId,
    collateralTypeAddress: accountCollateral?.tokenAddress,
  });

  const { refetch: refetchAccountCollateral } = useAccountCollateral({
    accountId: params.accountId,
  });

  const { data: CoreProxy } = useCoreProxy();
  const errorParserCoreProxy = useContractErrorParser(CoreProxy);

  const [state, send] = useMachine(WithdrawMachine, {
    context: {
      amount: accountCollateral?.availableCollateral,
    },
    services: {
      [ServiceNames.withdraw]: async () => {
        try {
          await execWithdraw();
          await refetchAccountCollateral();
        } catch (error: any) {
          const contractError = errorParserCoreProxy(error);
          if (contractError) {
            console.error(new Error(contractError.name), contractError);
          }
          toast.closeAll();
          toast({
            title: 'Withdraw failed',
            description: contractError ? (
              <ContractError contractError={contractError} />
            ) : (
              'Please try again.'
            ),
            status: 'error',
          });
          throw Error('Withdraw failed', { cause: error });
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
      accountCollateral={accountCollateral}
      state={state}
      error={state.context.error}
      onSubmit={onSubmit}
    />
  );
}
