import { Button, ButtonProps, Tooltip } from '@chakra-ui/react';
import { formatNumber } from '@synthetixio/formatters';
import { FC } from 'react';
import { RewardsTransactionModal } from './RewardsTransactionModal';
import { useNavigate } from 'react-router-dom';
import { useClaimRewardsMutation } from '@snx-v2/useClaimRewardsMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';
import { useTranslation } from 'react-i18next';

const StyledButton = (props: ButtonProps) => (
  <Button
    data-testid="claim rewards button"
    w={['100%', '100%', '100%', '80px']}
    ml={[6, 6, 6, 4]}
    {...props}
  />
);

const ManageButtonUi = (props: ButtonProps) => {
  const { t } = useTranslation();
  return <StyledButton {...props}>{t('staking-v2.earn.maintain')}</StyledButton>;
};

interface ClaimBtnProps extends ButtonProps {
  delegatedToMint: boolean;
}
const ClaimButtonUi = ({ delegatedToMint, ...props }: ClaimBtnProps) => {
  const { t } = useTranslation();
  return (
    <Tooltip
      label={delegatedToMint ? '' : t('staking-v2.delegate.missing-permission')}
      shouldWrapChildren
    >
      <StyledButton variant="solid" {...props}>
        {t('staking-v2.earn.claim')}
      </StyledButton>
    </Tooltip>
  );
};
export const ClaimRewardsBtn: FC<{
  amountSNX?: number;
  variant: string;
}> = ({ amountSNX, variant }) => {
  const queryClient = useQueryClient();
  const { delegateWallet } = useDelegateWallet();

  const navigate = useNavigate();
  const haveSomethingToClaim = Boolean(amountSNX);
  const delegatedToMint = delegateWallet ? delegateWallet.canClaim : true;
  const haveClaimed = amountSNX === 0;
  const canClaim = haveSomethingToClaim && delegatedToMint && variant === 'success';
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
  const displayClaimButton = variant === 'success' || haveClaimed;
  return (
    <>
      {displayClaimButton ? (
        <ClaimButtonUi
          delegatedToMint={delegatedToMint}
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
