import { Button } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { FC } from 'react';
import { RewardsTransactionModal } from './RewardsTransactionModal';
import { useNavigate } from 'react-router-dom';
import { useClaimRewardsMutation } from '@snx-v2/useClaimRewardsMutation';
import { useQueryClient } from '@tanstack/react-query';

export const ClaimRewardsBtn: FC<{
  amountSNX?: number;
  variant: string;
}> = ({ amountSNX, variant }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const haveSomethingToClaim = Boolean(amountSNX);
  const canClaim = haveSomethingToClaim && variant === 'success';
  const {
    mutate,
    modalOpen,
    txnStatus,
    error,
    gasError,
    settle,
    isGasEnabledAndNotFetched,
    txnHash,
  } = useClaimRewardsMutation(canClaim);

  const handleSubmit = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.refetchQueries(['useRewardsAvailable'], { type: 'active' });
      },
    });
  };

  return (
    <>
      <Button
        data-testid="claim rewards button"
        variant={variant !== 'success' ? variant : 'solid'}
        isDisabled={
          variant !== 'success' ? false : Boolean(!canClaim || isGasEnabledAndNotFetched || error)
        }
        w={['100%', '100%', '100%', '80px']}
        fontFamily="heading"
        fontSize="14px"
        fontWeight="700"
        ml={[6, 6, 6, 4]}
        onClick={() => {
          variant === 'success' ? handleSubmit() : navigate('/staking/burn');
        }}
        color="black"
      >
        {variant === 'success' ? 'Claim' : 'Maintain'}
      </Button>
      <RewardsTransactionModal
        txnHash={txnHash}
        settle={settle}
        error={error}
        gasError={gasError}
        onClose={() => {
          settle();
        }}
        onSubmit={handleSubmit}
        txnStatus={txnStatus}
        modalOpen={modalOpen}
        amountSNX={formatNumber(amountSNX || 0)}
      />
    </>
  );
};
