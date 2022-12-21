import { Flex, Heading, Text } from '@chakra-ui/react';

export const PoolHeader = ({ poolName, poolId }: { poolName?: string | null; poolId?: string }) => {
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
