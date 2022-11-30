import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { StatBox } from '@snx-v2/StatBox';
import { useGetLifetimeRewards } from '@snx-v2/useGetLifetimeRewards';
import { formatNumberToUsd, formatPercent } from '@snx-v2/formatters';

export const EarnStatsUi: FC<{
  lifetimeRewards?: number;
  earning?: number;
  upcomingRewards?: number;
}> = ({ lifetimeRewards, earning, upcomingRewards }) => {
  return (
    <Flex my={1} flexDirection={['column', 'column', 'row', 'row']} justifyContent="space-between">
      <StatBox
        label="Estimated Upcoming Rewards"
        amount={upcomingRewards ? formatNumberToUsd(upcomingRewards) : undefined}
        mb={[3, 3, 0, 0]}
        alignItems="start"
        mr={3}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
      />
      <StatBox
        label="Earning"
        amount={earning ? formatPercent(earning) : undefined}
        mb={[3, 3, 0, 0]}
        alignItems={['start', 'start', 'center', 'center']}
        mr={3}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
      />
      <StatBox
        label="Lifetime Rewards"
        amount={lifetimeRewards ? formatNumberToUsd(lifetimeRewards) : undefined}
        mb={[3, 3, 0, 0]}
        alignItems={['start', 'start', 'end', 'end']}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
      />
    </Flex>
  );
};

export const EarnStats = () => {
  const { data: lifetimeRewardsData } = useGetLifetimeRewards();
  const earning = 0.3; // TODO
  const upcomingRewards = 100; // TODO
  return (
    <EarnStatsUi
      lifetimeRewards={lifetimeRewardsData}
      upcomingRewards={upcomingRewards}
      earning={earning}
    />
  );
};
