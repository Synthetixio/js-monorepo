import { FC } from 'react';
import { Text, Box, Flex, Tooltip, Link, Heading, Badge, Skeleton } from '@chakra-ui/react';
import { CRatioProgressBar } from '@snx-v2/CRatioHealthCard';
import { getHealthVariant, badgeColor } from '@snx-v2/getHealthVariant';
import { InfoIcon } from '@snx-v2/icons';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { useTranslation, Trans } from 'react-i18next';
import { useDebtData } from '@snx-v2/useDebtData';

export const BurnHeader: FC<{ burnAmountSusd: number }> = ({ burnAmountSusd }) => {
  const { t } = useTranslation();
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();

  const liquidationCratioPercentage = debtData?.liquidationRatioPercentage.toNumber();
  const targetCratioPercentage = debtData?.targetCRatioPercentage.toNumber();
  const currentCRatioPercentage = debtData?.currentCRatioPercentage.toNumber();

  const healthVariant = getHealthVariant({
    currentCRatioPercentage,
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
          w="62.5%"
          pt={3}
          px={4}
          borderRadius="md"
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
                {`${currentCRatioPercentage?.toFixed(0) || 0}%`}
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
                      color={badgeColor(healthVariant).color}
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
