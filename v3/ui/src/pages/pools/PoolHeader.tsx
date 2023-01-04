import { Flex, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGetPoolData } from '../../hooks/useGetPoolData';

export const PoolHeaderUi = ({
  poolName,
  poolId,
}: {
  poolName?: string | null;
  poolId?: string;
}) => {
  const poolNameWithDefault = poolName === null ? 'Unnamed Pool' : poolName;
  return (
    <Flex flexDirection="column">
      <Text fontSize="sm">Current Pool</Text>
      <Heading fontWeight={700} fontSize="xl">
        {poolNameWithDefault}
      </Heading>
      <Text fontSize="sm" color="gray.400">
        Pool #{poolId}
      </Text>
    </Flex>
  );
};

export const PoolHeader = () => {
  const { id } = useParams();
  const { data: poolData, isLoading: isLoadingPoolData } = useGetPoolData(id);
  console.log(poolData);
  return <PoolHeaderUi poolId={poolData?.id} poolName={poolData?.name} />;
};
