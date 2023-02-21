import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useGetPosition } from '../queries/position';
import { FuturesTrades } from '../queries/futures-trades';
import { FuturePosition } from '../queries/positions';

export const Position: FC<{ id: string; trade: FuturesTrades }> = ({ id, trade }) => {
  const { data } = useGetPosition(id);
  return (
    <Flex>
      <Text
        border="1px solid"
        px="2"
        borderRadius="base"
        borderColor={data?.futuresPosition.long ? 'green.500' : 'red.500'}
        whiteSpace="pre-wrap"
      >
        {!!data?.futuresPosition && assembleText(trade, data.futuresPosition)}
      </Text>
    </Flex>
  );
};

function assembleText(trade: FuturesTrades, position: FuturePosition) {
  const text: string[] = [];
  if (position.size === trade.size) text.push('Position got opened \n');
  if (position.size === '0') text.push('Position got closed \n');
  text.push(
    `Position ${position.size === '0' ? 'went' : 'is'} ${position.long ? 'long' : 'short'} \n`
  );
  if (
    ((Number(position.size) > 0 && Number(trade.size) > 0) ||
      (Number(position.size) < 0 && Number(trade.size) < 0)) &&
    position.size !== trade.size
  )
    text.push('Increased position size');
  if (
    ((Number(position.size) > 0 && Number(trade.size) < 0) ||
      (Number(position.size) < 0 && Number(trade.size) > 0)) &&
    position.size !== trade.size
  )
    text.push('Decreased position size');
  return text;
}
