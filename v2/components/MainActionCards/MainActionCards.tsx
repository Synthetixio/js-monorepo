import React, { ReactNode, useCallback } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  useTheme,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { CollectIcon, InfoIcon, MaintainIcon, StakeIcon } from '@snx-v2/icons';
import { CountDown } from '@snx-v2/CountDown';
import { useNavigate } from 'react-router-dom';
import { formatNumberToUsd } from '@synthetixio/formatters';
import { NetworkId } from '@snx-v2/useSynthetixContracts';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';

interface CardProps {
  step: number;
  stepFrom: string;
  stepTo: string;
  headingText: string;
  bodyText: string;
  icon: ReactNode;
  disabled: boolean;
  isLoading: boolean;
  Content: JSX.Element | null;
  buttonVariant?: string;
  buttonText: string;
  buttonAction: () => void;
  testId: string;
}

export const Card = ({
  step = 1,
  stepFrom = '#eee',
  stepTo = '#333',
  headingText,
  bodyText,
  icon,
  disabled = false,
  Content = null,
  buttonVariant = 'solid',
  buttonText,
  buttonAction = () => {},
  testId,
  isLoading,
}: CardProps) => {
  const disabledOrLoading = disabled || isLoading;
  const stepStyles = disabledOrLoading
    ? {}
    : {
        backgroundImage: `linear-gradient(${stepFrom}, ${stepTo})`,
        backgroundClip: 'text',
        textFillColor: 'transparent',
        backgroundSize: '100%',
      };
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      width="full"
      maxWidth={['full', 'full', '72']}
      height={['60']}
      alignItems="space-between"
      border="1px"
      borderColor="gray.900"
      p={3}
      borderRadius="base"
      bg={isLoading ? 'gray.900' : disabled ? 'whiteAlpha.200' : 'navy.900'}
    >
      <Box>
        <Flex alignItems="center" justifyContent="space-between" mb={3}>
          <Text
            fontSize="4xl"
            lineHeight="8"
            fontFamily="mono"
            fontWeight="black"
            pt={0}
            color={disabledOrLoading ? 'gray.500' : 'whiteAlpha.700'}
            sx={stepStyles}
          >
            {step}
          </Text>
          {icon}
        </Flex>
        <Heading fontSize="sm" color={disabledOrLoading ? 'gray.500' : 'white'} mb={1}>
          {headingText}
        </Heading>
        <Text color={disabledOrLoading ? 'gray.500' : 'whiteAlpha.700'} fontSize="xs">
          {bodyText}
        </Text>
      </Box>
      {Content}
      <Button
        data-testid={testId}
        variant={buttonVariant}
        isDisabled={disabled}
        onClick={disabledOrLoading ? () => {} : buttonAction}
      >
        {buttonText}
      </Button>
    </Flex>
  );
};

