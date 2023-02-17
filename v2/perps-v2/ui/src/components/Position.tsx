import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useGetPosition } from '../queries/position';
import { FuturesTrades } from '../queries/futures-trades';

export const Position: FC<{ id: string; trade: FuturesTrades }> = ({ id, trade }) => {
  const { data } = useGetPosition(id);
  if (
    trade.account === '0x16d1663a00d4d1a216e0baa84b0abc69ba35c156' &&
    trade.market === 'sETHPERP'
  ) {
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
        {data?.futuresPosition.long ? 'Position is going long' : 'Position is going short'}
        <br />
        {trade.size === trade.positionSize
          ? `Position got opened`
          : data?.futuresPosition.long &&
            data?.futuresPosition.size !== '0' &&
            Number(trade.size) > 0
          ? 'Increased the position size'
          : !data?.futuresPosition.long &&
            data?.futuresPosition.size !== '0' &&
            Number(trade.size) < 0
          ? 'Increased position size'
          : data?.futuresPosition.size === '0'
          ? 'Position got closed'
          : '?'}
      </Text>
    </Flex>
  );
};
