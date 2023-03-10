export {};
/*
import { Box, Spinner, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useRewards } from './useRewards';
import { RewardsDistributorTitle } from './RewardsDistributorTitle';
import { useParams } from '@snx-v3/useParams';
import { useCollateralType } from '@snx-v3/useCollateralTypes';

export function Rewards() {
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const rewards = useRewards({
    accountId: params.accountId,
    poolId: params.poolId,
    tokenAddress: collateralType?.tokenAddress,
  });

  if (rewards.isLoading) return <Spinner />;

  return rewards.data?.length ? (
    <Box>
      <Text my="6">
        The following rewards distributors are connected to the <strong>Spartan Council</strong>{' '}
        pool for users who have deposited <strong>SNX</strong>.
      </Text>
      <Table size="sm" variant="simple" mb="6">
        <Thead>
          <Tr>
            <Th color="white" />
            <Th color="white" />
            <Th color="white" />
          </Tr>
        </Thead>
        <Tbody>
          {rewards.data.map((reward) => (
            <RewardsDistributorTitle key={reward.distributor} reward={reward} />
          ))}
        </Tbody>
      </Table>
    </Box>
  ) : (
    <Box m="12">
      <Text textAlign="center" opacity="0.66">
        This pool does not have any rewards distributors connected for this collateral type.
      </Text>
    </Box>
  );
}
*/
