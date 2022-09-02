import { Box, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Stake from '../../components/accounts/Stake';
import { StakingNav } from '../../components/accounts/StakingNav';
import StakingPositions from '../../components/accounts/StakingPositions';
import { useStakingPositions } from '../../hooks';

export function Account() {
  const { id: accountId } = useParams();
  const { data: stakingPositions, isLoading } = useStakingPositions(accountId || '');

  return (
    <Box>
      <StakingNav />
      <Stack>
        <Skeleton height="10px" isLoaded={!isLoading && Boolean(stakingPositions)} />
        <Skeleton height="10px" isLoaded={!isLoading && Boolean(stakingPositions)} />
        <Skeleton height="10px" isLoaded={!isLoading && Boolean(stakingPositions)} />
      </Stack>
      {stakingPositions && <StakingPositions positions={stakingPositions ?? {}} />}
      <Heading size="md" mb="3">
        Stake Collateral
      </Heading>
      <Stake accountId={accountId} stakingPositions={stakingPositions ?? {}} />
    </Box>
  );
}
