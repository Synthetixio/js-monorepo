import { Flex, FlexProps } from '@chakra-ui/react';

import { HistoricalDelegations } from './HistoricalDelegations';
import { DailyDelegations } from './DailyDelegations';

export const BLOCKCHAIN_COLORS = ['#522ED1', '#FC8738'];

export const Delegation = ({ ...props }: FlexProps) => {
  return (
    <Flex
      width="100%"
      flexDirection={{ base: 'column', md: 'row' }}
      my={5}
      alignItems="center"
      justifyContent="space-between"
      sx={{ gap: 5 }}
    >
      <HistoricalDelegations {...props} width={{ base: '100%', md: '49%' }} />
      <DailyDelegations {...props} width={{ base: '100%', md: '49%' }} />
    </Flex>
  );
};
