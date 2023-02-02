import { useToast } from '@chakra-ui/react';
import { useAccounts } from '@snx-v3/useAccounts';
import { useApprove } from '@snx-v3/useApprove';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useDeposit } from '@snx-v3/useDeposit';
import { useEthBalance } from '@snx-v3/useEthBalance';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useParams } from '@snx-v3/useParams';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useWrapEth } from '@snx-v3/useWrapEth';
import Wei, { wei } from '@synthetixio/wei';
import { useMutation } from '@tanstack/react-query';
export const useCombinedDepositMutation = ({
  setStep,
  collateralChange,
  newAccountId,
  wrapAmount,
  infiniteApproval,
}: {
  setStep: (step: 'idle' | 'wrap' | 'approve' | 'deposit') => void;
  collateralChange: Wei;
  infiniteApproval: boolean;
  newAccountId: string;
  wrapAmount: Wei;
}) => {
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const toast = useToast({ isClosable: true, duration: 9000 });
  const { data: CoreProxy } = useCoreProxy();
  const ethBalance = useEthBalance();
  const tokenBalance = useTokenBalance(collateralType?.tokenAddress);
  const accounts = useAccounts();
  const { data: liquidityPosition, refetch: refetchLiquidityPosition } = useLiquidityPosition({
    accountId: params.accountId,
    tokenAddress: collateralType?.tokenAddress,
    poolId: params.poolId,
  });
  const { exec: wrap } = useWrapEth();
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

  return useMutation(async () => {
    setStep('wrap');
    if (collateralType?.symbol === 'WETH' && wrapAmount.gt(0)) {
      try {
        await wrap(wrapAmount);
      } catch (e) {
        console.error(e);
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
        Boolean(params.accountId) ? Promise.resolve() : accounts.refetch(),
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
      return;
    }
  });
};
