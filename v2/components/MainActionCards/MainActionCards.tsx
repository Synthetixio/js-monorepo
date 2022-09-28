import { Badge, Box, Button, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import React, { PropsWithChildren, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { CollectIcon, InfoIcon, MaintainIcon, StakeIcon } from '@snx-v2/icons';
import { useDebtData } from '@snx-v2/useDebtData';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import { CountDown } from '@snx-v2/CountDown';
import { useRewardsAvailable } from '@snx-v2/useRewardsAvailable';
import { useSynthetix } from '@snx-v2/useSynthetixContracts';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';
import { useGasOptions } from '@snx-v2/useGasOptions';
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
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="4xl" fontFamily="mono">
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
      height={['auto', 'auto', '56']}
      alignItems="space-between"
      border="1px"
      borderColor="gray.800"
      padding="2"
      borderRadius="sm"
    >
      {children}
    </Flex>
  );
};

const StakeActionCard: React.FC<UiProps> = ({ currentCRatioPercentage }) => {
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
        <Button onClick={() => navigate('/staking/mint')} mb="2" variant="link">
          {t('staking-v2.main-action-cards.stake-link-button')}
        </Button>
      ) : (
        <Button
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
const MaintainActionCard: React.FC<UiProps> = ({
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
          color={variant}
          bg="blackAlpha.600"
          border="1px"
          borderColor={variant}
          display="flex"
          alignItems="center"
          width="fit-content"
          margin="0 auto"
          fontSize="x-small"
          borderRadius="base"
          fontWeight="700"
        >
          <InfoIcon color={variant} width="10px" height="10px" />
          <Text ml="0.5">
            {variant !== 'success'
              ? 'Adjust to collect weekly rewards'
              : 'Your ratio is looking healthy!'}
          </Text>
        </Badge>
      )}
      {!isStaking || variant === 'success' ? (
        <Button
          mb="2"
          variant="link"
          onClick={() => {
            if (isStaking) {
              navigate('/staking/burn');
            } else {
              console.log('C-Ratio explained');
            }
          }}
        >
          {isStaking
            ? t('staking-v2.main-action-cards.maintain-main-button')
            : t('staking-v2.main-action-cards.maintain-explanation-link')}
        </Button>
      ) : (
        <Button
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

const CollectActionCard: React.FC<UiProps> = ({
  liquidationCratioPercentage,
  targetCratioPercentage,
  currentCRatioPercentage,
  nextEpochStartDate,
  hasClaimed,
  snxPrice,
}) => {
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
                <Text color="success" fontSize="md" fontFamily="mono">
                  {snxPrice && formatNumberToUsd(snxPrice)}
                </Text>
              </Skeleton>
            </Flex>
          )}
        </Flex>
      )}
      {isStaking ? (
        <Button
          onClick={() => {
            console.log('navigate to claim page');
          }}
          variant={canClaim ? variant : 'disabled'}
          disabled={!canClaim}
        >
          {t('staking-v2.main-action-cards.collect-main-button')}
        </Button>
      ) : (
        <Button
          onClick={() => {
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
  liquidationCratioPercentage: number;
  targetCratioPercentage: number;
  currentCRatioPercentage: number;
  isFlagged: boolean;
  nextEpochStartDate: Date;
  hasClaimed: boolean;
  snxPrice?: string;
};
export const MainActionCardsUi: React.FC<UiProps> = (props) => {
  return (
    <Stack direction={['column', 'column', 'row']} align="center" spacing="14px">
      <StakeActionCard {...props}></StakeActionCard>
      <MaintainActionCard {...props}></MaintainActionCard>
      <CollectActionCard {...props}></CollectActionCard>
    </Stack>
  );
};

export const MainActionCards: React.FC = () => {
  const { data: debtData } = useDebtData();
  const { data: feePoolData } = useFeePoolData();
  const { data: rewardsData } = useRewardsAvailable();
  const { data: Synthetix } = useSynthetix();
  const { data: exchangeRateData } = useExchangeRatesData();

  const getGasLimit = Synthetix?.signer
    ? () => Synthetix.estimateGas.burnSynthsToTarget()
    : undefined;
  const populateTransaction = Synthetix
    ? () => Synthetix.populateTransaction.burnSynthsToTarget()
    : undefined;
  const gasOptionsQuery = useGasOptions({
    getGasLimit,
    populateTransaction,
  });
  const { gasLimit, gasPrices, optimismLayerOneFees, gasOptionsForTransaction } =
    gasOptionsQuery.data || {};

  if (!debtData || !feePoolData || !rewardsData || !Synthetix) return <p>Skeleton</p>;

  return (
    <>
      <Button
        onClick={() => {
          Synthetix.burnSynthsToTarget(gasOptionsForTransaction);
        }}
      >
        Burn Max
      </Button>
      <EthGasPriceEstimator
        gasLimit={gasLimit}
        optimismLayerOneFees={optimismLayerOneFees}
        gasPrices={gasPrices}
      />
      <MainActionCardsUi
        currentCRatioPercentage={debtData.currentCRatioPercentage.mul(100).toNumber()}
        targetCratioPercentage={debtData.targetCRatioPercentage.mul(100).toNumber()}
        liquidationCratioPercentage={debtData.liquidationRatioPercentage.mul(100).toNumber()}
        isFlagged={debtData.liquidationDeadlineForAccount.gt(0)}
        hasClaimed={rewardsData.hasClaimed}
        nextEpochStartDate={feePoolData.nextFeePeriodStartDate}
        snxPrice={exchangeRateData?.SNX?.toString()}
      />
    </>
  );
};
