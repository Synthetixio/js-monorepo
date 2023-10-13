import { Flex, FlexProps } from '@chakra-ui/react';

import { HistoricalDelegations } from './HistoricalDelegations';
import { DailyDelegations } from './DailyDelegations';

export const BLOCKCHAIN_COLORS = ['#522ED1', '#FC8738'];

export const DailyDelegationsBase = ({ ...props }: FlexProps) => {
  return (
    <Flex
      flexDirection="row"
      my={5}
      alignItems="center"
      justifyContent="space-between"
      sx={{ gap: 5 }}
      flexWrap="wrap"
    >
      <HistoricalDelegations {...props} />
      <DailyDelegations {...props} />
    </Flex>
  );
};
