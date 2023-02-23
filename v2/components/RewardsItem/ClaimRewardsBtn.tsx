import { Button, ButtonProps } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { FC } from 'react';
import { RewardsTransactionModal } from './RewardsTransactionModal';
import { useNavigate } from 'react-router-dom';
import { useClaimRewardsMutation } from '@snx-v2/useClaimRewardsMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';

const StyledButton = (props: ButtonProps) => (
  <Button
    data-testid="claim rewards button"
    w={['100%', '100%', '100%', '80px']}
    ml={[6, 6, 6, 4]}
    {...props}
  />
);

const ManageButtonUi = (props: ButtonProps) => <StyledButton {...props}>Maintain</StyledButton>;
const ClaimButtonUi = (props: ButtonProps) => (
  <StyledButton variant="solid" {...props}>
    Maintain
  </StyledButton>
);
export const ClaimRewardsBtn: FC<{
  amountSNX?: number;
  variant: string;
}> = ({ amountSNX, variant }) => {
  const queryClient = useQueryClient();
  const { delegateWallet } = useDelegateWallet();

  const navigate = useNavigate();
  const haveSomethingToClaim = Boolean(amountSNX);
  const delegatePermission = delegateWallet ? delegateWallet.canClaim : true;
  const canClaim = haveSomethingToClaim && delegatePermission && variant === 'success';
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
  const displayClaimButton = variant === 'success';
  return (
    <>
      {displayClaimButton ? (
        <ClaimButtonUi
          isDisabled={Boolean(!canClaim || isGasEnabledAndNotFetched || error)}
          onClick={() => {
            handleSubmit();
          }}
        />
      ) : (
        <ManageButtonUi
          variant={variant}
          onClick={() => {
            navigate('/staking/burn');
          }}
        />
      )}

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
