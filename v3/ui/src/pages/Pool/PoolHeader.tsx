import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import { usePoolData, PoolType } from '@snx-v3/usePoolData';

export const PoolHeaderUi = ({ poolData }: { poolData: PoolType }) => {
  return (
    <Box>
      <Flex gap={2} alignItems="flex-end">
        <Heading fontWeight={700} fontSize="xl">
          {poolData.name}
        </Heading>
        <Text fontSize="sm" color="gray.400">
          Pool #{poolData.id}
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
  const { data: poolData } = usePoolData(params.poolId);
  return poolData ? <PoolHeaderUi poolData={poolData} /> : null;
};
