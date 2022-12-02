import { FC, ReactElement } from 'react';
import {
  Box,
  Text,
  Flex,
  Button,
  Progress,
  FlexProps,
  Badge,
  Divider,
  Skeleton,
  Fade,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { CountDown } from '@snx-v2/CountDown';
import { useGetLiquidationRewards } from '@snx-v2/useGetLiquidationRewards';
import { useRewardsAvailable } from '@snx-v2/useRewardsAvailable';
import { SNXIcon, InfoOutline } from '@snx-v2/icons';
import { useDebtData } from '@snx-v2/useDebtData';
import { calculateStakedSnx } from '@snx-v2/stakingCalculations';
import { formatNumber, formatPercent } from '@snx-v2/formatters';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import intervalToDuration from 'date-fns/intervalToDuration';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { ClaimRewardsBtn } from './ClaimRewardsBtn';
import { ClaimLiquidationBtn } from './ClaimLiquidationBtn';
import { useApr } from '@snx-v2/useApr';

interface RewardsItemProps extends FlexProps {
  isLoading: boolean;
  Icon: FC;
  title: string;
  description: string;
  apyReturn: string | null;
  stakedBalance: string | null;
  endDate: Date | null;
  percentCompleted?: number;
  RewardBalance: FC;
  RewardsBadge?: FC | null;
  claimBtn: ReactElement;
  onClick?: () => void;
}

export const RewardsItemUI = ({
  isLoading,
  Icon,
  title,
  description,
  apyReturn,
  stakedBalance,
  endDate,
  percentCompleted,
  RewardBalance,
  RewardsBadge,
  claimBtn,
  ...props
}: RewardsItemProps) => {
  const { t } = useTranslation();

  return (
    <Flex alignItems="center" {...props} flexDirection={['column', 'column', 'column', 'row']}>
      <Flex width={['100%', '100%', '100%', 'initial']}>
        <Box
          minW="44px"
          minH="44px"
          bgGradient="linear(to-b, pink.500, cyan.500)"
          borderRadius="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mr={4}
        >
          <Icon />
        </Box>
      </Flex>
      {/* First Group */}
      <Flex width={['100%', '100%', '100%', 'initial']} mt={[4, 4, 4, 0]}>
        <Flex
          direction="column"
          minWidth={['182px', '182px', '182px', '120px']}
          mr={[0, 10, 10, 4]}
        >
          <Text
            fontFamily="heading"
            fontSize="sm"
            fontWeight="700"
            lineHeight="5"
            color="whiteAlpha.900"
          >
            {title}
          </Text>
          <Text fontFamily="heading" fontSize="xs" lineHeight="4" color="whiteAlpha.600">
            {description}
          </Text>
        </Flex>
        {isLoading ? (
          <Flex direction="column" justifyContent="center" width="90%" minWidth="80px" ml={0}>
            <Skeleton width={['100%', '100%', '100%', '60px']} height="16px" />
          </Flex>
        ) : (
          <Fade in={!isLoading}>
            <Flex direction="column" justifyContent="center" minWidth="80px" ml={[6, 6, 6, 0]}>
              <>
                <Text
                  fontFamily="heading"
                  fontSize="sm"
                  fontWeight="700"
                  lineHeight="5"
                  color="whiteAlpha.900"
                >
                  {apyReturn || '—'}
                </Text>
                <Text fontFamily="heading" fontSize="xs" lineHeight="4" color="whiteAlpha.600">
                  {apyReturn ? t('staking-v2.earn.apy') : '—'}
                </Text>
              </>
            </Flex>
          </Fade>
        )}
      </Flex>
      {/* Second Group */}
      <Flex alignItems="center" width={['100%', '100%', '100%', 'initial']} mt={[4, 4, 4, 0]}>
        {isLoading ? (
          <Flex
            direction="column"
            minWidth={['182px', '182px', '182px', '120px']}
            mr={[0, 10, 10, 4]}
          >
            <Skeleton width={['100%', '100%', '100%', '100px']} mr={2} height="16px" />
          </Flex>
        ) : (
          <Fade in={!isLoading}>
            <Flex
              direction="column"
              minWidth={['182px', '182px', '182px', '120px']}
              mr={[0, 10, 10, 4]}
            >
              <>
                <Text
                  fontFamily="heading"
                  fontSize="sm"
                  fontWeight="700"
                  lineHeight="5"
                  color="whiteAlpha.900"
                >
                  {stakedBalance || '—'}
                </Text>
                <Text fontFamily="heading" fontSize="xs" lineHeight="4" color="whiteAlpha.600">
                  {stakedBalance ? t('staking-v2.earn.staked') : '—'}
                </Text>
              </>
            </Flex>
          </Fade>
        )}
        {/* Date Group */}
        {isLoading ? (
          <Flex width="100%">
            <Skeleton width={['100%', '100%', '100%', '210px']} height="16px" />
          </Flex>
        ) : (
          <Fade in={!isLoading}>
            {endDate ? (
              <Flex direction="column" justifyContent="space-between" w="210px" mx={[6, 6, 6, 5]}>
                <Progress
                  w="100%"
                  variant="white"
                  height="5px"
                  min={0}
                  max={100}
                  value={percentCompleted}
                />
                <Flex justifyContent="space-between" alignItems="center" mt={2.25}>
                  <Text fontFamily="heading" fontWeight="700" fontSize="xs" color="whiteAlpha.600">
                    {t('staking-v2.earn.remaining')}
                  </Text>
                  <CountDown
                    sx={{
                      color: 'green.400',
                      fontWeight: '700',
                      fontFamily: 'heading',
                      fontSize: 'xs',
                      lineHeight: '4',
                    }}
                    toDate={endDate}
                  />
                </Flex>
              </Flex>
            ) : (
              <Flex direction="column" minW="210px" mx={[6, 6, 6, 5]}>
                <Text
                  fontFamily="heading"
                  fontSize="xs"
                  fontWeight={700}
                  lineHeight="4"
                  color="whiteAlpha.600"
                >
                  {t('staking-v2.earn.does-not-expire')}
                </Text>
              </Flex>
            )}
          </Fade>
        )}
      </Flex>
      {/* Final Group */}
      {isLoading ? (
        <Flex
          alignItems="center"
          width={['100%', '100%', '100%', 'initial']}
          mt={[4, 4, 4, 0]}
          justifyContent="space-between"
          flexGrow={1}
        >
          <Flex minW={['182px', '182px', '182px', '120px']}>
            <Skeleton
              ml={[0, 0, 0, 8]}
              mr={[8, 8, 8, 0]}
              w={['270px', '270px', '270px', '210px']}
              height="16px"
            />
          </Flex>
          <Button w={['100%', '100%', '100%', '80px']} ml={[4, 4, 4, 4]} disabled>
            Claim
          </Button>
        </Flex>
      ) : (
        <Flex
          alignItems="center"
          width={['100%', '100%', '100%', 'initial']}
          mt={[4, 4, 4, 0]}
          justifyContent="space-between"
          flexGrow={1}
        >
          <Flex
            direction="column"
            minW="182px"
            mx={[0, 0, 0, 7]}
            mr={[0, 10, 10, 0]}
            width={['150px', '150px', 'initial', 'initial']}
          >
            <Fade in={!isLoading}>
              <Text
                fontFamily="heading"
                fontSize="sm"
                fontWeight="700"
                lineHeight="5"
                color="whiteAlpha.900"
              >
                <RewardBalance />
              </Text>
              {RewardsBadge && <RewardsBadge />}
            </Fade>
          </Flex>
          {claimBtn}
        </Flex>
      )}
    </Flex>
  );
};

function percentEpochCompleted(nextStartDate?: Date, duration?: number) {
  const { days, hours, minutes, seconds } = intervalToDuration({
    start: new Date(),
    end: nextStartDate || 0,
  });

  const totalSecondsUntil =
    (days ? days * 24 * 3600 : 0) +
    (hours ? hours * 3600 : 0) +
    (minutes ? minutes * 60 : 0) +
    (seconds ? seconds : 0);

  const totalDuration = duration || 0;

  return (100 * (totalDuration - totalSecondsUntil)) / totalDuration;
}

export const Rewards = () => {
  const { t } = useTranslation();

  const { data: debtData, isLoading: isDebtLoading } = useDebtData();
  const { data: liquidationData, isLoading: isLiquidationLoading } = useGetLiquidationRewards();
  const { data: rewardsData, isLoading: isRewardsLoading } = useRewardsAvailable();
  const { data: feePoolData, isLoading: isFeePoolDataLoading } = useFeePoolData();
  const { data: aprData } = useApr();

  const stakedSnx = calculateStakedSnx({
    targetCRatio: debtData?.targetCRatio,
    currentCRatio: debtData?.currentCRatio,
    collateral: debtData?.collateral,
  });

  const variant = getHealthVariant({
    currentCRatioPercentage: debtData?.currentCRatioPercentage.toNumber(),
    liquidationCratioPercentage: debtData?.liquidationRatioPercentage.toNumber(),
    targetCratioPercentage: debtData?.targetCRatioPercentage.toNumber(),
    targetThreshold: debtData?.targetThreshold.toNumber(),
  });

  const isLoading =
    isDebtLoading || isLiquidationLoading || isRewardsLoading || isFeePoolDataLoading;

  return (
    <Box my={8}>
      <Divider my={4} />
      <RewardsItemUI
        Icon={() => <SNXIcon height="40px" width="40px" />}
        title={t('staking-v2.earn.staking-rewards.title')}
        description={t('staking-v2.earn.staking-rewards.description')}
        apyReturn={aprData !== undefined ? formatPercent(aprData.toNumber()) : ''}
        stakedBalance={`${formatNumber(stakedSnx.toNumber()).toString()} SNX`}
        endDate={feePoolData?.nextFeePeriodStartDate || null}
        percentCompleted={percentEpochCompleted(
          feePoolData?.nextFeePeriodStartDate,
          feePoolData?.feePeriodDuration
        )}
        isLoading={isLoading}
        RewardBalance={() => {
          if (rewardsData?.hasClaimed) {
            return null;
          }
          if (rewardsData?.nothingToClaim)
            return (
              <>
                <Text
                  fontFamily="heading"
                  fontSize="sm"
                  fontWeight="700"
                  lineHeight="5"
                  color="whiteAlpha.900"
                >
                  —
                </Text>
                <Text fontFamily="heading" fontSize="xs" lineHeight="4" color="whiteAlpha.600">
                  —
                </Text>
              </>
            );
          return (
            <Flex flexDirection="column">
              <span>{formatNumber(rewardsData?.sUSDRewards.toNumber() || 0)} sUSD</span>
              <span>{formatNumber(rewardsData?.snxRewards.toNumber() || 0)} SNX</span>
            </Flex>
          );
        }}
        RewardsBadge={() => {
          const onTarget = variant === 'success';

          const hasClaimed = rewardsData?.hasClaimed;
          const nothingToClaim = rewardsData?.nothingToClaim;
          if (!hasClaimed && nothingToClaim) {
            return null;
          }
          return (
            <Badge
              py={0.5}
              px={1}
              fontSize="2xs"
              variant={!onTarget ? 'warning' : hasClaimed ? 'gray' : 'success'}
              mt={0.5}
              w="fit-content"
              fontWeight="700"
            >
              {variant === 'warning' ||
                (variant === 'error' && (
                  <InfoOutline color="warning" mb="1.75px" mr="2px" height="12px" width="12px" />
                ))}
              {!onTarget
                ? t('staking-v2.earn.badges.maintain')
                : rewardsData?.hasClaimed
                ? t('staking-v2.earn.badges.claimed')
                : t('staking-v2.earn.badges.claimable')}
            </Badge>
          );
        }}
        claimBtn={
          <ClaimRewardsBtn
            variant={variant}
            amountSNX={rewardsData?.snxRewards.toNumber()}
            amountsUSD={rewardsData?.sUSDRewards.toNumber()}
          />
        }
      />
      <Divider my={4} />
      <RewardsItemUI
        Icon={() => <SNXIcon height="40px" width="40px" />}
        title={t('staking-v2.earn.liquidation-rewards.title')}
        description={t('staking-v2.earn.liquidation-rewards.description')}
        apyReturn={null}
        stakedBalance={`${formatNumber(stakedSnx.toNumber()).toString()} SNX`}
        endDate={null}
        isLoading={isLoading}
        RewardBalance={() => {
          if (liquidationData?.liquidatorRewards.eq(0)) return <>-</>;
          return <>{formatNumber(liquidationData?.liquidatorRewards?.toNumber() || 0)} SNX</>;
        }}
        RewardsBadge={() => {
          const nothingToClaim = liquidationData?.liquidatorRewards.eq(0);
          const hasClaimed = false; // TODO figure out a way to know if a user has ever claimed liq rewards
          if (nothingToClaim && !hasClaimed) return null;
          return (
            <Badge
              py={0.5}
              px={1}
              fontSize="2xs"
              variant={hasClaimed ? 'gray' : 'success'}
              mt={0.5}
              w="fit-content"
              fontWeight="700"
            >
              {hasClaimed
                ? t('staking-v2.earn.badges.claimed')
                : t('staking-v2.earn.badges.claimable')}
            </Badge>
          );
        }}
        claimBtn={<ClaimLiquidationBtn amountSNX={liquidationData?.liquidatorRewards.toNumber()} />}
      />
      <Divider my={4} />
      {/* Curve disabled for now */}
      {/* <RewardsItemUI
        Icon={() => (
          <Box
            bg="black"
            borderRadius="full"
            w="37px"
            h="37px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CurveIcon height="24px" width="24px" />
          </Box>
        )}
        title="Curve"
        description="sUSD CPT Rewards"
        apyReturn="24.00%"
        stakedBalance={null}
        endDate={null}
        isLoading={false}
        rewardBalance=""
        claimBtn={
          <Button
            onClick={() => {
              console.log('Curve');
            }}
            w={['100%', '100%', '100%', '80px']}
            ml={[6, 6, 6, 4]}
          >
            Claim
          </Button>
        }
      /> */}
      {/* <Divider my={4} /> */}
    </Box>
  );
};
