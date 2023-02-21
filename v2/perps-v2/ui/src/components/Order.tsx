import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { EventType } from '../App';

export const Order: FC<{ event: EventType }> = ({ event }) => {
  return (
    <Flex>
      <Text>Status: {event.status}</Text>
    </Flex>
  );
};
