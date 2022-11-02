import React, { ReactNode } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  Badge,
  Tooltip,
  useTheme,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { CollectIcon, InfoIcon, MaintainIcon, StakeIcon } from '@snx-v2/icons';
import { CountDown } from '@snx-v2/CountDown';
import { useNavigate } from 'react-router-dom';
import { formatNumberToUsd } from '@snx-v2/formatters';

interface CardProps {
  step: number;
  headingText: string;
  bodyText: string;
  icon: ReactNode;
  disabled: boolean;
  Content: JSX.Element | null;
  buttonVariant?: string;
  buttonText: string;
  buttonAction: () => void;
  testId: string;
}

export const Card = ({
  step = 1,
  headingText,
  bodyText,
  icon,
  disabled = false,
  Content = null,
  buttonVariant = 'solid',
  buttonText,
  buttonAction = () => {},
  testId,
}: CardProps) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      width="full"
      maxWidth={['full', '70%', '72']}
      height={['60']}
      alignItems="space-between"
      border="1px"
      borderColor="gray.900"
      p={3}
      borderRadius="base"
      bg="navy.900"
    >
      <Box>
        <Flex alignItems="center" justifyContent="space-between" mb={3}>
          <Text
            fontSize="4xl"
            lineHeight="6"
            fontFamily="mono"
            fontWeight="black"
            pt={0}
            color={disabled ? 'gray.500' : 'whiteAlpha.700'}
          >
            {step}
          </Text>
          {icon}
        </Flex>
        <Heading fontSize="sm" color={disabled ? 'gray.500' : 'white'} mb={1}>
          {headingText}
        </Heading>
        <Text color={disabled ? 'gray.500' : 'whiteAlpha.700'} fontSize="xs">
          {bodyText}
        </Text>
      </Box>
      {Content}
      <Button
        data-testid={testId}
        variant={buttonVariant}
        onClick={disabled ? () => {} : buttonAction}
      >
        {buttonText}
      </Button>
    </Flex>
  );
};

const StakeActionCard: React.FC<{ currentCRatioPercentage?: number; isLoading: boolean }> = ({
  currentCRatioPercentage,
  isLoading,
}) => {
  const isStaking = currentCRatioPercentage && currentCRatioPercentage > 0;
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <Card
      step={1}
      headingText={t('staking-v2.main-action-cards.stake-headline')}
      bodyText={t('staking-v2.main-action-cards.stake-body')}
      icon={<StakeIcon disabled={isLoading} />}
      disabled={isLoading}
      buttonText={
        isStaking
          ? t('staking-v2.main-action-cards.stake-link-button')
          : t('staking-v2.main-action-cards.stake-main-button')
      }
      Content={null}
      buttonVariant={isStaking ? 'link' : isLoading ? 'link' : 'solid'}
      testId={isStaking ? 'main stake button' : 'start staking button'}
      buttonAction={() => navigate('/staking/mint')}
    />
  );
};

