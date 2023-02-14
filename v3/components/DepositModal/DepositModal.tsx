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
import { FC, useCallback, useEffect, useMemo } from 'react';
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
import { useDeposit } from '@snx-v3/useDeposit';
import { useParams } from '@snx-v3/useParams';
import { DepositMachine, Events, ServiceNames, State } from './DepositMachine';
import { useMachine } from '@xstate/react';
import type { StateFrom } from 'xstate';

export const DepositModalUi: FC<{
  collateralChange: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  state: StateFrom<typeof DepositMachine>;
  setInfiniteApproval: (x: boolean) => void;
  onSubmit: () => void;
}> = ({
  collateralChange,
  isOpen,
  onClose,
  collateralType,
  setInfiniteApproval,
  onSubmit,
  state,
}) => {
  const wrapAmount = state.context.wrapAmount;
  const infiniteApproval = state.context.infiniteApproval;
  const requireApproval = state.context.requireApproval;
  const error = state.context.error;
  const isProcessing =
    state.matches(State.approve) || state.matches(State.deposit) || state.matches(State.wrap);

  const isWETH = collateralType?.symbol === 'WETH';
  const stepNumbers = {
    wrap: isWETH ? 1 : 0,
    approve: isWETH ? 2 : 1,
    deposit: isWETH ? 3 : 2,
  };
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white" data-testid="deposit modal">
        <ModalHeader>Complete this action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">Please execute the following transactions:</Text>
          {isWETH ? (
            <Multistep
              step={stepNumbers.wrap}
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
                failed: error?.step === State.wrap,
                disabled: collateralType?.symbol !== 'WETH',
                success: wrapAmount.eq(0) || state.matches(State.success),
                loading: state.matches(State.wrap) && !error,
              }}
            />
          ) : null}

          <Multistep
            step={stepNumbers.approve}
            title={`Approve ${collateralType?.symbol} transfer`}
            status={{
              failed: error?.step === State.approve,
              success: !requireApproval || state.matches(State.success),
              loading: state.matches(State.approve) && !error,
            }}
            checkboxLabel={`Approve unlimited ${collateralType?.symbol} transfers to Synthetix.`}
            checkboxProps={{
              isChecked: infiniteApproval,
              onChange: (e) => setInfiniteApproval(e.target.checked),
            }}
          />

          <Multistep
            step={stepNumbers.deposit}
            title={`Deposit ${collateralType?.symbol}`}
            subtitle={`This will transfer your ${collateralType?.symbol} to Synthetix.`}
            status={{
              failed: error?.step === State.deposit,
              disabled: state.matches(State.success) && requireApproval,
              success: state.matches(State.success),
              loading: state.matches(State.deposit) && !error,
            }}
          />

          <Button
            isDisabled={isProcessing}
            onClick={onSubmit}
            width="100%"
            my="4"
            data-testid="deposit confirm button"
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
export type DepositModalProps = FC<{
  collateralChange: Wei;
  isOpen: boolean;
  onClose: () => void;
}>;
export const DepositModal: DepositModalProps = ({ onClose, isOpen, collateralChange }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: CoreProxy } = useCoreProxy();
  const collateralType = useCollateralType(params.collateralSymbol);
  const { approve, requireApproval, refetchAllowance } = useApprove({
    contractAddress: collateralType?.tokenAddress,
    amount: collateralChange.toBN(),
    spender: CoreProxy?.address,
  });

  const ethBalance = useEthBalance();
  const tokenBalance = useTokenBalance(collateralType?.tokenAddress);
  const accounts = useAccounts();
  const { data: liquidityPosition, refetch: refetchLiquidityPosition } = useLiquidityPosition({
    accountId: params.accountId,
    tokenAddress: collateralType?.tokenAddress,
    poolId: params.poolId,
  });
  const toast = useToast({ isClosable: true, duration: 9000 });
  const newAccountId = useMemo(() => `${Math.floor(Math.random() * 10000000000)}`, []);

  const { exec: wrapEth, wethBalance } = useWrapEth();
  const wrapAmount =
    collateralType?.symbol === 'WETH' && collateralChange.gt(wethBalance || 0)
      ? collateralChange.sub(wethBalance || 0)
      : wei(0);
  const currentCollateral = liquidityPosition?.collateralAmount || wei(0);
  const { exec: execDeposit } = useDeposit({
    accountId: params.accountId,
    newAccountId,
    poolId: params.poolId,
    collateralTypeAddress: collateralType?.tokenAddress,
    collateralChange,
    currentCollateral: currentCollateral,
  });
  const [state, send] = useMachine(DepositMachine, {
    services: {
      [ServiceNames.wrapEth]: async () => {
        try {
          await wrapEth(state.context.wrapAmount);
        } catch (error) {
          toast.closeAll();
          toast({
            title: 'Wrapping ETH failed',
            description: 'Please try again.',
            status: 'error',
          });
          throw Error('Wrapping failed', { cause: error });
        }
      },
      [ServiceNames.approveWETH]: async () => {
        try {
          toast({
            title: 'Approve collateral for transfer',
            description: params.accountId
              ? 'The next transaction will deposit this collateral.'
              : 'The next transaction will create your account and and deposit this collateral',
            status: 'info',
          });

          await approve(Boolean(state.context.infiniteApproval));
          await refetchAllowance();
        } catch (e) {
          toast.closeAll();
          toast({ title: 'Approval failed', description: 'Please try again.', status: 'error' });
          throw Error('Approve failed', { cause: e });
        }
      },
      [ServiceNames.executeDeposit]: async () => {
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
            refetchAllowance(),
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
          throw Error('Deposit failed', { cause: e });
        }
      },
    },
  });
  const wrapAmountString = wrapAmount.toString();
  const isSuccessOrDeposit = state.matches(State.success) || state.matches(State.deposit);
  useEffect(() => {
    if (isSuccessOrDeposit) {
      // We do this to ensure the success state displays the wrap amount used before deposit
      return;
    }
    send(Events.SET_WRAP_AMOUNT, { wrapAmount: wei(wrapAmountString) });
  }, [wrapAmountString, send, isSuccessOrDeposit]);
  useEffect(() => {
    send(Events.SET_REQUIRE_APPROVAL, { requireApproval });
  }, [requireApproval, send]);

  const handleClose = useCallback(() => {
    const isSuccess = state.matches(State.success);
    if (isSuccess && params.poolId && collateralType?.symbol) {
      send(Events.RESET);
      onClose();
      navigate(
        generatePath('/accounts/:accountId/positions/:collateralType/:poolId', {
          accountId: params.accountId || newAccountId,
          collateralType: collateralType.symbol,
          poolId: params.poolId,
        })
      );
    }
    send(Events.RESET);
    onClose();
  }, [
    send,
    onClose,
    state,
    params.poolId,
    params.accountId,
    collateralType?.symbol,
    navigate,
    newAccountId,
  ]);

  const onSubmit = useCallback(async () => {
    if (state.matches(State.success)) {
      handleClose();
      return;
    }
    if (state.context.error) {
      send(Events.RETRY);
      return;
    }
    send(Events.RUN);
  }, [handleClose, send, state]);
  return (
    <DepositModalUi
      collateralChange={collateralChange}
      isOpen={isOpen}
      onClose={onClose}
      collateralType={collateralType}
      state={state}
      setInfiniteApproval={(infiniteApproval) => {
        send(Events.SET_INFINITE_APPROVAL, { infiniteApproval });
      }}
      onSubmit={onSubmit}
    />
  );
};
