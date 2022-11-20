import { FC } from 'react';
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { formatNumber, formatPercent } from '@snx-v2/formatters';
import { ArrowRight, InfoIcon } from '@snx-v2/icons';
import {
  calculateChangesFromBurn,
  calculateChangesFromMint,
  calculateStakeAmountFromMint,
  calculateStakedSnx,
} from '@snx-v2/stakingCalculations';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { useTranslation } from 'react-i18next';

const Row = ({
  label,
  oldVal,
  newVal,

  tooltipText,
  secondary = false,
}: {
  label: string;
  oldVal: string;
  newVal: string;
  secondary?: boolean;
  tooltipText: string;
}) => {
  const color = secondary ? 'whiteAlpha.700' : 'white';
  const fontWeight = secondary ? 'normal' : 700;
  return (
    <Flex color={color} justifyContent="space-between" fontSize="xs" mt={secondary ? 1 : 4}>
      <Tooltip label={tooltipText} hasArrow>
        <Flex alignItems="center">
          <Text fontWeight={fontWeight}>{label}</Text>
          <InfoIcon color="currentcolor" ml="1" />
        </Flex>
      </Tooltip>
      <Flex alignItems="center">
        <Text fontWeight={fontWeight}>{oldVal}</Text>
        <ArrowRight ml={2} mr={2} color="currentColor" />
        <Text fontWeight={fontWeight}>{newVal}</Text>
      </Flex>
    </Flex>
  );
};

export const MintOrBurnChangesUi: FC<{
  collateral: number;
  stakedSnx: number;
  currentCRatioPercentage: number;
  transferable: number;
  debtBalance: number;
  sUSDBalance: number;
  changedValues: {
    newDebtBalance: number;
    newStakedAmountSnx: number;
    newCratio: number;
    newTransferable: number;
    newSUSDBalance: number;
  };
}> = ({
  collateral,
  stakedSnx,
  currentCRatioPercentage,
  transferable,
  debtBalance,
  sUSDBalance,
  changedValues,
}) => {
  const { t } = useTranslation();
  return (
    <Box bg="whiteAlpha.200" p={4} mt={4} mb={4} borderRadius="base">
      <Flex justifyContent="space-between" fontSize="xs">
        <Text fontWeight={700}>{t('staking-v2.mint-or-burn-changes.total-snx')}</Text>

        <Text fontWeight={700}>{formatNumber(collateral)}</Text>
      </Flex>
      <Row
        label={t('staking-v2.mint-or-burn-changes.staked')}
        tooltipText={t('staking-v2.mint-or-burn-changes.staked-tooltip')}
        oldVal={formatNumber(stakedSnx)}
        newVal={formatNumber(changedValues.newStakedAmountSnx)}
        secondary={true}
      />
      <Row
        label={t('staking-v2.mint-or-burn-changes.transferable')}
        tooltipText={t('staking-v2.mint-or-burn-changes.transferable-tooltip')}
        oldVal={formatNumber(transferable)}
        newVal={formatNumber(changedValues.newTransferable)}
        secondary={true}
      />
      <Row
        label={t('staking-v2.mint-or-burn-changes.c-ratio')}
        tooltipText={t('staking-v2.mint-or-burn-changes.c-ratio-tooltip')}
        oldVal={formatPercent(currentCRatioPercentage / 100)}
        newVal={formatPercent(changedValues.newCratio > 0 ? 1 / changedValues.newCratio : 0)}
      />
      <Row
        label={t('staking-v2.mint-or-burn-changes.susd-balance')}
        tooltipText={t('staking-v2.mint-or-burn-changes.susd-balance-tooltip')}
        oldVal={formatNumber(sUSDBalance)}
        newVal={formatNumber(changedValues.newSUSDBalance)}
      />
      <Row
        label={t('staking-v2.mint-or-burn-changes.active-debt')}
        tooltipText={t('staking-v2.mint-or-burn-changes.active-debt-tooltip')}
        oldVal={formatNumber(debtBalance)}
        newVal={formatNumber(changedValues.newDebtBalance)}
      />
    </Box>
  );
};
export const MintOrBurnChanges: FC<{ debtChange: number; action: 'mint' | 'burn' }> = ({
  debtChange,
  action,
}) => {
  const { data: debtData } = useDebtData();
  const { data: synthBalanceData } = useSynthsBalances();
  const { data: exchangeRateData } = useExchangeRatesData();
  const stakedSnx = calculateStakedSnx({ ...debtData });
  const sUSDBalance = synthBalanceData?.balancesMap.sUSD?.balance.toNumber() || 0;

  if (
    !debtData ||
    !synthBalanceData ||
    !exchangeRateData ||
    !debtChange ||
    !exchangeRateData?.SNX ||
    sUSDBalance === undefined
  ) {
    return null;
  }
  const args = {
    debtBalance: debtData.debtBalance.toNumber(),
    targetCRatio: debtData.targetCRatio.toNumber(),
    stakedSnx: stakedSnx.toNumber(),
    transferable: debtData?.transferable.toNumber(),
    sUSDBalance: sUSDBalance,
    collateralUsdValue: debtData.collateral.mul(exchangeRateData.SNX).toNumber(),
  };
  const changedValues =
    action === 'mint'
      ? calculateChangesFromMint({
          ...args,
          stakeAmountSNX:
            calculateStakeAmountFromMint(
              debtChange,
              debtData.targetCRatio.toNumber(),
              exchangeRateData.SNX.toNumber()
            ) || 0,
          mintAmountsUSD: debtChange,
        })
      : calculateChangesFromBurn({
          ...args,
          collateral: debtData.collateral.toNumber(),
          burnAmountSusd: debtChange,
        });

  return (
    <MintOrBurnChangesUi
      {...args}
      changedValues={changedValues}
      collateral={debtData.collateral.toNumber()}
      currentCRatioPercentage={debtData.currentCRatioPercentage.toNumber()}
    />
  );
};
