import { Flex } from '@chakra-ui/react';
import { useMarketStats } from '../../../hooks';
import { MarketsCard } from './MarketsCard';

export const Markets = () => {
  const { data, loading } = useMarketStats();

  return (
    <Flex my={4} justifyContent="space-between">
      <MarketsCard loading={loading} data={data[0]} number={1} />
      <MarketsCard loading={loading} data={data[1]} number={2} />
      <MarketsCard loading={loading} data={data[2]} number={3} />
    </Flex>
  );
};
