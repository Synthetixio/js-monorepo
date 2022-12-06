import { Box, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Stake } from '../../components/accounts/Deposit';
import { StakingNav } from '../../components/accounts/StakingNav';
import { LiquidityPositions } from '../../components/accounts/LiquidityPositions';
import { useLiquidityPositions } from '../../hooks';

export function Account() {
  const { id: accountId } = useParams();
  const { data: liquidityPositions, isLoading, refetch } = useLiquidityPositions(accountId || '');

  return (
    <Box>
      <StakingNav />
      {isLoading && (
        <Box
          height={!isLoading && Boolean(liquidityPositions) ? '0px' : '180px'}
          position="relative"
        >
          <Stack position="absolute" top="0" left="0" width="100%">
            <Skeleton height="10px" isLoaded={!isLoading && Boolean(liquidityPositions)} />
            <Skeleton height="10px" isLoaded={!isLoading && Boolean(liquidityPositions)} />
            <Skeleton height="10px" isLoaded={!isLoading && Boolean(liquidityPositions)} />
            <Skeleton height="10px" isLoaded={!isLoading && Boolean(liquidityPositions)} />
            <Skeleton height="10px" isLoaded={!isLoading && Boolean(liquidityPositions)} />
            <Skeleton height="10px" isLoaded={!isLoading && Boolean(liquidityPositions)} />
            <Skeleton height="10px" isLoaded={!isLoading && Boolean(liquidityPositions)} />
            <Skeleton height="10px" isLoaded={!isLoading && Boolean(liquidityPositions)} />
            <Skeleton height="10px" isLoaded={!isLoading && Boolean(liquidityPositions)} />
          </Stack>
        </Box>
      )}
      {liquidityPositions && (
        <LiquidityPositions positions={liquidityPositions ?? {}} refetch={refetch} />
      )}
      <Heading size="md" mb="3">
        Stake Collateral
      </Heading>
      <Stake
        accountId={accountId}
        liquidityPositions={liquidityPositions ?? {}}
        refetch={refetch}
      />
    </Box>
  );
}
