import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import { useGetPoolData, Pool } from '../../hooks/useGetPoolData';

export const PoolHeaderUi = ({ pool }: { pool?: Pool }) => {
  if (!pool) {
    return null;
  }
  return (
    <Box>
      <Flex gap={2} alignItems="flex-end">
        <Heading fontWeight={700} fontSize="xl">
          {pool.name}
        </Heading>
        <Text fontSize="sm" color="gray.400">
          Pool #{pool.id}
        </Text>
      </Flex>
      <Text color="gray.400" fontSize="sm">
        The Spartan Council Pool is the primary pool of Synthetix. All collateral will be deposited
        in this pool by default.
      </Text>
    </Box>
  );
};

export const PoolHeader = () => {
  const params = useParams();
  const { data: pool } = useGetPoolData(params.poolId);
  return <PoolHeaderUi pool={pool} />;
};
