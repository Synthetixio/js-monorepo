import { Td, Tr } from '@chakra-ui/react';
import { numberWithCommas } from '../utils/numbers';
import { FC, useMemo } from 'react';
import { EventType } from '../EventType';
import { useGetPosition } from '../queries/position';
import { Link } from 'react-router-dom';

export const ActionItem: FC<{ event: EventType }> = ({ event }) => {
  const { data, isLoading } = useGetPosition(
    (event.entity === 'Futures Trade' && event.positionId) || ''
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
            .concat(numberWithCommas(event.size.toString(), 2))
            .concat(' sUSD');
        }
        if (event.size.lt(0) && event.positionSize.lt(0)) {
          return 'Decrease Long '
            .concat(numberWithCommas(event.size.toString(), 2))
            .concat(' sUSD');
        }
        if (event.size.lt(0) && event.positionSize.lt(0)) {
          return 'Increase Short +'
            .concat(numberWithCommas(event.size.toString(), 2))
            .concat(' sUSD');
        }
        if (event.size.lt(0) && event.positionSize.lt(0)) {
          return 'Decrease Short '
            .concat(numberWithCommas(event.size.toString(), 2))
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
    return {
      action: determineText(),
      price: parsePrice(),
    };
  }, [
    data?.futuresPosition.trades,
    data?.futuresPosition.long,
    event.price,
    event.entity,
    event.size,
    event.positionSize,
    event.positionClosed,
  ]);
  return (
    <Tr>
      <Td>{parsedEvent.action}</Td>
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
      <Td>{event.market}</Td>
      <Td>${event.price}</Td>
    </Tr>
  );
};
