import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { StatBox } from '@snx-v2/StatBox';
import { useGetLifetimeRewards } from '@snx-v2/useGetLifetimeRewards';
import { formatNumberToUsd } from '@synthetixio/formatters';
import { useClaimableRewards } from '@snx-v2/useClaimableRewards';
import { useApr } from '@snx-v2/useApr';

export const EarnStatsUi: FC<{
  lifetimeRewards?: number;
  earning?: number;
  claimableRewards?: number;
  isLoading: boolean;
}> = ({ lifetimeRewards, claimableRewards, isLoading }) => {
  return (
    <Flex my={1} flexDirection={['column', 'column', 'row', 'row']} justifyContent="space-between">
      <StatBox
        label="Claimable Rewards"
        amount={claimableRewards !== undefined ? formatNumberToUsd(claimableRewards) : undefined}
        mb={[3, 3, 0, 0]}
        alignItems="center"
        mr={3}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
        isLoading={isLoading}
      />
      <StatBox
        label="Lifetime Rewards"
        amount={lifetimeRewards !== undefined ? formatNumberToUsd(lifetimeRewards) : undefined}
        mb={[3, 3, 0, 0]}
        alignItems="center"
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
        isLoading={isLoading}
      />
    </Flex>
  );
};

export const EarnStats = () => {
  const { data: lifetimeRewardsData, isLoading: isGetLifetimeLoading } = useGetLifetimeRewards();
  const { data: claimableRewards, isLoading: isUpcomingLoading } = useClaimableRewards();
  const { data: aprs, isLoading: isAprLoading } = useApr();

  const isLoading = isGetLifetimeLoading || isUpcomingLoading || isAprLoading;

  return (
    <EarnStatsUi
      isLoading={isLoading}
      lifetimeRewards={lifetimeRewardsData?.combinedTotal}
      claimableRewards={claimableRewards}
      earning={aprs?.snxApr?.toNumber()}
    />
  );
};
