import { FC } from 'react';
import {
  Text,
  Box,
  Flex,
  Tooltip,
  Link,
  Alert,
  AlertIcon,
  AlertDescription,
  Heading,
  Badge,
  Skeleton,
  SkeletonText,
  Center,
  Fade,
} from '@chakra-ui/react';
import { CRatioProgressBar } from '@snx-v2/CRatioHealthCard';
import { getHealthVariant, badgeColor } from '@snx-v2/getHealthVariant';
import { InfoIcon } from '@snx-v2/icons';

import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useTranslation, Trans } from 'react-i18next';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { formatNumber } from '@snx-v2/formatters';
import { CountDown } from '@snx-v2/CountDown';
import { useDebtData } from '@snx-v2/useDebtData';
import { useFeePoolData } from '@snx-v2/useFeePoolData';

export const MintHeaderUi: FC<{
  mintAmountSUSD: number;
  liquidationRatioPercentage?: number;
  targetCRatioPercentage?: number;
  currentCRatioPercentage?: number;
  collateral?: number;
  debtBalance?: number;
  SNXRate?: number;
  isDebtDataLoading?: boolean;
  isExchangeRateLoading?: boolean;
  nextEpochStartDate?: Date;
}> = ({
  //   mintAmountSUSD,
  liquidationRatioPercentage,
  targetCRatioPercentage,
  currentCRatioPercentage,
  //   collateral,
  //   debtBalance,
  SNXRate,
  isDebtDataLoading,
  isExchangeRateLoading,
  nextEpochStartDate,
}) => {
  const { t } = useTranslation();
  const healthVariant = getHealthVariant({
    currentCRatioPercentage,
    targetCratioPercentage: targetCRatioPercentage,
    liquidationCratioPercentage: liquidationRatioPercentage,
  });
  const cRatioHealth = t(`staking-v2.mint.${healthVariant}`);
  const isLoading = isDebtDataLoading || isExchangeRateLoading;
  const isCurrentStaker = (currentCRatioPercentage || 0) > 0;

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
        <>
          <Fade in={!isLoading}>
            <Alert my={6} status="warning">
              <AlertIcon />
              <AlertDescription pl={2} pr={[0, 0, 24]}>
                {t('staking-v2.mint.description-existing')}
              </AlertDescription>
            </Alert>
            <Flex mt={2} mb={6} justifyContent="space-between">
              <Flex
                bg="black"
                w="62.5%"
                pt={3}
                px={4}
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.900"
                alignItems="center"
              >
                <CRatioProgressBar
                  liquidationCratioPercentage={liquidationRatioPercentage || 0}
                  currentCRatioPercentage={currentCRatioPercentage || 0}
                  targetCratioPercentage={targetCRatioPercentage || 0}
                />
              </Flex>
              <Flex
                bg="black"
                w="34%"
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.900"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Flex
                  borderBottomColor="gray.900"
                  borderBottomWidth="1px"
                  height="50%"
                  p={4}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Heading fontSize="xs" lineHeight="4">
                    Current Health
                    <Tooltip hasArrow label="Soonthetix">
                      <span>
                        <InfoIcon ml={1} mb={0.5} />
                      </span>
                    </Tooltip>
                  </Heading>
                  <Box>
                    <Text
                      color={badgeColor(healthVariant).color}
                      fontFamily="mono"
                      fontSize="lg"
                      textAlign="end"
                    >
                      {`${currentCRatioPercentage?.toFixed(0)}%`}
                    </Text>
                    <Badge
                      color={badgeColor(healthVariant).color}
                      bg={badgeColor(healthVariant).border}
                      borderColor={badgeColor(healthVariant).color}
                      borderWidth="1px"
                      py={0}
                      px={1}
                      borderRadius="md"
                    >
                      <Tooltip hasArrow label="Soonthetix">
                        <span>
                          <InfoIcon mr={1} mb={0.5} color={badgeColor(healthVariant)} />
                        </span>
                      </Tooltip>
                      {cRatioHealth}
                    </Badge>
                  </Box>
                </Flex>
                <Flex height="50%" p={4} justifyContent="space-between" alignItems="center">
                  <Heading fontSize="xs" lineHeight="4">
                    Target Health
                    <Tooltip hasArrow label="Soonthetix">
                      <span>
                        <InfoIcon ml={1} mb={0.5} />
                      </span>
                    </Tooltip>
                  </Heading>
                  <Text color="green.400" fontFamily="mono" fontSize="lg">
                    {`${targetCRatioPercentage?.toFixed(0)}%`}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Fade>
        </>
      ) : (
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
              <Tooltip hasArrow label="Soonthetix">
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
      )}
    </>
  );
};

export const MintHeader: FC<{ mintAmountSUSD: number }> = ({ mintAmountSUSD }) => {
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();
  const { data: exchangeRateData, isLoading: isExchangeRateLoading } = useExchangeRatesData();
  const { data: feePoolData } = useFeePoolData();

  return (
    <MintHeaderUi
      mintAmountSUSD={mintAmountSUSD}
      liquidationRatioPercentage={debtData?.liquidationRatioPercentage.toNumber()}
      targetCRatioPercentage={debtData?.targetCRatioPercentage.toNumber()}
      currentCRatioPercentage={debtData?.currentCRatioPercentage.toNumber()}
      collateral={debtData?.collateral.toNumber()}
      debtBalance={debtData?.debtBalance.toNumber()}
      SNXRate={exchangeRateData?.SNX?.toNumber()}
      isDebtDataLoading={isDebtDataLoading}
      isExchangeRateLoading={isExchangeRateLoading}
      nextEpochStartDate={feePoolData?.nextFeePeriodStartDate}
    />
  );
};
