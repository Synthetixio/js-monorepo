import { Button } from '@chakra-ui/react';
import { formatNumber } from '@synthetixio/formatters';
import { FC } from 'react';
import { useClaimLiquidatorRewardsMutation } from '../../lib/useClaimLiquidatorRewardsMutation';
import { RewardsTransactionModal } from './RewardsTransactionModal';
import { useQueryClient } from '@tanstack/react-query';

export const ClaimLiquidationBtn: FC<{ amountSNX?: number }> = ({ amountSNX }) => {
  const queryClient = useQueryClient();
  // Liquidation claim threshold set as 0.01
  const canClaim = Boolean(amountSNX && amountSNX >= 0.01);

  const {
    mutate,
    modalOpen,
    txnStatus,
    error,
    gasError,
    settle,
    isGasEnabledAndNotFetched,
    txnHash,
  } = useClaimLiquidatorRewardsMutation(canClaim);

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
        isDisabled={Boolean(isGasEnabledAndNotFetched || !canClaim || error)}
        w={['100%', '100%', '100%', '80px']}
        ml={[4, 4, 4, 4]}
        onClick={handleSubmit}
        fontFamily="heading"
        fontSize="14px"
        fontWeight="700"
        color="black"
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
