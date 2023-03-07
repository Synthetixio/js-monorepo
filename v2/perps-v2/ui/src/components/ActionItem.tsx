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
  const { data } = useGetPosition(event.entity === 'Futures Trade' ? event.positionId : '');
  const parsedEvent = useMemo(() => {
    const determineText = () => {
      if (event.entity === 'Futures Trade' && data?.futuresPosition) {
        console.log(event.futuresOrder);
        switch (event.type) {
          case 'PositionOpened':
            if (event.futuresOrder) {
              return (
                event.futuresOrder.status +
                ': Open '.concat(data.futuresPosition.long ? 'Long' : 'Short')
              );
            }
            return 'Open '.concat(data.futuresPosition.long ? 'Long' : 'Short');
          case 'PositionClosed':
            return 'Close '.concat(data.futuresPosition.long ? 'Long' : 'Short');
          case 'PositionModified':
            console.log(event);
            return event.positionSize.gt(0)
              ? event.size.gt(0)
                ? 'Increase Long, +' +
                  numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)) +
                  ' sUSD'
                : 'Decrease Long, ' +
                  numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)) +
                  ' sUSD'
              : event.size.gt(0)
              ? 'Decrease Short, ' +
                numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)) +
                ' sUSD'
              : 'Increase Short, ' +
                numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)) +
                ' sUSD';
          case 'Liquidated':
            return 'Liquidation';
          default:
            return '?';
        }
      }

      if (event.entity === 'Margin Transferred') {
        return (event.size.gt(0) ? 'Deposit' : 'Withdraw') + ' Margin';
      }

      return 'not found'.concat(event.entity);
    };

    const parsePrice = () => {
      if (event.entity === 'Futures Trade') {
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
      timestamp: formatDistance(new Date(Number(event.timestamp) * 1000), new Date()),
      fees: parseFees(),
    };
  }, [data?.futuresPosition, event]);
  return (
    <Tr>
      <Td>
        <Flex flexDir="column">
          <Text fontSize="sm" fontWeight="500">
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
              {data?.futuresPosition.leverage && (
                <Text color="gray.500">
                  {(Number(data.futuresPosition.leverage) / 1e18).toFixed(2).concat('x')}
                </Text>
              )}
              {event.entity === 'Futures Trade' && (
                <Text color={data?.futuresPosition.long ? 'green.500' : 'red.500'}>
                  {data?.futuresPosition.long ? 'Long' : 'Short'}
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
