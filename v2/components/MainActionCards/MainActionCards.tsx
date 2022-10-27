import { Badge, Box, Button, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import React, { PropsWithChildren, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { CollectIcon, InfoIcon, MaintainIcon, StakeIcon } from '@snx-v2/icons';
import { useDebtData } from '@snx-v2/useDebtData';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import { CountDown } from '@snx-v2/CountDown';
import { useRewardsAvailable } from '@snx-v2/useRewardsAvailable';
import { useNavigate } from 'react-router-dom';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { formatNumberToUsd } from '@snx-v2/formatters';

const CardHeader = ({
  step,
  headingText,
  bodyText,
  icon,
}: PropsWithChildren<{ step: number; headingText: string; bodyText: string; icon: ReactNode }>) => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Text fontSize="4xl" lineHeight="6" fontFamily="mono" fontWeight="black" pt={0}>
          {step}
        </Text>
        {icon}
      </Flex>
      <Heading fontSize="sm">{headingText}</Heading>
      <Text color="whiteAlpha.700" fontSize="xs">
        {bodyText}
      </Text>
    </Box>
  );
};

const Container = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      width="full"
      maxWidth={['full', '70%', '72']}
      height={['auto', 'auto', '60']}
      alignItems="space-between"
      border="1px"
      borderColor="gray.800"
      p={3}
      borderRadius="base"
      bg="navy.900"
    >
      {children}
    </Flex>
  );
};

const StakeActionCard: React.FC<Required<Pick<UiProps, 'currentCRatioPercentage'>>> = ({
  currentCRatioPercentage,
}) => {
  const isStaking = currentCRatioPercentage > 0;
  const navigate = useNavigate();

  const { t } = useTranslation();
  return (
    <Container>
      <CardHeader
        step={1}
        headingText={t('staking-v2.main-action-cards.stake-headline')}
        bodyText={t('staking-v2.main-action-cards.stake-body')}
        icon={<StakeIcon />}
      />
      {isStaking ? (
        <Button
          data-testid="main stake button"
          onClick={() => navigate('/staking/mint')}
          mb="2"
          variant="link"
        >
          {t('staking-v2.main-action-cards.stake-link-button')}
        </Button>
      ) : (
        <Button
          data-testid="start staking button"
          onClick={() => {
            navigate('/staking/mint');
          }}
          variant="solid"
        >
          {t('staking-v2.main-action-cards.stake-main-button')}
        </Button>
      )}
    </Container>
  );
};

const MaintainActionCard: React.FC<
  Required<
    Pick<
      UiProps,
      | 'liquidationCratioPercentage'
      | 'targetCratioPercentage'
      | 'currentCRatioPercentage'
      | 'isFlagged'
    >
  >
