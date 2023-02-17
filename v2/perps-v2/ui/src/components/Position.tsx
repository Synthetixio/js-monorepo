import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useGetPosition } from '../queries/position';
import { FuturesTrades } from '../queries/futures-trades';

export const Position: FC<{ id: string; trade: FuturesTrades }> = ({ id, trade }) => {
  const { data } = useGetPosition(id);
  if (trade.account === '0x8cce8eef33e74ea5e52d8c3d2af3376fb55da34f') {
    console.log(data, trade);
  }
  return (
    <Flex>
      <Text
        border="1px solid"
        px="2"
        borderRadius="base"
        borderColor={data?.futuresPosition.long ? 'green.500' : 'red.500'}
      >
        {trade.size === trade.positionSize
          ? `Position opened and going ${data?.futuresPosition.long ? 'long' : 'short'}`
          : Number(data?.futuresPosition.size) !== 0 && Number(trade.size) > 0
          ? 'Increased the position size'
          : ''}
      </Text>
    </Flex>
  );
};
