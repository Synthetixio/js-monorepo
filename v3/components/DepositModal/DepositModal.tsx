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
import { useCallback, useEffect, useMemo } from 'react';
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
import { DepositMachine, ErrorSteps, EventNames, ServiceNames, StateNames } from './DepositMachine';
import { useMachine } from '@xstate/react';

export const DepositModalUi: FC<{
  collateralChange: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  wrapAmount: Wei;
  state: keyof typeof StateNames;
  error: { error: Error; step: keyof typeof ErrorSteps } | null;
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
  infiniteApproval,
  setInfiniteApproval,
  onSubmit,
  requireApproval,
  state,
  error,
}) => {
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
                failed: Boolean(error?.step === ErrorSteps.wrap),
                disabled: collateralType?.symbol !== 'WETH',
                success: wrapAmount.eq(0) || state === StateNames.success,
                loading: state === StateNames.wrap && !error,
              }}
            />
          ) : null}

          <Multistep
            step={stepNumbers.approve}
            title={`Approve ${collateralType?.symbol} transfer`}
            status={{
              failed: Boolean(error?.step === ErrorSteps.approve),
              success: !requireApproval || state === StateNames.success,
              loading: state === StateNames.approve && !error,
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
              failed: Boolean(error?.step === StateNames.deposit),
              disabled: state !== StateNames.success && requireApproval,
              success: state === StateNames.success,
              loading: state === StateNames.deposit && !error,
            }}
          />

          <Button
            disabled={Object.keys(ErrorSteps).includes(state) && !error}
            onClick={onSubmit}
            width="100%"
            my="4"
            data-testid="deposit submit button"
          >
            {(() => {
              switch (true) {
                case Boolean(error):
                  return 'Retry';
                case Object.keys(ErrorSteps).includes(state):
                  return 'Processing...';
                case state === StateNames.success:
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
  const isSuccessOrDeposit = state.matches(StateNames.success) || state.matches(StateNames.deposit);
  useEffect(() => {
    if (isSuccessOrDeposit) {
      // We do this to ensure the success state displays the wrap amount used before deposit
      return;
    }
    send(EventNames.SET_WRAP_AMOUNT, { wrapAmount: wei(wrapAmountString) });
  }, [wrapAmountString, send, isSuccessOrDeposit]);
  useEffect(() => {
    send(EventNames.SET_REQUIRE_APPROVAL, { requireApproval });
  }, [requireApproval, send]);

  const handleClose = useCallback(() => {
    const isSuccess = state.matches(StateNames.success);
    if (isSuccess && params.poolId && collateralType?.symbol) {
      send(EventNames.RESET);
      onClose();
      navigate(
        generatePath('/accounts/:accountId/positions/:collateralType/:poolId', {
          accountId: params.accountId || newAccountId,
          collateralType: collateralType.symbol,
          poolId: params.poolId,
        })
      );
    }
    send(EventNames.RESET);
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
    if (state.matches(StateNames.success)) {
      handleClose();
      return;
    }
    if (state.context.error) {
      send(EventNames.RETRY);
      return;
    }
    send(EventNames.RUN);
  }, [handleClose, send, state]);
  return (
    <DepositModalUi
      collateralChange={collateralChange}
      isOpen={isOpen}
      onClose={onClose}
      collateralType={collateralType}
      wrapAmount={state.context.wrapAmount}
      state={(() => {
        switch (true) {
          case state.matches(StateNames.approve):
            return StateNames.approve;
          case state.matches(StateNames.deposit):
            return StateNames.deposit;
          case state.matches(StateNames.success):
            return StateNames.success;
          case state.matches(StateNames.wrap):
            return StateNames.wrap;
          default:
            return StateNames.idle;
        }
      })()}
      error={state.context.error}
      requireApproval={state.context.requireApproval}
      infiniteApproval={state.context.infiniteApproval}
      setInfiniteApproval={(infiniteApproval) => {
        send(EventNames.SET_INFINITE_APPROVAL, { infiniteApproval });
      }}
      onSubmit={onSubmit}
    />
  );
};
