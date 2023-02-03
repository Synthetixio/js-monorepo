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
import { DepositMachine } from './DepositMachine';
import { useMachine } from '@xstate/react';

export const DepositModalUi: FC<{
  collateralChange: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  wrapAmount: Wei;
  state: string;
  error: Error | null;
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
              failed: state === 'wrap' && Boolean(error),
              disabled: collateralType?.symbol !== 'WETH',
              success: wrapAmount.eq(0),
              loading: state === 'wrap' && !error,
            }}
          />

          <Multistep
            step={2}
            title={`Approve ${collateralType?.symbol} transfer`}
            status={{
              failed: state === 'approve' && Boolean(error),
              success: !requireApproval,
              loading: state === 'approve' && !error,
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
              failed: state === 'deposit' && Boolean(error),
              disabled: requireApproval,
              success: state === 'success',
              loading: state === 'deposit' && !error,
            }}
          />

          <Button
            disabled={['wrap', 'approve', 'deposit'].includes(state) && !error}
            onClick={onSubmit}
            width="100%"
            my="4"
            data-testid="deposit submit button"
          >
            {(() => {
              switch (true) {
                case Boolean(error):
                  return 'Retry';
                case ['wrap', 'approve', 'deposit'].includes(state):
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
export type DepositModalProps = FC<{
  collateralChange: Wei;
  isOpen: boolean;
  onClose: () => void;
}>;
export const DepositModal: DepositModalProps = ({ onClose, isOpen, collateralChange }) => {
  const [state, send] = useMachine(DepositMachine);

  const [infiniteApproval, setInfiniteApproval] = useState(false);
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

  const { exec: wrap, wethBalance } = useWrapEth();
  const wrapAmount =
    collateralType?.symbol === 'WETH' && collateralChange.gt(wethBalance || 0)
      ? collateralChange.sub(wethBalance || 0)
      : wei(0);
  const { approve, requireApproval, refetchAllowance } = useApprove({
    contractAddress: collateralType?.tokenAddress,
    amount: collateralChange.toBN(),
    spender: CoreProxy?.address,
  });

  const currentCollateral = liquidityPosition?.collateralAmount || wei(0);
  const { exec: execDeposit } = useDeposit({
    accountId: params.accountId,
    newAccountId,
    poolId: params.poolId,
    collateralTypeAddress: collateralType?.tokenAddress,
    collateralChange,
    currentCollateral: currentCollateral,
  });
  const handleClose = useCallback(() => {
    const isSuccess = state.matches('success');

    if (isSuccess && params.poolId && collateralType?.symbol) {
      send('RESET');
      onClose();
      navigate(
        generatePath('/accounts/:accountId/positions/:collateralType/:poolId', {
          accountId: params.accountId || newAccountId,
          collateralType: collateralType.symbol,
          poolId: params.poolId,
        })
      );
    }
    send('RESET');
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
    if (state.matches('success')) {
      handleClose();
      return;
    }

    send('WRAP');
    if (collateralType?.symbol === 'WETH' && wrapAmount.gt(0)) {
      try {
        await wrap(wrapAmount);
      } catch (e) {
        console.error(e);
        send('FAILURE', { error: e });
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
    send('APPROVE');
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
        send('FAILURE');
        toast.closeAll();
        toast({ title: 'Approval failed', description: 'Please try again.', status: 'error' });
        return;
      }
    }

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
      send('FAILURE');
      return;
    }
    send('SUCCESS');
  }, [
    state,
    send,
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
      state={(() => {
        switch (true) {
          case state.matches('approve'):
            return 'approve';
          case state.matches('deposit'):
            return 'Deposit';
          case state.matches('success'):
            return 'success';
          case state.matches('wrap'):
            return 'wrap';
          default:
            return 'idle';
        }
      })()}
      error={state.context.error}
      requireApproval={requireApproval}
      infiniteApproval={infiniteApproval}
      setInfiniteApproval={setInfiniteApproval}
      onSubmit={onSubmit}
    />
  );
};