> = ({
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
  const isStaking = currentCRatioPercentage > 0;

  return (
    <Container>
      <CardHeader
        step={2}
        headingText={t('staking-v2.main-action-cards.maintain-headline')}
        bodyText={t('staking-v2.main-action-cards.maintain-body')}
        icon={<MaintainIcon />}
      />
      {isStaking && (
        <Badge
          data-testid="burn badge"
          color={variant}
          bg="#47FAC240"
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
      )}
      {!isStaking ? (
        <Button
          data-testid="not staking maintain button"
          mb="2"
          variant="link"
          onClick={() => {
            if (isStaking) {
              navigate('/staking/burn');
            } else {
              //TODO
              console.log('C-Ratio explained');
            }
          }}
        >
          {t('staking-v2.main-action-cards.maintain-explanation-link')}
        </Button>
      ) : (
        <Button
          data-testid="main maintain button"
          onClick={() => {
            if (isFlagged) {
              navigate('/staking/unflag');
            } else {
              navigate('/staking/burn');
            }
          }}
          variant={variant}
        >
          {isFlagged
            ? t('staking-v2.main-action-cards.maintain-flag-button')
            : t('staking-v2.main-action-cards.maintain-main-button')}
        </Button>
      )}
    </Container>
  );
};

const CollectActionCard: React.FC<{
  liquidationCratioPercentage: number;
  targetCratioPercentage: number;
  currentCRatioPercentage: number;
  nextEpochStartDate: Date;
  hasClaimed: boolean;
  snxPrice?: string;
}> = ({
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
  const isStaking = currentCRatioPercentage > 0;
  const canClaim = !hasClaimed && variant === 'success';
  return (
    <Container>
      <CardHeader
        step={3}
        headingText={t('staking-v2.main-action-cards.collect-headline')}
        bodyText={t('staking-v2.main-action-cards.collect-body')}
        icon={<CollectIcon />}
      />
      {isStaking && (
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
              <InfoIcon width="10px" height="10px" />
            </Flex>
            <Text color="success" fontSize="md" fontFamily="mono">
              <CountDown toDate={nextEpochStartDate} />
            </Text>
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
      )}
      {isStaking && canClaim ? (
        <Button
          data-testid="main collect button"
          onClick={() => {
            navigate('/earn');
          }}
        >
          {t('staking-v2.main-action-cards.collect-main-button')}
        </Button>
      ) : (
        <Button
          data-testid="rewards explained button"
          onClick={() => {
            // TODO
            console.log('navigate to Rewards explained');
          }}
          mb="2"
          variant="link"
        >
          {t('staking-v2.main-action-cards.collect-explanation-link')}
        </Button>
      )}
    </Container>
  );
};

type UiProps = {
  liquidationCratioPercentage?: number;
  targetCratioPercentage?: number;
  currentCRatioPercentage?: number;
  isFlagged?: boolean;
  nextEpochStartDate?: Date;
  hasClaimed?: boolean;
  snxPrice?: string;
};
export const MainActionCardsUi: React.FC<UiProps> = ({
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
      {currentCRatioPercentage !== undefined ? (
        <StakeActionCard currentCRatioPercentage={currentCRatioPercentage} />
      ) : (
        <Skeleton flexGrow={1}>
          <Container />
        </Skeleton>
      )}
      {liquidationCratioPercentage !== undefined &&
      targetCratioPercentage !== undefined &&
      currentCRatioPercentage !== undefined &&
      isFlagged !== undefined ? (
        <MaintainActionCard
          liquidationCratioPercentage={liquidationCratioPercentage}
          targetCratioPercentage={targetCratioPercentage}
          currentCRatioPercentage={currentCRatioPercentage}
          isFlagged={isFlagged}
        />
      ) : (
        <Skeleton flexGrow={1}>
          <Container />
        </Skeleton>
      )}
      {currentCRatioPercentage !== undefined &&
      liquidationCratioPercentage !== undefined &&
      targetCratioPercentage !== undefined &&
      nextEpochStartDate !== undefined &&
      hasClaimed !== undefined ? (
        <CollectActionCard
          liquidationCratioPercentage={liquidationCratioPercentage}
          targetCratioPercentage={targetCratioPercentage}
          currentCRatioPercentage={currentCRatioPercentage}
          hasClaimed={hasClaimed}
          nextEpochStartDate={nextEpochStartDate}
          snxPrice={snxPrice}
        />
      ) : (
        <Skeleton flexGrow={1}>
          <Container />
        </Skeleton>
      )}
    </Stack>
  );
};

export const MainActionCards: React.FC = () => {
  const { data: debtData } = useDebtData();
  const { data: feePoolData } = useFeePoolData();
  const { data: rewardsData } = useRewardsAvailable();
  const { data: exchangeRateData } = useExchangeRatesData();

  return (
    <MainActionCardsUi
      currentCRatioPercentage={debtData?.currentCRatioPercentage.mul(100).toNumber()}
      targetCratioPercentage={debtData?.targetCRatioPercentage.mul(100).toNumber()}
      liquidationCratioPercentage={debtData?.liquidationRatioPercentage.mul(100).toNumber()}
      isFlagged={debtData?.liquidationDeadlineForAccount.gt(0)}
      hasClaimed={rewardsData?.hasClaimed}
      nextEpochStartDate={feePoolData?.nextFeePeriodStartDate}
      snxPrice={exchangeRateData?.SNX?.toString()}
    />
  );
};
