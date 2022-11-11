import { Box, Flex, Stat, StatLabel, StatNumber, StatProps } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { useDebtData } from '@snx-v2/useDebtData';
import { useGetDSnxBalance } from '@snx-v2/useDSnxBalance';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';

const StatItem: React.FC<{
  label: string;
  value?: number;
  statProps: StatProps;
}> = ({ value, label, statProps }) => {
  return (
    <Stat {...statProps}>
      <StatLabel color="gray.500">{label}</StatLabel>
      <StatNumber color="gray.50" fontWeight="bold">
        {value ? formatNumber(value) : '-'}
      </StatNumber>
    </Stat>
  );
};
const WalletBalancesUi: React.FC<{
  totalSynthBalance?: number;
  dSNXBalance?: number;
  debtBalance?: number;
}> = ({ totalSynthBalance, dSNXBalance, debtBalance }) => {
  return (
    <Box>
      <Flex>
        <StatItem label="Active Debt" value={debtBalance} statProps={{ textAlign: 'left' }} />
        <StatItem
          label="dSNX Balance"
          value={dSNXBalance}
          statProps={{ marginX: 2, textAlign: 'center' }}
        />
        <StatItem
          label="Total Synth Balance"
          value={totalSynthBalance}
          statProps={{ textAlign: 'right' }}
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
