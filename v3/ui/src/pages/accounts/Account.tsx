import { Box, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Deposit } from '../../components/accounts/Deposit';
import { DepositingNav } from '../../components/accounts/DepositingNav';
import { LiquidityPositions } from '../../components/accounts/LiquidityPositions';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';

export function Account() {
  const params = useParams();
  const {
    data: liquidityPositions,
    isLoading,
    refetch,
  } = useLiquidityPositions({ accountId: params.accountId });

  return (
    <Box>
      <DepositingNav />
      {isLoading && (
        <Box
          height={!isLoading && Boolean(liquidityPositions) ? '0px' : '180px'}
          position="relative"
        >
          <Stack position="absolute" top="0" left="0" width="100%">
            <Skeleton height="30px" isLoaded={!isLoading && Boolean(liquidityPositions)} />
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
        liquidityPositions={liquidityPositions}
        refetch={refetch}
        accountId={params.accountId}
      />
    </Box>
  );
}