const StakeActionCard: React.FC<{
  currentCRatioPercentage?: number;
  targetCRatioPercentage?: number;
  hasClaimed?: boolean;
  isLoading: boolean;
  connectWallet: (chainId?: NetworkId | undefined) => Promise<void>;
  walletAddress: string | null;
}> = ({
  currentCRatioPercentage,
  targetCRatioPercentage,
  hasClaimed,
  isLoading,
  connectWallet,
  walletAddress,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const buttonAction = useCallback(async () => {
    if (!walletAddress) {
      await connectWallet();
    }

    navigate('/staking/mint');
  }, [walletAddress, connectWallet, navigate]);

  // TODO: Need a better way to handle this. isLoading is true for wallet not being connected.
  const isCardLoading = isLoading && walletAddress !== null;
  const cRatioAboveTarget = Boolean(
    targetCRatioPercentage &&
      currentCRatioPercentage &&
      currentCRatioPercentage > targetCRatioPercentage
  );
  const isStaking = currentCRatioPercentage && currentCRatioPercentage > 0;

  const getButtonVariant = () => {
    if (isCardLoading) return 'ghost';
    if (!isStaking) return 'solid';
    if (!cRatioAboveTarget) return 'ghost';
    if (hasClaimed === false) return 'ghost';
    return 'solid';
  };

  const buttonText = !isStaking
    ? t('staking-v2.main-action-cards.stake-main-button')
    : t('staking-v2.main-action-cards.stake-more-button');

  return (
    <Card
      step={1}
      stepFrom="#34EDB3"
      stepTo="#00D1FF"
      headingText={t('staking-v2.main-action-cards.stake-headline')}
      bodyText={t('staking-v2.main-action-cards.stake-body')}
      icon={<StakeIcon disabled={isCardLoading} />}
      disabled={true}
      isLoading={isCardLoading}
      buttonText={buttonText}
      Content={null}
      buttonVariant={getButtonVariant()}
      testId="stake button"
      buttonAction={buttonAction}
    />
  );
};

const MaintainActionCard: React.FC<{
  isLoading: boolean;
  liquidationCratioPercentage?: number;
  targetCratioPercentage?: number;
  currentCRatioPercentage?: number;
  targetThreshold?: number;
  isFlagged?: boolean;
  hasClaimed?: boolean;
}> = ({
  isLoading,
  liquidationCratioPercentage,
  targetCratioPercentage,
  currentCRatioPercentage,
  targetThreshold,
  isFlagged,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  const variant = getHealthVariant({
    liquidationCratioPercentage,
    targetCratioPercentage,
    currentCRatioPercentage,
    targetThreshold,
    isFlagged: undefined,
  });

  const isStaking = currentCRatioPercentage && currentCRatioPercentage > 0;
  const currentCRatioPercentageWithThresHold =
    currentCRatioPercentage && targetCratioPercentage && targetThreshold
      ? currentCRatioPercentage * (1 + targetThreshold)
      : false;
  const cRatioAboveOrEqToTarget =
    targetCratioPercentage && currentCRatioPercentageWithThresHold
      ? currentCRatioPercentageWithThresHold >= targetCratioPercentage
      : false;
  const getButtonVariant = () => {
    if (!isStaking) return 'ghost';
    if (cRatioAboveOrEqToTarget) return 'ghost';
    return variant;
  };

  return (
    <Card
      step={2}
      stepFrom={theme.colors['orange']['400']}
      stepTo={theme.colors['orange']['400']}
      headingText={t('staking-v2.main-action-cards.maintain-headline')}
      bodyText={t('staking-v2.main-action-cards.maintain-body')}
      icon={<MaintainIcon height="32px" color={isLoading ? 'gray.500' : '#FF9A54'} />}
      Content={null}
      isLoading={isLoading}
      disabled={false}
      buttonVariant={getButtonVariant()}
      buttonText={
        isStaking
          ? isFlagged
            ? t('staking-v2.main-action-cards.maintain-flag-button')
            : t('staking-v2.main-action-cards.maintain-main-button')
          : t('staking-v2.main-action-cards.maintain-explanation-link')
      }
      buttonAction={
        isStaking
          ? isFlagged
            ? () => navigate('/staking/unflag')
            : () => navigate('/staking/burn')
          : () => window.open(EXTERNAL_LINKS.Synthetix.CRatioGuide, '_newtab')
      }
      testId="maintain button"
    />
  );
};

const CollectActionCard: React.FC<{
  isLoading: boolean;
  liquidationCratioPercentage?: number;
  targetCratioPercentage?: number;
  currentCRatioPercentage?: number;
  nextEpochStartDate?: Date;
  hasClaimed?: boolean;
  snxPrice?: string;
  targetThreshold?: number;
  rewardsDollarValue: number;
  feesBurned?: number;
}> = ({
  isLoading,
  liquidationCratioPercentage,
  targetCratioPercentage,
  currentCRatioPercentage,
  nextEpochStartDate,
  hasClaimed,
  targetThreshold,
  rewardsDollarValue,
  feesBurned,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  const variant = getHealthVariant({
    liquidationCratioPercentage,
    targetCratioPercentage,
    currentCRatioPercentage,
    targetThreshold,
    isFlagged: undefined,
  });
  const getButtonVariant = () => {
    if (hasClaimed) return 'ghost';
    if (!isStaking) return 'ghost';
    if (variant === 'success') return 'success';
    return 'ghost';
  };

  const isStaking = currentCRatioPercentage && currentCRatioPercentage > 0;

  return (
    <Card
      step={3}
      stepFrom={theme.colors['cyan']['500']}
      stepTo={theme.colors['cyan']['500']}
      headingText={t('staking-v2.main-action-cards.collect-headline')}
      bodyText={t('staking-v2.main-action-cards.collect-body')}
      icon={<CollectIcon color={isLoading ? 'gray.400' : 'cyan.400'} />}
      Content={
        isStaking ? (
          <Flex justifyContent="space-between">
            {rewardsDollarValue > 0 ? (
              <Flex gap={6}>
                <Flex flexDirection="column">
                  <Text color="whiteAlpha.700" fontSize="xs" mr="1" fontWeight="700">
                    {t('staking-v2.main-action-cards.collect-rewards')}{' '}
                    <Tooltip
                      label={t('staking-v2.main-action-cards.collect-rewards-tooltip')}
                      hasArrow
                    >
                      <Box as="span" mb={1}>
                        <InfoIcon width="10px" height="10px" />
                      </Box>
                    </Tooltip>
                  </Text>
                  <Text
                    data-testid="value of rewards"
                    fontFamily="mono"
                    fontSize="md"
                    color="green.400"
                    fontWeight="700"
                  >
                    = {formatNumberToUsd(rewardsDollarValue)}
                  </Text>
                </Flex>
                <Flex flexDirection="column">
                  <Text color="whiteAlpha.700" fontSize="xs" mr="1" fontWeight="700">
                    {t('staking-v2.main-action-cards.collect-fees')}{' '}
                    <Tooltip
                      label={t('staking-v2.main-action-cards.collect-fees-tooltip')}
                      hasArrow
                    >
                      <Box as="span" mb={1}>
                        <InfoIcon width="10px" height="10px" />
                      </Box>
                    </Tooltip>
                  </Text>
                  <Text fontFamily="mono" fontSize="md" color="green.400" fontWeight="700">
                    = {formatNumberToUsd(feesBurned || 0)}
                  </Text>
                </Flex>
              </Flex>
            ) : (
              <Flex flexDirection="column">
                <Flex alignItems="center">
                  <Text
                    textTransform="uppercase"
                    color="whiteAlpha.700"
                    fontSize="xs"
                    mr="1"
                    fontWeight="700"
                  >
                    {t('staking-v2.main-action-cards.collect-epoch')}
                  </Text>
                  <Tooltip label={t('staking-v2.main-action-cards.collect-epoch-tooltip')} hasArrow>
                    <Box as="span" mb={1}>
                      <InfoIcon width="10px" height="10px" />
                    </Box>
                  </Tooltip>
                </Flex>
                <Text color="success" fontSize="md" fontFamily="mono">
                  <Skeleton as="span" isLoaded={Boolean(nextEpochStartDate)}>
                    {nextEpochStartDate && <CountDown toDate={nextEpochStartDate} />}
                  </Skeleton>
                </Text>
              </Flex>
            )}
          </Flex>
        ) : null
      }
      isLoading={isLoading}
      disabled={false}
      buttonText={
        isStaking
          ? variant === 'success' && !hasClaimed
            ? t('staking-v2.main-action-cards.collect-main-healthy-button')
            : t('staking-v2.main-action-cards.collect-main-unhealthy-button')
          : t('staking-v2.main-action-cards.collect-explanation-link')
      }
      buttonVariant={getButtonVariant()}
      buttonAction={
        isStaking
          ? () => navigate('/earn')
          : () => window.open(EXTERNAL_LINKS.Synthetix.RewardsGuide, '_newtab')
      }
      testId="collect button"
    />
  );
};

type UiProps = {
  isLoading: boolean;
  liquidationCratioPercentage?: number;
  targetCratioPercentage?: number;
  currentCRatioPercentage?: number;
  isFlagged?: boolean;
  nextEpochStartDate?: Date;
  hasClaimed?: boolean;
  connectWallet: (chainId?: NetworkId | undefined) => Promise<void>;
  walletAddress: string | null;
  targetThreshold?: number;
  rewardsDollarValue: number;
  feesBurned?: number;
};

export const MainActionCardsUi: React.FC<UiProps> = ({
  isLoading,
  liquidationCratioPercentage,
  currentCRatioPercentage,
  targetCratioPercentage,
  isFlagged,
  nextEpochStartDate,
  hasClaimed,
  connectWallet,
  walletAddress,
  targetThreshold,
  rewardsDollarValue,
  feesBurned,
}) => {
  return (
    <Stack direction={['column', 'column', 'row']} align="center" spacing="14px">
      <StakeActionCard
        isLoading={isLoading}
        currentCRatioPercentage={currentCRatioPercentage}
        targetCRatioPercentage={targetCratioPercentage}
        connectWallet={connectWallet}
        walletAddress={walletAddress}
        hasClaimed={hasClaimed}
      />
      <MaintainActionCard
        isLoading={isLoading}
        liquidationCratioPercentage={liquidationCratioPercentage}
        targetCratioPercentage={targetCratioPercentage}
        currentCRatioPercentage={currentCRatioPercentage}
        isFlagged={isFlagged}
        targetThreshold={targetThreshold}
        hasClaimed={hasClaimed}
      />
      <CollectActionCard
        rewardsDollarValue={rewardsDollarValue}
        isLoading={isLoading}
        liquidationCratioPercentage={liquidationCratioPercentage}
        targetCratioPercentage={targetCratioPercentage}
        currentCRatioPercentage={currentCRatioPercentage}
        hasClaimed={hasClaimed}
        nextEpochStartDate={nextEpochStartDate}
        targetThreshold={targetThreshold}
        feesBurned={feesBurned}
      />
    </Stack>
  );
};
