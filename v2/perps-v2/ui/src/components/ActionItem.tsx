import { Flex, Td, Text, Tr } from '@chakra-ui/react';
import { numberWithCommas } from '../utils/numbers';
import { FC, useMemo } from 'react';
import { EventType } from '../EventType';
import { useGetPosition } from '../queries/position';
import { Link } from 'react-router-dom';
import { MarketIcon } from './MarketIcon';
import { BigNumber, utils } from 'ethers';
import formatDistance from 'date-fns/formatDistance';
import { ExternalLink } from './ExternalLink';

export const ActionItem: FC<{ event: EventType }> = ({ event }) => {
  if (event.txHash === '0x1ef3c6e3c8949471aae09c43f347e8fe713332ea01ef54a903bdd3a47a45116b') {
    console.log(event);
  }
  const { data } = useGetPosition(event.entity === 'Futures Trade' ? event.positionId : '');
  const parsedEvent = useMemo(() => {
    const determineText = () => {
      if (event.entity === 'Futures Trade') {
        if (event.positionSize.eq(BigNumber.from('0'))) {
          // TODO @MF refactor for better readability
          if (!event.futuresOrder?.status) {
            // how can it be filled and position size 0??
            console.log(event);
          }
          if (event.futuresOrder?.status === 'Cancelled') {
            console.log('CANCELLED: ', event);
          }
          return event.futuresOrder?.status === 'Filled'
            ? 'Pending: Trade '.concat(event.size.gt(0) ? 'Long' : 'Short')
            : 'Cancelled: Trade'.concat(event.size.gt(0) ? 'Long' : 'Short');
        }
        switch (event.type) {
          case 'PositionOpened':
            if (event.futuresOrder) {
              return (
                event.futuresOrder.status +
                ': Open '.concat(event.positionSize.gt(0) ? 'Long' : 'Short')
              );
            }
            return 'Open '.concat(event.positionSize.gt(0) ? 'Long' : 'Short');
          case 'PositionClosed':
            return 'Close '.concat(event.positionSize.gt(0) ? 'Long' : 'Short');
          case 'PositionModified':
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

      return 'Not Found '.concat(event.entity);
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
  }, [event]);
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
                <Text color={event.positionSize.gt(0) ? 'green.500' : 'red.500'}>
                  {event.positionSize.gt(0) ? 'Long' : 'Short'}
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
