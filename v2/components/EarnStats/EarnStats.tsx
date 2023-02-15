import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { StatBox } from '@snx-v2/StatBox';
import { useGetLifetimeRewards } from '@snx-v2/useGetLifetimeRewards';
import { formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { useGetUpcomingRewards } from '@snx-v2/useGetUpcomingRewards';
import { useApr } from '@snx-v2/useApr';

export const EarnStatsUi: FC<{
  lifetimeRewards?: number;
  earning?: number;
  upcomingRewards?: number;
  isLoading: boolean;
}> = ({ lifetimeRewards, earning, upcomingRewards, isLoading }) => {
  return (
    <Flex my={1} flexDirection={['column', 'column', 'row', 'row']} justifyContent="space-between">
      <StatBox
        label="Estimated Upcoming Rewards"
        amount={upcomingRewards !== undefined ? formatNumberToUsd(upcomingRewards) : undefined}
        mb={[3, 3, 0, 0]}
        alignItems="start"
        mr={3}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
        isLoading={isLoading}
      />
      <StatBox
        label="Earning"
        amount={earning !== undefined ? formatPercent(earning) : undefined}
        mb={[3, 3, 0, 0]}
        alignItems={['start', 'start', 'center', 'center']}
        mr={3}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
        isLoading={isLoading}
      />
      <StatBox
        label="Lifetime Rewards"
        amount={lifetimeRewards !== undefined ? formatNumberToUsd(lifetimeRewards) : undefined}
        mb={[3, 3, 0, 0]}
        alignItems={['start', 'start', 'end', 'end']}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
        isLoading={isLoading}
      />
    </Flex>
  );
};

export const EarnStats = () => {
  const { data: lifetimeRewardsData, isLoading: isGetLifetimeLoading } = useGetLifetimeRewards();
  const { data: upcomingRewards, isLoading: isUpcomingLoading } = useGetUpcomingRewards();
  const { data: aprs, isLoading: isAprLoading } = useApr();

  const isLoading = isGetLifetimeLoading || isUpcomingLoading || isAprLoading;

  return (
    <EarnStatsUi
      isLoading={isLoading}
      lifetimeRewards={lifetimeRewardsData?.combinedTotal}
      upcomingRewards={upcomingRewards}
      earning={aprs?.snxApr?.toNumber()}
    />
  );
};
