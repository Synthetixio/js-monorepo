import { Flex, Td, Text, Tr } from '@chakra-ui/react';
import { numberWithCommas } from '../utils/numbers';
import { FC, useMemo } from 'react';
import { EventType } from '../EventType';
import { useGetPosition } from '../queries/position';
import { Link } from 'react-router-dom';
import { MarketIcon } from './MarketIcon';
import { utils } from 'ethers';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const ActionItem: FC<{ event: EventType }> = ({ event }) => {
  const { data } = useGetPosition((event.entity === 'Futures Trade' && event.positionId) || '');
  const parsedEvent = useMemo(() => {
    const determineText = () => {
      if (event.entity === 'Futures Trade' && data?.futuresPosition.trades === '1') {
        return 'Open '.concat(data.futuresPosition.long ? 'Long' : 'Short ');
      }
      if (event.entity === 'Futures Trade') {
        if (event.positionClosed) return 'Closed Position';
        if (event.size.gt(0) && event.positionSize.gt(0)) {
          return 'Increase Long +'
            .concat(numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)))
            .concat(' sUSD');
        }
        if (event.size.lt(0) && event.positionSize.lt(0)) {
          return 'Decrease Long '
            .concat(numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)))
            .concat(' sUSD');
        }
        if (event.size.lt(0) && event.positionSize.lt(0)) {
          return 'Increase Short +'
            .concat(numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)))
            .concat(' sUSD');
        }
        if (event.size.lt(0) && event.positionSize.lt(0)) {
          return 'Decrease Short '
            .concat(numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)))
            .concat(' sUSD');
        }
      }
      return 'not found'.concat(event.entity);

      // switch (event.entity) {
      //   case 'Position Liquidated':
      //     return 'Liquidation';
      //   case 'Futures Order':
      //     return 'Submit Order';
      //   case 'Futures Trade':
      //     return 'Futures Trade';
    };

    const parsePrice = () => {
      if (event.entity === 'Futures Trade' || event.entity === 'Position Liquidated') {
        return event.price;
      }
      return '?';
    };

    const parseFees = () => {
      if ('feesPaidToSynthetix' in event) {
        return '$' + numberWithCommas((Number(event.feesPaidToSynthetix) / 1e18).toFixed(2));
      }
      return '-';
    };

    return {
      action: determineText(),
      price: parsePrice(),
      timestamp: dayjs(Number(event.timestamp) * 1000).fromNow(),
      fees: parseFees(),
    };
  }, [data?.futuresPosition.trades, data?.futuresPosition.long, event]);
  return (
    <Tr>
      <Td>
        <Flex flexDir="column">
          <Text>{parsedEvent.action}</Text>
          <Text color="gray.500">{parsedEvent.timestamp}</Text>
        </Flex>
      </Td>
      <Td>
        <Link
          to={`https://optimistic.etherscan.io/address/${event.account}`}
          style={{ textDecoration: 'underline' }}
          target="_blank"
          rel="noopener"
        >
          {event.account
            .substring(0, 5)
            .concat('...')
            .concat(event.account.substring(event.account.length - 5))}
        </Link>
      </Td>
      <Td>
        <Flex gap="2" alignItems="center">
          <MarketIcon icon={event.market.split('-')[0].substring(1)} />
          <Flex flexDir="column">
            {event.market}
            <Flex gap="2">
              <Text color="gray.500">
                {data?.futuresPosition.leverage &&
                  (Number(data.futuresPosition.leverage) / 1e18).toFixed(2).concat('x')}
              </Text>
              {data?.futuresPosition.long && (
                <Text color={data.futuresPosition.long ? 'green.500' : 'red.500'}>
                  {data.futuresPosition.long ? 'Long' : 'Short'}
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Td>
      <Td>{event.price ? '$' + event.price : '-'}</Td>
      <Td>${numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2))}</Td>
      <Td>{parsedEvent.fees}</Td>
    </Tr>
  );
};
