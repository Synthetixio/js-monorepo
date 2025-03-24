import { FC } from 'react';
import { Skeleton } from '@chakra-ui/react';
import { useDebtData } from '@snx-v2/useDebtData';
import { rightColWidth } from './layout';
import { CRatioBox } from '../CRatioBox';
import { calcNewCratioPercentage, calculateNewDebtBalance } from '@snx-v2/stakingCalculations';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';

export const BurnHeaderUi: FC<{
  burnAmountSusd?: number;
  isDebtDataLoading: boolean;
  collateral?: number;
  debtBalance?: number;
  SNXRate?: number;
}> = ({ burnAmountSusd, isDebtDataLoading, SNXRate, debtBalance, collateral }) => {
  const newDebtBalance = calculateNewDebtBalance('burn', debtBalance, burnAmountSusd);
  const newCratioPercentage = calcNewCratioPercentage(collateral, SNXRate, newDebtBalance);

  return (
    <Skeleton
      startColor="gray.900"
      endColor="gray.700"
      isLoaded={!isDebtDataLoading}
      bg="black"
      w={rightColWidth}
      borderRadius="base"
      borderWidth="1px"
      borderColor="gray.900"
      flexDirection="column"
      justifyContent="space-between"
      fadeDuration={1}
      width="100%"
      mb={3}
    >
      <CRatioBox newCratioPercentage={newCratioPercentage} />
    </Skeleton>
  );
};

export const BurnHeader: FC<{ burnAmountSusd?: number }> = ({ burnAmountSusd }) => {
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();

  return (
    <BurnHeaderUi
      burnAmountSusd={burnAmountSusd}
      isDebtDataLoading={isDebtDataLoading}
      SNXRate={exchangeRateData?.SNX?.toNumber()}
      debtBalance={debtData?.debtBalance.toNumber()}
      collateral={debtData?.collateral.toNumber()}
    />
  );
};
