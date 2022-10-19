import { FC } from 'react';
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { formatNumber, formatPercent } from '@snx-v2/formatters';
import { ArrowRight, InfoIcon } from '@snx-v2/icons';
import {
  calculateBurnAmountFromUnstaking,
  calculateChangesFromBurn,
  calculateChangesFromMint,
  calculateMintAmountFromStaking,
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
  textColor = 'white',
  tooltipText = 'Soonthetix',
}: {
  label: string;
  oldVal: string;
  newVal: string;
  textColor?: string;
  tooltipText?: string;
}) => {
  return (
    <Flex color={textColor} justifyContent="space-between" fontSize="xs" mt={4}>
      <Tooltip label={tooltipText} hasArrow>
        <Flex alignItems="center">
          <Text fontWeight={700}>{label}</Text>
          <InfoIcon ml="1" />
        </Flex>
      </Tooltip>
      <Flex alignItems="center">
        <Text fontWeight={700}>{oldVal}</Text>
        <ArrowRight ml={2} mr={2} color="currentColor" />
        <Text fontWeight={700}>{newVal}</Text>
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
    <Box bg="whiteAlpha.200" p={4} mt={4} mb={4}>
      <Flex justifyContent="space-between" fontSize="xs">
        <Tooltip label="Soonthetix" hasArrow>
          <Flex alignItems="center">
            <Text fontWeight={700}>{t('staking-v2.mint-or-burn-changes.total-snx')}</Text>
            <InfoIcon ml="1" />
          </Flex>
        </Tooltip>
        <Text fontWeight={700}>{formatNumber(collateral)}</Text>
      </Flex>
      <Row
        label={t('staking-v2.mint-or-burn-changes.staked')}
        oldVal={formatNumber(stakedSnx)}
        newVal={formatNumber(changedValues.newStakedAmountSnx)}
        textColor="whiteAlpha.700"
      />
      <Row
        label={t('staking-v2.mint-or-burn-changes.transferable')}
        oldVal={formatNumber(transferable)}
        newVal={formatNumber(changedValues.newTransferable)}
        textColor="whiteAlpha.700"
      />
      <Row
        label={t('staking-v2.mint-or-burn-changes.c-ratio')}
        oldVal={formatPercent(currentCRatioPercentage / 100)}
        newVal={formatPercent(changedValues.newCratio > 0 ? 1 / changedValues.newCratio : 0)}
      />
      <Row
        label={t('staking-v2.mint-or-burn-changes.susd-balance')}
        oldVal={formatNumber(sUSDBalance)}
        newVal={formatNumber(changedValues.newSUSDBalance)}
      />
      <Row
        label={t('staking-v2.mint-or-burn-changes.active-debt')}
        oldVal={formatNumber(debtBalance)}
        newVal={formatNumber(changedValues.newDebtBalance)}
      />
    </Box>
  );
};
export const MintOrBurnChanges: FC<{ collateralChange: number; action: 'mint' | 'burn' }> = ({
  collateralChange,
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
    !collateralChange ||
    !exchangeRateData?.SNX ||
    sUSDBalance === undefined
  ) {
    return null;
  }
  const args = {
    debtBalance: debtData.debtBalance.toNumber(),
    stakedSnx: stakedSnx.toNumber(),
    transferable: debtData?.transferable.toNumber(),
    sUSDBalance: sUSDBalance,
    collateralUsdValue: debtData.collateral.mul(exchangeRateData.SNX).toNumber(),
  };
  const changedValues =
    action === 'mint'
      ? calculateChangesFromMint({
          ...args,
          stakeAmountSNX: collateralChange,
          mintAmountsUSD: parseFloat(
            calculateMintAmountFromStaking(
              String(collateralChange),
              debtData.targetCRatio.toNumber(),
              exchangeRateData.SNX?.toNumber()
            )
          ),
        })
      : calculateChangesFromBurn({
          ...args,
          snxUnstakingAmount: collateralChange,
          burnAmountSusd: parseFloat(
            calculateBurnAmountFromUnstaking(
              String(collateralChange),
              debtData.targetCRatio.toNumber(),
              exchangeRateData.SNX?.toNumber()
            )
          ),
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
