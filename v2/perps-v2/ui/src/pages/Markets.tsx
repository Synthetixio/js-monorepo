import { FC } from 'react';
import { Heading, Box } from '@chakra-ui/react';
import { MarketsTable } from '../components/Markets/MarketsTable';

export const Markets: FC = () => {
  return (
    <Box px="40px">
      <Heading mt={16} fontSize="36px">
        Markets
      </Heading>
      <MarketsTable />
    </Box>
  );
};
