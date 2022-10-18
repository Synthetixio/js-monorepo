import { Box, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Stake } from '../../components/accounts/Stake';
import { StakingNav } from '../../components/accounts/StakingNav';
import { StakingPositions } from '../../components/accounts/StakingPositions';
import { useStakingPositions } from '../../hooks';

export function Account() {
  const { id: accountId } = useParams();
  const { data: stakingPositions, isLoading, refetch } = useStakingPositions(accountId || '');

  return (
    <Box>
      <StakingNav />
      <Box position="relative">
        <Stack position="absolute" top="0" left="0" width="100%">
          <Skeleton height="10px" isLoaded={!isLoading && Boolean(stakingPositions)} />
          <Skeleton height="10px" isLoaded={!isLoading && Boolean(stakingPositions)} />
          <Skeleton height="10px" isLoaded={!isLoading && Boolean(stakingPositions)} />
        </Stack>
      </Box>
      {stakingPositions && (
        <StakingPositions positions={stakingPositions ?? {}} refetch={refetch} />
      )}
      <Heading size="md" mb="3">
        Stake Collateral
      </Heading>
      <Stake accountId={accountId} stakingPositions={stakingPositions ?? {}} refetch={refetch} />
    </Box>
  );
}