const MaintainActionCard: React.FC<{
  isLoading: boolean;
  liquidationCratioPercentage?: number;
  targetCratioPercentage?: number;
  currentCRatioPercentage?: number;
  isFlagged?: boolean;
}> = ({
  isLoading,
  liquidationCratioPercentage,
  targetCratioPercentage,
  currentCRatioPercentage,
  isFlagged,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const variant = getHealthVariant({
    liquidationCratioPercentage,
    targetCratioPercentage,
    currentCRatioPercentage,
  });

  const isStaking = currentCRatioPercentage && currentCRatioPercentage > 0;

  const theme = useTheme();
  const fadedBg = `${theme.colors[variant]}40`;

  return (
    <Card
      step={2}
      headingText={t('staking-v2.main-action-cards.maintain-headline')}
      bodyText={t('staking-v2.main-action-cards.maintain-body')}
      icon={<MaintainIcon height="32px" color={isLoading ? 'gray.500' : '#FF9A54'} />}
      Content={
        isStaking ? (
          <Badge
            data-testid="burn badge"
            color={variant}
            bg={fadedBg}
            border="1px"
            borderColor={variant}
            display="flex"
            alignItems="center"
            width="fit-content"
            fontSize="x-small"
            borderRadius="base"
            fontWeight="700"
            py={0.5}
          >
            <InfoIcon color={variant} width="10px" height="10px" />
            <Text ml="0.5" fontWeight="bold" fontSize="2xs">
              {variant !== 'success'
                ? 'Adjust to collect weekly rewards'
                : 'Your ratio is looking healthy!'}
            </Text>
          </Badge>
        ) : null
      }
      disabled={isLoading}
      buttonVariant={isStaking ? variant : 'link'}
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
          : () => console.log('C-Ratio explained')
      }
      testId={isStaking ? 'main maintain button' : 'not staking maintain button'}
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
}> = ({
  isLoading,
  liquidationCratioPercentage,
  targetCratioPercentage,
  currentCRatioPercentage,
  nextEpochStartDate,
  hasClaimed,
  snxPrice,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const variant = getHealthVariant({
    liquidationCratioPercentage,
    targetCratioPercentage,
    currentCRatioPercentage,
  });

  const isStaking = currentCRatioPercentage && currentCRatioPercentage > 0;
  const canClaim = !hasClaimed && variant === 'success';

  return (
    <Card
      step={3}
      headingText={t('staking-v2.main-action-cards.collect-headline')}
      bodyText={t('staking-v2.main-action-cards.collect-body')}
      icon={<CollectIcon color={isLoading ? 'gray.400' : '#2ED9FF'} />}
      Content={
        isStaking ? (
          <Flex justifyContent="space-between">
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
                <Tooltip label="Soonthetix" hasArrow>
                  <Box as="span" mb={1}>
                    <InfoIcon width="10px" height="10px" />
                  </Box>
                </Tooltip>
              </Flex>
              {nextEpochStartDate && (
                <Text color="success" fontSize="md" fontFamily="mono">
                  <CountDown toDate={nextEpochStartDate} />
                </Text>
              )}
            </Flex>
            {canClaim && (
              <Flex flexDirection="column">
                <Text color="whiteAlpha.700" fontSize="xs" mr="1" fontWeight="700">
                  {t('staking-v2.main-action-cards.collect-price')}
                </Text>
                <Skeleton isLoaded={snxPrice !== undefined}>
                  <Text data-testid="snx price" color="success" fontSize="md" fontFamily="mono">
                    {snxPrice && formatNumberToUsd(snxPrice)}
                  </Text>
                </Skeleton>
              </Flex>
            )}
          </Flex>
        ) : null
      }
      disabled={isLoading}
      buttonText={
        isStaking && canClaim
          ? t('staking-v2.main-action-cards.collect-main-button')
          : t('staking-v2.main-action-cards.collect-explanation-link')
      }
      buttonVariant={isStaking && canClaim ? variant : 'link'}
      buttonAction={
        isStaking && canClaim
          ? () => navigate('/earn')
          : () => console.log('navigate to Rewards explained')
      }
      testId={isStaking && canClaim ? 'main collect button' : 'rewards explained button'}
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
  snxPrice?: string;
};

export const MainActionCardsUi: React.FC<UiProps> = ({
  isLoading,
  liquidationCratioPercentage,
  currentCRatioPercentage,
  targetCratioPercentage,
  isFlagged,
  nextEpochStartDate,
  hasClaimed,
  snxPrice,
}) => {
  return (
    <Stack direction={['column', 'column', 'row']} align="center" spacing="14px">
      <StakeActionCard isLoading={isLoading} currentCRatioPercentage={currentCRatioPercentage} />
      <MaintainActionCard
        isLoading={isLoading}
        liquidationCratioPercentage={liquidationCratioPercentage}
        targetCratioPercentage={targetCratioPercentage}
        currentCRatioPercentage={currentCRatioPercentage}
        isFlagged={isFlagged}
      />
      <CollectActionCard
        isLoading={isLoading}
        liquidationCratioPercentage={liquidationCratioPercentage}
        targetCratioPercentage={targetCratioPercentage}
        currentCRatioPercentage={currentCRatioPercentage}
        hasClaimed={hasClaimed}
        nextEpochStartDate={nextEpochStartDate}
        snxPrice={snxPrice}
      />
    </Stack>
  );
};
