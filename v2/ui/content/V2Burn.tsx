import {
  Container,
  Text,
  Box,
  Flex,
  Tooltip,
  Link,
  Heading,
  Badge,
  Skeleton,
} from '@chakra-ui/react';
import { Burn } from '@snx-v2/Burn';
import { CRatioProgressBar } from '@snx-v2/CRatioHealthCard';
import { Synths } from '@snx-v2/currency';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { InfoIcon } from '@snx-v2/icons';
import { useDebtData } from '@snx-v2/useDebtData';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { wei } from '@synthetixio/wei';
import { EXTERNAL_LINKS } from 'constants/links';
import { useTranslation, Trans } from 'react-i18next';

const V2Burn = () => {
  const { t } = useTranslation();

  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();
  const { data: synthsData, isLoading: isSynthsLoading } = useSynthsBalances();

  const liquidationCRatio = debtData?.liquidationRatioPercentage.toNumber();
  const targetCRatio = debtData?.targetCRatioPercentage.toNumber();
  const currentCRatio = debtData?.currentCRatioPercentage.toNumber();

  const healthVariant = getHealthVariant({
    currentCRatioPercentage: currentCRatio,
    targetCratioPercentage: targetCRatio,
    liquidationCratioPercentage: liquidationCRatio,
  });

  const cRatioHealth = t(`staking-v2.mint.${healthVariant}`);

  const isLoading = isDebtDataLoading || isSynthsLoading;

  return (
    <Box bg="navy.900" height="100%">
      <Container pt={12} pb={16} bg="navy.900" maxW="4xl">
        <Text
          fontSize="xl"
          fontFamily="heading"
          fontWeight={700}
          textAlign="center"
          mb={3}
          lineHeight="base"
        >
          {t('staking-v2.burn.title')}
        </Text>

        <Text textAlign="center" color="gray.600" mb={4} mx={10}>
          <Trans
            i18nKey="staking-v2.burn.description"
            components={[
              <Link
                target="_blank"
                color="cyan.400"
                href={EXTERNAL_LINKS.Synthetix.StakingGuide}
              />,
            ]}
          />
        </Text>
        <Flex mt={2} mb={6} justifyContent="space-between">
          <Skeleton
            startColor="gray.900"
            endColor="gray.700"
            isLoaded={!isLoading}
            bg="black"
            w="62.5%"
            pt={4}
            px={4}
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.900"
            fadeDuration={1}
          >
            <CRatioProgressBar
              liquidationCratioPercentage={liquidationCRatio || 0}
              currentCRatioPercentage={currentCRatio || 0}
              targetCratioPercentage={targetCRatio || 0}
            />
          </Skeleton>
          <Skeleton
            startColor="gray.900"
            endColor="gray.700"
            isLoaded={!isLoading}
            bg="black"
            w="34%"
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.900"
            flexDirection="column"
            justifyContent="space-between"
            fadeDuration={1}
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
                <Text color="green.400" fontFamily="mono" fontSize="lg" textAlign="end">
                  {`${currentCRatio?.toFixed(0) || 0}%`}
                </Text>
                <Badge
                  color="green.400"
                  bg="green.900"
                  borderColor="green.400"
                  borderWidth="1px"
                  py={0}
                  px={1}
                  borderRadius="md"
                >
                  <Tooltip hasArrow label="Soonthetix">
                    <span>
                      <InfoIcon mr={1} mb={0.5} color="green.400" width="12px" height="12px" />
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
                {`${targetCRatio?.toFixed(0) || 0}%`}
              </Text>
            </Flex>
          </Skeleton>
        </Flex>
        <Burn
          snxBalance={debtData?.collateral || wei(0)}
          susdBalance={synthsData?.balancesMap[Synths.sUSD]?.balance || wei(0)}
          activeDebt={debtData?.debtBalance || wei(0)}
          gasPrice={wei(20)}
          exchangeRate={0.25}
          isLoading={isLoading}
        />
      </Container>
    </Box>
  );
};

export default V2Burn;
