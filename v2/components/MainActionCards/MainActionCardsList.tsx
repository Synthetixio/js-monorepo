import { useDebtData } from '@snx-v2/useDebtData';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import { useRewardsAvailable } from '@snx-v2/useRewardsAvailable';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { MainActionCardsUi } from './MainActionCards';

export const MainActionCardsList: React.FC = () => {
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();
  const { data: feePoolData, isLoading: isFeePoolDataLoading } = useFeePoolData();
  const { data: rewardsData, isLoading: isRewardsDataLoading } = useRewardsAvailable();
  const { data: exchangeRateData, isLoading: isExchangeRateDataLoading } = useExchangeRatesData();

  const isLoading =
    isDebtDataLoading || isFeePoolDataLoading || isRewardsDataLoading || isExchangeRateDataLoading;

  return (
    <MainActionCardsUi
      isLoading={isLoading}
      currentCRatioPercentage={debtData?.currentCRatioPercentage.mul(100).toNumber()}
      targetCratioPercentage={debtData?.targetCRatioPercentage.mul(100).toNumber()}
      liquidationCratioPercentage={debtData?.liquidationRatioPercentage.mul(100).toNumber()}
      isFlagged={debtData?.liquidationDeadlineForAccount.gt(0)}
      hasClaimed={rewardsData?.hasClaimed}
      nextEpochStartDate={feePoolData?.nextFeePeriodStartDate}
      snxPrice={exchangeRateData?.SNX?.toString()}
    />
  );
};
