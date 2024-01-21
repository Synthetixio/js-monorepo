import { FC } from 'react';
import { StatBox } from '@snx-v2/StatBox';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { wei } from '@synthetixio/wei';
import { formatFiatCurrency } from '../../utils/formatters/number';

const AvailableBalanceBridge: FC = () => {
  const { data: synthsBalances, isLoading: isSynthsLoading } = useSynthsBalances();
  return (
    <StatBox
      isLoading={isSynthsLoading}
      titleToolTip="sUSD Available for Bridging"
      label="sUSD Available for Bridging"
      alignItems={{ base: 'center', lg: 'end' }}
      maxW={{ base: 'initial', lg: '282px' }}
      w="100%"
      amount={`$${formatFiatCurrency(synthsBalances?.balancesMap['sUSD']?.balance || wei(0))}`}
    />
  );
};

export default AvailableBalanceBridge;
