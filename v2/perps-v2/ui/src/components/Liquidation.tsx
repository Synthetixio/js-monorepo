import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { EventType } from '../Actions';
import { numberWithCommas } from '../utils/numbers';

export const Liquidation: FC<{ event: EventType }> = ({ event }) => {
  return (
    <Flex flexDir="column">
      <Text>
        Price at liquidation: ${numberWithCommas((Number(event.price) / 1e18).toFixed(2))}
      </Text>
    </Flex>
  );
};
