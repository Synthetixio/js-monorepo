import { FC } from 'react';
import {
  Box,
  Center,
  Fade,
  Flex,
  Link,
  Skeleton,
  SkeletonText,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { CRatioProgressBar } from '@snx-v2/CRatioProgressBar';
import { InfoIcon } from '@snx-v2/icons';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { Trans, useTranslation } from 'react-i18next';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { formatNumber } from '@synthetixio/formatters';
import { CountDown } from '@snx-v2/CountDown';
import { useDebtData } from '@snx-v2/useDebtData';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import { leftColWidth, rightColWidth } from './layout';
import { CRatioBox } from '../CRatioBox';
import { calcNewCratioPercentage, calculateNewDebtBalance } from '@snx-v2/stakingCalculations';

const NewStakerHeader: FC<{ nextEpochStartDate?: Date; SNXRate?: number }> = ({
  nextEpochStartDate,
  SNXRate,
}) => {
  const { t } = useTranslation();

  return (
    <Flex justifyContent="space-between" mx={6} my={2}>
      <Flex flexDirection="column" alignItems="flex-start">
        <Text
          color="whiteAlpha.700"
          verticalAlign="middle"
          fontWeight="bold"
          fontSize="xs"
          lineHeight="4"
        >
          {t('staking-v2.mint.epoch')}
          <Tooltip hasArrow label={t('staking-v2.mint.epoch-tooltip')}>
            <Box as="span" ml={1}>
              <InfoIcon color="whiteAlpha.700" width="12px" height="12px" mb={0.5} />
            </Box>
          </Tooltip>
        </Text>
        {nextEpochStartDate ? (
          <Text color="green.400" fontFamily="mono" fontSize="md">
            <CountDown toDate={nextEpochStartDate} />
          </Text>
        ) : (
          <Skeleton />
        )}
      </Flex>
      <Flex flexDirection="column" alignItems="flex-end">
        <Text color="whiteAlpha.700" fontWeight="bold" fontSize="xs" lineHeight="4">
          {t('staking-v2.mint.snx-price')}
        </Text>
        <Text color="green.400" fontFamily="mono" fontSize="md">
          ${formatNumber(SNXRate || 0)}
        </Text>
      </Flex>
    </Flex>
  );
};
export const MintHeaderUi: FC<{
  mintAmountSUSD?: number;
  currentCRatioPercentage?: number;
  collateral?: number;
  debtBalance?: number;
  SNXRate?: number;
  isDebtDataLoading?: boolean;
  isExchangeRateLoading?: boolean;
  nextEpochStartDate?: Date;
}> = ({
  mintAmountSUSD,
  currentCRatioPercentage,
  SNXRate,
  isDebtDataLoading,
  debtBalance,
  collateral,
  isExchangeRateLoading,
  nextEpochStartDate,
}) => {
  const { t } = useTranslation();

  const isLoading = isDebtDataLoading || isExchangeRateLoading;
  const isCurrentStaker = (currentCRatioPercentage || 0) > 0;
  const newDebtBalance = calculateNewDebtBalance('mint', debtBalance, mintAmountSUSD);
  const newCratioPercentage = calcNewCratioPercentage(collateral, SNXRate, newDebtBalance);

  return (
    <>
      <Skeleton
        textAlign="center"
        isLoaded={!isLoading}
        w="50%"
        margin="0 auto"
        fadeDuration={1}
        startColor="gray.900"
        endColor="gray.700"
      >
        <Text
          fontSize="xl"
          fontFamily="heading"
          fontWeight={700}
          textAlign="center"
          mb={3}
          lineHeight="base"
          data-testid="mint header"
        >
          {isCurrentStaker ? t('staking-v2.mint.title-existing') : t('staking-v2.mint.title-new')}
        </Text>
      </Skeleton>
      <Center>
        <SkeletonText
          startColor="gray.900"
          endColor="gray.700"
          isLoaded={!isLoading}
          w="75%"
          spacing="2"
          textAlign="center"
          fadeDuration={1}
          sx={{
            div: {
              marginLeft: 'auto',
              marginRight: 'auto',
            },
          }}
        >
          <Text textAlign="center" color="gray.600" mb={4}>
            <Trans
              i18nKey="staking-v2.mint.description"
              components={[
                <Link
                  color="cyan.400"
                  target="_blank"
                  href={EXTERNAL_LINKS.Synthetix.StakingGuide}
                />,
              ]}
            />
          </Text>
        </SkeletonText>
      </Center>

      {isCurrentStaker ? (
        <Box display={{ base: 'none', md: 'block' }}>
          <Fade in={!isLoading}>
            <Flex justifyContent="space-between" mb={8}>
              <Flex
                display="flex"
                alignItems="center"
                bg="black"
                w={leftColWidth}
                pt={3}
                px={4}
                borderRadius="base"
                borderWidth="1px"
                borderColor="gray.900"
              >
                <CRatioProgressBar newCratioPercentage={newCratioPercentage} />
              </Flex>
              <Flex
                bg="black"
                w={rightColWidth}
                borderRadius="base"
                borderWidth="1px"
                borderColor="gray.900"
                flexDirection="column"
                justifyContent="space-between"
              >
                <CRatioBox newCratioPercentage={newCratioPercentage} />
              </Flex>
            </Flex>
          </Fade>
        </Box>
      ) : (
        <NewStakerHeader nextEpochStartDate={nextEpochStartDate} SNXRate={SNXRate} />
      )}
    </>
  );
};

export const MintHeader: FC<{ mintAmountSUSD?: number }> = ({ mintAmountSUSD }) => {
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();
  const { data: exchangeRateData, isLoading: isExchangeRateLoading } = useExchangeRatesData();
  const { data: feePoolData } = useFeePoolData();

  return (
    <MintHeaderUi
      mintAmountSUSD={mintAmountSUSD}
      currentCRatioPercentage={debtData?.currentCRatioPercentage.toNumber()}
      SNXRate={exchangeRateData?.SNX?.toNumber()}
      isDebtDataLoading={isDebtDataLoading}
      isExchangeRateLoading={isExchangeRateLoading}
      nextEpochStartDate={feePoolData?.nextFeePeriodStartDate}
      debtBalance={debtData?.debtBalance.toNumber()}
      collateral={debtData?.collateral.toNumber()}
    />
  );
};
