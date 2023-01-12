import { Flex, Heading, Text } from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import { useGetPoolData, Pool } from '../../hooks/useGetPoolData';

export const PoolHeaderUi = ({ pool }: { pool?: Pool }) => {
  if (!pool) {
    return null;
  }
  return (
    <Flex flexDirection="column">
      <Text fontSize="sm">Current Pool</Text>
      <Heading fontWeight={700} fontSize="xl">
        {pool.name}
      </Heading>
      <Text fontSize="sm" color="gray.400">
        Pool #{pool.id}
      </Text>
    </Flex>
  );
};

export const PoolHeader = () => {
  const params = useParams();
  const { data: pool } = useGetPoolData(params.poolId);
  return <PoolHeaderUi pool={pool} />;
};
