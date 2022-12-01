import { Button } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { FC } from 'react';
import { useClaimLiquidatorRewardsMutation } from '../../lib/useClaimLiquidatorRewardsMutation';
import { RewardsTransactionModal } from './RewardsTransactionModal';
import { useQueryClient } from '@tanstack/react-query';

export const ClaimLiquidationBtn: FC<{ amountSNX?: number }> = ({ amountSNX }) => {
  const queryClient = useQueryClient();

  const {
    mutate,
    modalOpen,
    txnStatus,
    error,
    gasError,
    settle,
    isGasEnabledAndNotFetched,
    txnHash,
  } = useClaimLiquidatorRewardsMutation();
  const handleSubmit = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.refetchQueries(['useGetLiquidationRewards'], { type: 'active' });
      },
    });
  };
  return (
    <>
      <Button
        disabled={Boolean(isGasEnabledAndNotFetched || !amountSNX || error)}
        w={['100%', '100%', '100%', '80px']}
        ml={[4, 4, 4, 4]}
        onClick={() => {
          mutate();
        }}
      >
        Claim
      </Button>
      {amountSNX ? (
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
          amountSNX={formatNumber(amountSNX)}
        />
      ) : null}
    </>
  );
};
