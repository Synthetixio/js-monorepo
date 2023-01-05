import { Flex, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGetPoolData } from '../../hooks/useGetPoolData';

export const PoolHeaderUi = ({ poolName, poolId }: { poolName?: string; poolId?: string }) => {
  if (!poolId || !poolName) return null;
  return (
    <Flex flexDirection="column">
      <Text fontSize="sm">Current Pool</Text>
      <Heading fontWeight={700} fontSize="xl">
        {poolName}
      </Heading>
      <Text fontSize="sm" color="gray.400">
        Pool #{poolId}
      </Text>
    </Flex>
  );
};

export const PoolHeader = () => {
  const { poolId } = useParams();
  const { data: poolData } = useGetPoolData(poolId);
  return <PoolHeaderUi poolId={poolData?.id} poolName={poolData?.name} />;
};
