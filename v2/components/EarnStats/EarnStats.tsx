import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { StatBox } from '@snx-v2/StatBox';
import { useGetLifetimeRewards } from '@snx-v2/useGetLifetimeRewards';
import { formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { useGetUpcomingRewards } from '@snx-v2/useGetUpcomingRewards';
import { useStakingApr } from '../../lib/useStakingApr';
import { useGlobalStakingApr } from '../../lib/useGlobalStakingApr';
import { useDebtData } from '@snx-v2/useDebtData';

export const EarnStatsUi: FC<{
  lifetimeRewards?: number;
  earning?: number;
  upcomingRewards?: number;
  isLoading: boolean;
}> = ({ lifetimeRewards, earning, upcomingRewards }) => {
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
      />
      <StatBox
        label="Earning"
        amount={earning !== undefined ? formatPercent(earning) : undefined}
        mb={[3, 3, 0, 0]}
        alignItems={['start', 'start', 'center', 'center']}
        mr={3}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
      />
      <StatBox
        label="Lifetime Rewards"
        amount={lifetimeRewards !== undefined ? formatNumberToUsd(lifetimeRewards) : undefined}
        mb={[3, 3, 0, 0]}
        alignItems={['start', 'start', 'end', 'end']}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
      />
    </Flex>
  );
};

export const EarnStats = () => {
  const { data: lifetimeRewardsData, isLoading: isGetLifetimeLoading } = useGetLifetimeRewards();
  const { data: upcomingRewards, isLoading: isUpcomingLoading } = useGetUpcomingRewards();

  const isLoading = isGetLifetimeLoading || isUpcomingLoading;
  const { data: debtData } = useDebtData();
  const { data: stakingApr } = useStakingApr();
  const notStaking = debtData?.debtBalance.eq(0);
  const enableGlobalStakingApr = Boolean(notStaking);
  const { data: globalStakingApr } = useGlobalStakingApr(enableGlobalStakingApr);
  const earning = notStaking ? globalStakingApr : stakingApr;

  return (
    <EarnStatsUi
      isLoading={isLoading}
      lifetimeRewards={lifetimeRewardsData}
      upcomingRewards={upcomingRewards}
      earning={earning?.toNumber()}
    />
  );
};
