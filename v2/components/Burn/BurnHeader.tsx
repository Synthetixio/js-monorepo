import { FC } from 'react';
import {
  Text,
  Box,
  Flex,
  Tooltip,
  Link,
  Heading,
  Badge,
  Skeleton,
  Divider,
} from '@chakra-ui/react';
import { CRatioProgressBar } from '@snx-v2/CRatioHealthCard';
import { getHealthVariant, badgeColor } from '@snx-v2/getHealthVariant';
import { ArrowRight, InfoIcon } from '@snx-v2/icons';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { useTranslation, Trans } from 'react-i18next';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { formatPercent } from '@snx-v2/formatters';

const calcNewCratioPercentage = (
  collateral?: number,
  SNXRate?: number,
  debtBalance?: number,
  burnAmountSusd?: number
) => {
  if (!collateral || !SNXRate || !debtBalance || !burnAmountSusd) return undefined;
  const collateralValue = SNXRate * collateral;
  const newDebtBalance = debtBalance - burnAmountSusd;
  return 1 / (newDebtBalance / collateralValue);
};
export const BurnHeader: FC<{ burnAmountSusd: number }> = ({ burnAmountSusd }) => {
  const { t } = useTranslation();
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();

  const liquidationCratioPercentage = debtData?.liquidationRatioPercentage.toNumber();
  const targetCratioPercentage = debtData?.targetCRatioPercentage.toNumber();
  const currentCRatioPercentage = debtData?.currentCRatioPercentage.toNumber();
  const newCratioPercentage = calcNewCratioPercentage(
    debtData?.collateral.toNumber(),
    exchangeRateData?.SNX?.toNumber(),
    debtData?.debtBalance.toNumber(),
    burnAmountSusd
  );

  const healthVariant = getHealthVariant({
    currentCRatioPercentage,
    targetCratioPercentage,
    liquidationCratioPercentage,
  });

  const badgeHealthVariant = getHealthVariant({
    currentCRatioPercentage: newCratioPercentage
      ? newCratioPercentage * 100
      : currentCRatioPercentage,
    targetCratioPercentage,
    liquidationCratioPercentage,
  });

  const isLoading = isDebtDataLoading;

  const cRatioHealth = t(`staking-v2.mint.${healthVariant}`);
  return (
    <>
      <Text
        fontSize="xl"
        fontFamily="heading"
        fontWeight={700}
        textAlign="center"
        mb={3}
        lineHeight="base"
        data-testid="burn header"
      >
        {t('staking-v2.burn.title')}
      </Text>

      <Text textAlign="center" color="gray.600" mb={4} mx={6}>
        <Trans
          i18nKey="staking-v2.burn.description"
          components={[
            <Link target="_blank" color="cyan.400" href={EXTERNAL_LINKS.Synthetix.StakingGuide} />,
          ]}
        />
      </Text>
      <Flex mt={2} mb={6} justifyContent="space-between">
        <Skeleton
          display="flex"
          alignItems="center"
          startColor="gray.900"
          endColor="gray.700"
          isLoaded={!isLoading}
          bg="black"
          w="58%"
          pt={3}
          px={4}
          borderRadius="base"
          borderWidth="1px"
          borderColor="gray.900"
          fadeDuration={1}
        >
          <CRatioProgressBar
            liquidationCratioPercentage={liquidationCratioPercentage || 0}
            currentCRatioPercentage={currentCRatioPercentage || 0}
            targetCratioPercentage={targetCratioPercentage || 0}
          />
        </Skeleton>
        <Skeleton
          startColor="gray.900"
          endColor="gray.700"
          isLoaded={!isLoading}
          bg="black"
          w="40%"
          borderRadius="base"
          borderWidth="1px"
          borderColor="gray.900"
          flexDirection="column"
          justifyContent="space-between"
          fadeDuration={1}
        >
          <Flex px={4} pt={4} justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Heading fontSize="xs" lineHeight="4">
              Current Health
              <Tooltip hasArrow label="Soonthetix">
                <span>
                  <InfoIcon ml={1} mb={0.5} />
                </span>
              </Tooltip>
            </Heading>
            <Box>
              <Flex alignItems="center">
                <Text
                  color={badgeColor(healthVariant).color}
                  fontFamily="mono"
                  fontSize="lg"
                  textAlign="end"
                >
                  {currentCRatioPercentage ? formatPercent(currentCRatioPercentage / 100) : '0%'}
                </Text>
                {newCratioPercentage ? (
                  <>
                    <ArrowRight mx={1} color="white" />
                    <Text
                      color={
                        badgeColor(
                          getHealthVariant({
                            targetCratioPercentage,
                            liquidationCratioPercentage,
                            currentCRatioPercentage: newCratioPercentage * 100,
                          })
                        ).color
                      }
                      fontFamily="mono"
                      fontSize="lg"
                      textAlign="end"
                    >
                      {formatPercent(newCratioPercentage)}
                    </Text>
                  </>
                ) : null}
              </Flex>
            </Box>
          </Flex>
          <Flex justifyContent="flex-end" px={4} mb={4} mt={1}>
            <Badge
              color={badgeColor(badgeHealthVariant).color}
              bg={badgeColor(badgeHealthVariant).border}
              borderColor={badgeColor(badgeHealthVariant).color}
              borderWidth="1px"
              py={0}
              px={1}
              borderRadius="base"
            >
              <Tooltip hasArrow label="Soonthetix">
                <span>
                  <InfoIcon mr={1} mb={0.5} color="currentcolor" width="12px" height="12px" />
                </span>
              </Tooltip>
              {cRatioHealth}
            </Badge>
          </Flex>
          <Divider />
          <Flex py={2} px={4} justifyContent="space-between" alignItems="center">
            <Heading fontSize="xs" lineHeight="4">
              Target Health
              <Tooltip hasArrow label="Soonthetix">
                <span>
                  <InfoIcon ml={1} mb={0.5} />
                </span>
              </Tooltip>
            </Heading>
            <Text color="green.400" fontFamily="mono" fontSize="lg">
              {`${targetCratioPercentage?.toFixed(0) || 0}%`}
            </Text>
          </Flex>
        </Skeleton>
      </Flex>
    </>
  );
};
