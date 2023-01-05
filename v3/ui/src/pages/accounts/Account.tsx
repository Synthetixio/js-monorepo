import { Box, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Deposit } from '../../components/accounts/Deposit';
import { DepositingNav } from '../../components/accounts/DepositingNav';
import { LiquidityPositions } from '../../components/accounts/LiquidityPositions';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';

export function Account() {
  const { id: accountId } = useParams();
  const { data: liquidityPositions, isLoading, refetch } = useLiquidityPositions({ accountId });

  return (
    <Box>
      <DepositingNav />
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
        Deposit Collateral
      </Heading>
      <Deposit
        accountId={accountId}
        liquidityPositions={liquidityPositions ?? {}}
        refetch={refetch}
      />
    </Box>
  );
}
