import { Box, Text, Table, Thead, Tbody, Tr, Th, Spinner } from '@chakra-ui/react';
import { FC } from 'react';
import { useGetRewards } from '../../../../hooks/useRewards';
import { CollateralType } from '../../../../utils/types';
import { RewardsRow } from './RewardsRow';

interface Props {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
}

export const Rewards: FC<Props> = ({ poolId, collateral, accountId }) => {
  const { data: rewards, isLoading, refetch } = useGetRewards(accountId, poolId, collateral);

  if (isLoading) return <Spinner />;

  return rewards?.length ? (
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
          {rewards.map((reward) => (
            <RewardsRow
              key={reward.distributor}
              value={reward.value}
              distributor={reward.distributor}
              poolId={poolId}
              collateral={collateral}
              accountId={accountId}
              refetch={refetch}
            />
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
};
