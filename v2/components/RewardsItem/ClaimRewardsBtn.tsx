import { Button } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { FC } from 'react';
import { RewardsTransactionModal } from './RewardsTransactionModal';
import { useNavigate } from 'react-router-dom';
import { useClaimRewardsMutation } from '@snx-v2/useClaimRewardsMutation';
import { useQueryClient } from '@tanstack/react-query';

export const ClaimRewardsBtn: FC<{
  amountSNX?: number;
  amountsUSD?: number;
  variant: string;
}> = ({ amountSNX, amountsUSD, variant }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    mutate,
    modalOpen,
    txnStatus,
    error,
    gasError,
    settle,
    isGasEnabledAndNotFetched,
    txnHash,
  } = useClaimRewardsMutation();

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
        variant={variant !== 'success' ? variant : 'solid'}
        disabled={
          variant === 'success' ? Boolean(isGasEnabledAndNotFetched || !amountsUSD || error) : false
        }
        w={['100%', '100%', '100%', '80px']}
        ml={[6, 6, 6, 4]}
        onClick={() => {
          variant === 'success' ? handleSubmit() : navigate('/staking/burn');
        }}
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
        amountsUSD={formatNumber(amountsUSD || 0)}
      />
    </>
  );
};
