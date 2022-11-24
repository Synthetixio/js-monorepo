import { FC } from 'react';
import { Flex, Box, Heading, Badge, Divider, Text, Tooltip, Skeleton } from '@chakra-ui/react';
import { ArrowRight, InfoIcon } from '@snx-v2/icons';
import { formatPercent } from '@snx-v2/formatters';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { useTranslation } from 'react-i18next';
import { useDebtData } from '@snx-v2/useDebtData';

function getBadgeColor(healthVariant: string) {
  switch (healthVariant) {
    case 'success':
      return {
        color: 'green.400',
        bg: 'green.900',
      };

    case 'warning':
      return {
        color: 'orange.400',
        bg: 'orange.900',
      };

    case 'error':
      return {
        color: 'red.400',
        bg: 'red.900',
      };
    case 'not-staking':
      return {
        color: 'white',
        bg: 'gray.500',
      };

    default:
      return {
        color: 'green.400',
        bg: 'green.900',
      };
  }
}

export const CRatioBoxUi: FC<{
  currentCRatioPercentage?: number;
  targetCRatioPercentage?: number;
  liquidationRatioPercentage?: number;
  newCratioPercentage?: number;
  targetThreshold?: number;
}> = ({
  currentCRatioPercentage,
  targetCRatioPercentage,
  liquidationRatioPercentage,
  newCratioPercentage,
  targetThreshold,
}) => {
  const { t } = useTranslation();

  const healthVariant = getHealthVariant({
    currentCRatioPercentage,
    targetCratioPercentage: targetCRatioPercentage,
    liquidationCratioPercentage: liquidationRatioPercentage,
    targetThreshold,
  });
  const badgeHealthVariant =
    newCratioPercentage === 0
      ? 'not-staking'
      : getHealthVariant({
          currentCRatioPercentage:
            newCratioPercentage !== undefined ? newCratioPercentage : currentCRatioPercentage,
          targetCratioPercentage: targetCRatioPercentage,
          liquidationCratioPercentage: liquidationRatioPercentage,
          targetThreshold,
        });

  return (
    <Box>
      <Flex px={4} pt={2} justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Heading fontSize="sm" lineHeight="4">
          {t('staking-v2.cratio-box.current-health')}
          <Tooltip hasArrow label={t('staking-v2.cratio-box.current-health-tooltip')}>
            <span>
              <InfoIcon ml={1} mb={0.5} />
            </span>
          </Tooltip>
        </Heading>
        <Box>
          <Flex alignItems="center">
            <Text
              data-testid="current c-ratio badge"
              color={getBadgeColor(healthVariant).color}
              fontFamily="mono"
              fontSize="lg"
              textAlign="end"
            >
              {currentCRatioPercentage ? (
                formatPercent(currentCRatioPercentage / 100, {
                  maximumFractionDigits: 0,
                })
              ) : (
                <Skeleton width={12} h={5} />
              )}
            </Text>
            {newCratioPercentage !== undefined ? (
              <>
                <ArrowRight mx={1} color="white" />
                <Text
                  data-testid="new c-ratio badge"
                  color={getBadgeColor(badgeHealthVariant).color}
                  fontFamily="mono"
                  fontSize="lg"
                  textAlign="end"
                >
                  {newCratioPercentage === 0
                    ? 'N/A'
                    : formatPercent(newCratioPercentage / 100, { maximumFractionDigits: 0 })}
                </Text>
              </>
            ) : null}
          </Flex>
        </Box>
      </Flex>
      <Flex justifyContent="flex-end" px={4} mb={2} mt={1}>
        {currentCRatioPercentage ? (
          <Badge
            data-testid="healthy badge"
            color={getBadgeColor(badgeHealthVariant).color}
            bg={getBadgeColor(badgeHealthVariant).bg}
            borderColor={getBadgeColor(badgeHealthVariant).color}
            borderWidth="1px"
            py={0}
            px={1}
            borderRadius="base"
          >
            <span>
              <InfoIcon mr={1} mb={0.5} color="currentcolor" width="12px" height="12px" />
            </span>
            {t(`staking-v2.cratio-box.${badgeHealthVariant}`)}
          </Badge>
        ) : null}
      </Flex>
      <Divider />
      <Flex py={2} px={4} justifyContent="space-between" alignItems="center">
        <Heading fontSize="sm" lineHeight="4">
          {t('staking-v2.cratio-box.target-health')}
          <Tooltip hasArrow label={t('staking-v2.cratio-box.target-health')}>
            <span>
              <InfoIcon ml={1} mb={0.5} />
            </span>
          </Tooltip>
        </Heading>
        <Text data-testid="target-ratio badge" color="green.400" fontFamily="mono" fontSize="lg">
          {targetCRatioPercentage ? (
            formatPercent(targetCRatioPercentage / 100, { maximumFractionDigits: 0 })
          ) : (
            <Skeleton width={12} h={5} />
          )}
        </Text>
      </Flex>
    </Box>
  );
};

export const CRatioBox: FC<{ newCratioPercentage?: number }> = ({ newCratioPercentage }) => {
  const { data: debtData } = useDebtData();
  return (
    <CRatioBoxUi
      newCratioPercentage={newCratioPercentage}
      liquidationRatioPercentage={debtData?.liquidationRatioPercentage.toNumber()}
      targetCRatioPercentage={debtData?.targetCRatioPercentage.toNumber()}
      currentCRatioPercentage={debtData?.currentCRatioPercentage.toNumber()}
      targetThreshold={debtData?.targetThreshold.toNumber()}
    />
  );
};
