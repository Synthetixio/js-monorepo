import { Box, Flex, Stat, StatLabel, StatNumber, StatProps } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { useDebtData } from '@snx-v2/useDebtData';
import { useGetDSnxBalance } from '@snx-v2/useDSnxBalance';
import { formatPercent, formatNumberToUsd } from '@snx-v2/formatters';
import { StatBox } from '@snx-v2/StatBox';
import { useTranslation } from 'react-i18next';

const WalletBalancesUi: React.FC<{
  totalSynthBalance?: number;
  dSNXBalance?: number;
  debtBalance?: number;
  const { t } = useTranslation();
  return (
    <Box>
      <Flex>
        <StatBox
          label={t('staking-v2.wallet-balances.active-debt')}
          amount={formatNumberToUsd(debtBalance || 0)} // TODO skeleton
          containerStyles={{ alignItems: 'start' }}
        />
        <StatBox
          label={t('staking-v2.wallet-balances.d-snx-value')}
          amount={dSNXBalance === undefined ? '-' : formatNumberToUsd(dSNXBalance)}
          containerStyles={{ marginX: 2, alignItems: 'center' }}
        />
        <StatBox
          label={t('staking-v2.wallet-balances.total-synth-value')}
          amount={formatNumberToUsd(totalSynthBalance || 0)}
          containerStyles={{ alignItems: 'end' }}
        />
        />
      </Flex>
    </Box>
  );
};
export const WalletBalances = () => {
  const { data: debtData } = useDebtData();
  const { data: synthsData } = useSynthsBalances();
  const { data: dSNXBalance } = useGetDSnxBalance();

  return (
    <WalletBalancesUi
      debtBalance={debtData?.debtBalance.toNumber()}
      dSNXBalance={dSNXBalance?.toNumber()}
      totalSynthBalance={synthsData?.totalUSDBalance.toNumber()}
    />
  );
};
