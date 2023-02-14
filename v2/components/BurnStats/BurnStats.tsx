import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { StatBox } from '@snx-v2/StatBox';
import { formatNumber, formatPercent } from '@snx-v2/formatters';
import { useApr } from '@snx-v2/useApr';
import { useFeePoolData } from '@snx-v2/useFeePoolData';

export const BurnStatsUi: FC<{
  lastEpochBurned: string;
  burningAPR: string;
  lifetimeBurned: string;
  isLoading: boolean;
}> = ({ lastEpochBurned, burningAPR, lifetimeBurned, isLoading }) => {
  return (
    <Flex my={1} flexDirection={['column', 'column', 'row', 'row']} justifyContent="space-between">
      <StatBox
        label="Last Epoch Fees Burned"
        amount={lastEpochBurned}
        mb={[3, 3, 0, 0]}
        alignItems="start"
        mr={3}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
        isLoading={isLoading}
      />
      <StatBox
        label="Earning"
        amount={burningAPR}
        mb={[3, 3, 0, 0]}
        alignItems={['start', 'start', 'center', 'center']}
        mr={3}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
        isLoading={isLoading}
      />
      <StatBox
        label="Lifetime Fees Burned"
        amount={lifetimeBurned}
        mb={[3, 3, 0, 0]}
        alignItems={['start', 'start', 'end', 'end']}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
        isLoading={isLoading}
      />
    </Flex>
  );
};

export const BurnStats = () => {
  const { data: earning, isLoading: isAprLoading } = useApr();
  const { data: fees, isLoading: isFeesLoading } = useFeePoolData();

  const isLoading = isAprLoading || isFeesLoading;

  return (
    <BurnStatsUi
      isLoading={isLoading}
      lifetimeBurned="Coming soon"
      lastEpochBurned={`$${formatNumber(fees?.feesBurned.toNumber() || 0)}`}
      burningAPR={formatPercent(earning?.toNumber() || 0)}
    />
  );
};
