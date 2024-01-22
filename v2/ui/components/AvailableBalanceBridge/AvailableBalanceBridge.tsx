import { FC } from 'react';
import { StatBox } from '@snx-v2/StatBox';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { wei } from '@synthetixio/wei';
import { formatFiatCurrency } from '../../utils/formatters/number';
import { useTranslation } from 'react-i18next';

const AvailableBalanceBridge: FC = () => {
  const { data: synthsBalances, isLoading: isSynthsLoading } = useSynthsBalances();
  const { t } = useTranslation();
  return (
    <StatBox
      isLoading={isSynthsLoading}
      label={t('bridge.available-balance')}
      alignItems={{ base: 'center', lg: 'end' }}
      maxW={{ base: 'initial', lg: '282px' }}
      w="100%"
      amount={`$${formatFiatCurrency(synthsBalances?.balancesMap['sUSD']?.balance || wei(0))}`}
    />
  );
};

export default AvailableBalanceBridge;
