import { Flex } from '@chakra-ui/react';
import { useMarketStats } from '../../../hooks';
import { MarketsCard } from './MarketsCard';

export const Markets = () => {
  const { data, loading } = useMarketStats(3);

  return (
    <Flex justifyContent="space-between" width="100%" flexDirection={{ base: 'column', lg: 'row' }}>
      <MarketsCard
        my={4}
        loading={loading}
        data={data[0]}
        number={1}
        width={{ base: '100%', lg: '32%' }}
      />
      <MarketsCard
        my={4}
        loading={loading}
        data={data[1]}
        number={2}
        width={{ base: '100%', lg: '32%' }}
      />
      <MarketsCard
        my={4}
        loading={loading}
        data={data[2]}
        number={3}
        width={{ base: '100%', lg: '32%' }}
      />
    </Flex>
  );
};
