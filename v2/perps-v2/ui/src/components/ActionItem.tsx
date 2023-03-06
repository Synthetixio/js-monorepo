import { Flex, Td, Text, Tr } from '@chakra-ui/react';
import { numberWithCommas } from '../utils/numbers';
import { FC, useMemo } from 'react';
import { EventType } from '../EventType';
import { useGetPosition } from '../queries/position';
import { Link } from 'react-router-dom';
import { MarketIcon } from './MarketIcon';
import { utils } from 'ethers';
import formatDistance from 'date-fns/formatDistance';
import { ExternalLink } from './ExternalLink';

export const ActionItem: FC<{ event: EventType }> = ({ event }) => {
  const { data } = useGetPosition(
    ((event.entity === 'Futures Trade' || event.entity === 'Futures Order') && event.positionId) ||
      ''
  );
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

      if (event.entity === 'Futures Order') {
        if (event.status === 'Filled') {
          return 'Submit: Open ' + (event.size.gt(0) ? 'Long' : 'Short') + ` ${event.status}`;
        } else {
          console.warn('event didnt got handled', event);
        }
      }

      if (event.entity === 'Position Liquidated') {
        return 'Liquidation';
      }

      return 'not found'.concat(event.entity);
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
      if ('fee' in event) {
        return '$' + numberWithCommas((Number((event as EventType).fee) / 1e18).toFixed(2));
      }
      return '-';
    };

    return {
      action: determineText(),
      price: parsePrice(),
      timestamp: formatDistance(new Date(Number(event.timestamp) * 1000), new Date()),
      fees: parseFees(),
      isLong: event.size.gt(0),
    };
  }, [data?.futuresPosition.trades, data?.futuresPosition.long, event]);
  return (
    <Tr>
      <Td>
        <Flex flexDir="column">
          <Text>
            {parsedEvent.action}{' '}
            <ExternalLink to={`https://optimistic.etherscan.io/tx/${event.txHash}`} />
          </Text>
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
          <MarketIcon icon={event.market?.split('-')[0].substring(1)} />
          <Flex flexDir="column">
            {event.market}
            <Flex gap="2">
              <Text color="gray.500">
                {data?.futuresPosition.leverage &&
                  (Number(data.futuresPosition.leverage) / 1e18).toFixed(2).concat('x')}
              </Text>
              {(event.entity === 'Futures Order' || event.entity === 'Futures Trade') && (
                <Text
                  color={data?.futuresPosition.long || parsedEvent.isLong ? 'green.500' : 'red.500'}
                >
                  {data?.futuresPosition.long || parsedEvent.isLong ? 'Long' : 'Short'}
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Td>
      <Td>
        {event.price
          ? '$' + event.price
          : data?.futuresPosition.lastPrice
          ? '$' + numberWithCommas((Number(data.futuresPosition.lastPrice) / 1e18).toFixed(2))
          : '-'}
      </Td>
      <Td>${numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2))}</Td>
      <Td>{parsedEvent.fees}</Td>
    </Tr>
  );
};
