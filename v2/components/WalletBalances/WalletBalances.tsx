import { Box, Flex, Stat, StatLabel, StatNumber, StatProps } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { useDebtData } from '@snx-v2/useDebtData';
import { useGetDSnxBalance } from '@snx-v2/useDSnxBalance';
import { formatPercent, formatNumberToUsd } from '@snx-v2/formatters';
import { StatBox } from '@snx-v2/StatBox';

const WalletBalancesUi: React.FC<{
  totalSynthBalance?: number;
  dSNXBalance?: number;
  debtBalance?: number;
}> = ({ totalSynthBalance, dSNXBalance, debtBalance }) => {
  return (
    <Box>
      <Flex>
        <StatBox
          label="Active Debt"
          amount={formatNumberToUsd(debtBalance || 0)} // TODO skeleton
          containerStyles={{ alignItems: 'start' }}
        />
        <StatBox
          label="dSNX Value"
          amount={dSNXBalance === undefined ? '-' : formatNumberToUsd(dSNXBalance)}
          containerStyles={{ marginX: 2, alignItems: 'center' }}
        />
        <StatBox
          label="Total Synth Value"
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
