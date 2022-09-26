import {
  Container,
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
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { wei } from '@synthetixio/wei';
import { EXTERNAL_LINKS } from 'constants/links';
import { useTranslation, Trans } from 'react-i18next';
import { Mint } from '../../components/Mint';

const V2Mint = () => {
  const { t } = useTranslation();

  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();
  const { data: exchangeRateData, isLoading: isExchangeRateLoading } = useExchangeRatesData();
  const { data: synthsData, isLoading: isSynthsLoading } = useSynthsBalances();

  const isCurrentStaker = debtData?.currentCRatio.gt(0);
  const liquidationCRatio = debtData?.liquidationRatioPercentage.toNumber();
  const targetCRatio = debtData?.targetCRatioPercentage.toNumber();
  const currentCRatio = debtData?.currentCRatioPercentage.toNumber();

  const healthVariant = getHealthVariant({
    currentCRatioPercentage: currentCRatio,
    targetCratioPercentage: targetCRatio,
    liquidationCratioPercentage: liquidationCRatio,
  });

  const cRatioHealth = t(`staking-v2.mint.${healthVariant}`);

  const exchangeRate =
    (targetCRatio && exchangeRateData?.SNX?.div(targetCRatio / 100).toNumber()) || 0;

  const isLoading = isDebtDataLoading || isExchangeRateLoading || isSynthsLoading;

  return (
    <Box bg="navy.900" height="100%">
      <Container pt={12} pb={16} bg="navy.900" maxW="4xl">
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
                    liquidationCratioPercentage={liquidationCRatio || 0}
                    currentCRatioPercentage={currentCRatio || 0}
                    targetCratioPercentage={targetCRatio || 0}
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
                          <InfoIcon ml={1} mb={0.5} width="16px" height="16px" />
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
                        {`${currentCRatio?.toFixed(0)}%`}
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
                            <InfoIcon
                              mr={1}
                              mb={0.5}
                              color={badgeColor(healthVariant)}
                              width="12px"
                              height="12px"
                            />
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
                          <InfoIcon ml={1} mb={0.5} width="16px" height="16px" />
                        </span>
                      </Tooltip>
                    </Heading>
                    <Text color="green.400" fontFamily="mono" fontSize="lg">
                      {`${targetCRatio?.toFixed(0)}%`}
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
              <Text color="green.400" fontFamily="mono" fontSize="md">
                07:14:55
              </Text>
            </Flex>
            <Flex flexDirection="column" alignItems="flex-end">
              <Text color="whiteAlpha.700" fontWeight="bold" fontSize="xs" lineHeight="4">
                {t('staking-v2.mint.snx-price')}
              </Text>
              <Text color="green.400" fontFamily="mono" fontSize="md">
                ${exchangeRateData?.SNX?.toString(2) || wei(0).toString(2)}
              </Text>
            </Flex>
          </Flex>
        )}
        <Mint
          snxBalance={debtData?.collateral || wei(0)}
          susdBalance={synthsData?.balancesMap['sUSD']?.balance || wei(0)}
          gasPrice={wei(20)}
          exchangeRate={exchangeRate}
          isLoading={isLoading}
        />
      </Container>
    </Box>
  );
};

export default V2Mint;
