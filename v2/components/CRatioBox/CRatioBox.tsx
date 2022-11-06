import { FC } from 'react';
import { Flex, Box, Heading, Badge, Divider, Text, Tooltip, Skeleton } from '@chakra-ui/react';
import { ArrowRight, InfoIcon } from '@snx-v2/icons';
import { formatPercent } from '@snx-v2/formatters';
import { badgeColor, getHealthVariant } from '@snx-v2/getHealthVariant';
import { useTranslation } from 'react-i18next';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';

const calcNewCratioPercentage = (
  collateral?: number,
  SNXRate?: number,
  newDebtBalance?: number
) => {
  if (!collateral || !SNXRate || newDebtBalance == undefined) return undefined;
  if (newDebtBalance === 0) return 0;
  const collateralValue = SNXRate * collateral;
  return 1 / (newDebtBalance / collateralValue);
};

const calculateNewDebtBalance = (
  actionType: 'mint' | 'burn',
  debtBalance?: number,
  amount?: number
) => {
  if (!debtBalance || !amount) return 0;
  return actionType === 'burn' ? Math.max(debtBalance - amount, 0) : debtBalance + amount;
};

export const CRatioBoxUi: FC<{
  actionType: 'mint' | 'burn';
  amount?: number;
  currentCRatioPercentage?: number;
  targetCRatioPercentage?: number;
  liquidationRatioPercentage?: number;
  collateral?: number;
  debtBalance?: number;
  SNXRate?: number;
  targetThreshold?: number;
}> = ({
  currentCRatioPercentage,
  targetCRatioPercentage,
  liquidationRatioPercentage,
  debtBalance,
  collateral,
  SNXRate,
  amount,
  actionType,
  targetThreshold,
}) => {
  const { t } = useTranslation();

  const healthVariant = getHealthVariant({
    currentCRatioPercentage,
    targetCratioPercentage: targetCRatioPercentage,
    liquidationCratioPercentage: liquidationRatioPercentage,
    targetThreshold,
  });
  const newDebtBalance = calculateNewDebtBalance(actionType, debtBalance, amount);
  const newCratioPercentage = calcNewCratioPercentage(collateral, SNXRate, newDebtBalance);
  const badgeHealthVariant = getHealthVariant({
    currentCRatioPercentage:
      amount && newCratioPercentage !== undefined
        ? newCratioPercentage * 100
        : currentCRatioPercentage,
    targetCratioPercentage: targetCRatioPercentage,
    liquidationCratioPercentage: liquidationRatioPercentage,
    targetThreshold,
  });

  const cRatioHealth = t(`staking-v2.cratio-box.${badgeHealthVariant}`);
  return (
    <Box>
      <Flex px={4} pt={2} justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Heading fontSize="xs" lineHeight="4">
          {t('staking-v2.cratio-box.current-health')}
          <Tooltip hasArrow label="Soonthetix">
            <span>
              <InfoIcon ml={1} mb={0.5} />
            </span>
          </Tooltip>
        </Heading>
        <Box>
          <Flex alignItems="center">
            <Text
              data-testid="current c-ratio badge"
              color={badgeColor(healthVariant).color}
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
            {newCratioPercentage !== undefined && amount ? (
              <>
                <ArrowRight mx={1} color="white" />
                <Text
                  data-testid="new c-ratio badge"
                  color={
                    badgeColor(
                      getHealthVariant({
                        targetCratioPercentage: targetCRatioPercentage,
                        liquidationCratioPercentage: liquidationRatioPercentage,
                        currentCRatioPercentage: newCratioPercentage * 100,
                        targetThreshold,
                      })
                    ).color
                  }
                  fontFamily="mono"
                  fontSize="lg"
                  textAlign="end"
                >
                  {formatPercent(newCratioPercentage, { maximumFractionDigits: 0 })}
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
        ) : null}
      </Flex>
      <Divider />
      <Flex py={2} px={4} justifyContent="space-between" alignItems="center">
        <Heading fontSize="xs" lineHeight="4">
          {t('staking-v2.cratio-box.target-health')}

          <Tooltip hasArrow label="Soonthetix">
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

export const CRatioBox: FC<{ actionType: 'mint' | 'burn'; amount?: number }> = ({
  amount,
  actionType,
}) => {
  const { data: debtData } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();

  return (
    <CRatioBoxUi
      amount={amount}
      actionType={actionType}
      liquidationRatioPercentage={debtData?.liquidationRatioPercentage.toNumber()}
      targetCRatioPercentage={debtData?.targetCRatioPercentage.toNumber()}
      currentCRatioPercentage={debtData?.currentCRatioPercentage.toNumber()}
      collateral={debtData?.collateral.toNumber()}
      debtBalance={debtData?.debtBalance.toNumber()}
      SNXRate={exchangeRateData?.SNX?.toNumber()}
      targetThreshold={debtData?.targetThreshold.toNumber()}
    />
  );
};
