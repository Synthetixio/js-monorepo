// import { Flex, Td, Text, Tr } from '@chakra-ui/react';
// import { numberWithCommas } from '../utils/numbers';
// import { FC, useMemo } from 'react';
// import { EventType } from '../EventType';
// // import { useGetPosition } from '../queries/position';
// import { Link } from 'react-router-dom';
// import { MarketIcon } from './MarketIcon';
// import { utils } from 'ethers';
// import formatDistance from 'date-fns/formatDistance';
// import { ExternalLink } from './ExternalLink';

// export const ActionItem: FC<{ event: EventType }> = ({ event }) => {
//   const { data } = useGetPosition(event.entity === 'Futures Trade' ? event.positionId : '');

//   const parsedEvent = useMemo(() => {
//     const determineText = () => {
//       if (event.entity === 'Futures Trade') {
//         if (data?.futuresPosition) {
//           if (event.positionClosed) {
//             return 'Close '.concat(!event.size.gt(0) ? 'Long' : 'Short');
//           }
//           if (event.type === 'PositionOpened' && data.futuresPosition.trades === '1') {
//             if (!!event.futuresOrder?.status) {
//               return event.futuresOrder.status
//                 .toString()
//                 .concat(': Open ')
//                 .concat(event.positionSize.gt(0) ? 'Long' : 'Short');
//             }
//             return 'Open '.concat(event.positionSize.gt(0) ? 'Long' : 'Short');
//           }
//           // Should never be triggered because of the `event.positionClosed` if statement, but just to make sure
//           if (event.type === 'PositionClosed' && event.size.eq(0)) {
//             return 'Close '.concat(!event.size.gt(0) ? 'Long' : 'Short');
//           }

//           if (event.type === 'PositionModified') {
//             return event.positionSize.gt(0)
//               ? event.size.gt(0)
//                 ? 'Increase Long, +'.concat(
//                     numberWithCommas(
//                       (Number(utils.formatEther(event.size)) / 1e18).toFixed(2)
//                     ).concat(' sUSD')
//                   )
//                 : 'Decrease Long, '.concat(
//                     numberWithCommas(
//                       (Number(utils.formatEther(event.size)) / 1e18).toFixed(2)
//                     ).concat(' sUSD')
//                   )
//               : event.size.gt(0)
//               ? 'Decrease Short, '.concat(
//                   numberWithCommas(
//                     (Number(utils.formatEther(event.size)) / 1e18).toFixed(2)
//                   ).concat(' sUSD')
//                 )
//               : 'Increase Short, '.concat(
//                   numberWithCommas(
//                     (Number(utils.formatEther(event.size)) / 1e18).toFixed(2)
//                   ).concat(' sUSD')
//                 );
//           }
//         }
//       }
//       if (event.type === 'Liquidated') {
//         return 'Liquidation';
//       }

//       if (event.entity === 'Margin Transferred') {
//         return (event.size.gt(0) ? 'Deposit' : 'Withdraw') + ' Margin';
//       }

//       // DelayedOffChainOrder
//       if (event.futuresOrder?.status && event.type === 'PositionOpened') {
//         return event.futuresOrder.status
//           .toString()
//           .concat(': Open ')
//           .concat(event.positionSize.gt(0) ? 'Long' : 'Short');
//       }
//     };

//     const parseFees = () => {
//       if ('feesPaidToSynthetix' in event) {
//         return '$' + numberWithCommas((Number(event.feesPaidToSynthetix) / 1e18).toFixed(2));
//       }
//       return '-';
//     };

//     const isLong = () => {
//       if (event.entity === 'Futures Trade') {
//         return event.positionClosed ? !event.size.gt(0) : event.size.gt(0);
//       }
//       return null;
//     };

//     const parseSize = () =>
//       '$ '.concat(numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)));

//     return {
//       action: determineText(),
//       timestamp: formatDistance(new Date(Number(event.timestamp) * 1000), new Date()),
//       fees: parseFees(),
//       isLong: isLong(),
//       size: parseSize(),
//     };
//   }, [event, data?.futuresPosition]);

//   return (
//     <Tr>
//       <Td>
//         <Flex flexDir="column">
//           <Text fontSize="sm" fontWeight="500">
//             {parsedEvent.action}{' '}
//             <ExternalLink to={`https://optimistic.etherscan.io/tx/${event.txHash}`} />
//           </Text>
//           <Text color="gray.500">{parsedEvent.timestamp}</Text>
//         </Flex>
//       </Td>
//       <Td>
//         <Link
//           to={`https://optimistic.etherscan.io/address/${event.account}`}
//           style={{ textDecoration: 'underline' }}
//           target="_blank"
//           rel="noopener"
//         >
//           {event.account
//             .substring(0, 5)
//             .concat('...')
//             .concat(event.account.substring(event.account.length - 5))}
//         </Link>
//       </Td>
//       <Td>
//         <Flex gap="2" alignItems="center">
//           <MarketIcon icon={event.market?.split('-')[0].substring(1)} />
//           <Flex flexDir="column">
//             {event.market}
//             <Flex gap="2">
//               {data?.futuresPosition.leverage && (
//                 <Text color="gray.500">
//                   {(Number(data.futuresPosition.leverage) / 1e18).toFixed(2).concat('x')}
//                 </Text>
//               )}
//               {parsedEvent.isLong !== null && (
//                 <Text color={parsedEvent.isLong ? 'green.500' : 'red.500'}>
//                   {parsedEvent.isLong ? 'Long' : 'Short'}
//                 </Text>
//               )}
//             </Flex>
//           </Flex>
//         </Flex>
//       </Td>
//       <Td>{event.price ? '$' + event.price : '-'}</Td>
//       <Td>{parsedEvent.size}</Td>
//       <Td>{parsedEvent.fees}</Td>
//     </Tr>
//   );
// };
export {};
const determineText = () => {
  if (event.entity === 'Futures Trade') {
    if (data?.futuresPosition) {
      if (event.positionClosed) {
        return 'Close '.concat(!event.size.gt(0) ? 'Long' : 'Short');
      }
      if (event.type === 'PositionOpened' && data.futuresPosition.trades === '1') {
        if (!!event.futuresOrder?.status) {
          return event.futuresOrder.status
            .toString()
            .concat(': Open ')
            .concat(event.positionSize.gt(0) ? 'Long' : 'Short');
        }
        return 'Open '.concat(event.positionSize.gt(0) ? 'Long' : 'Short');
      }
      // Should never be triggered because of the `event.positionClosed` if statement, but just to make sure
      if (event.type === 'PositionClosed' && event.size.eq(0)) {
        return 'Close '.concat(!event.size.gt(0) ? 'Long' : 'Short');
      }

      if (event.type === 'PositionModified') {
        return event.positionSize.gt(0)
          ? event.size.gt(0)
            ? 'Increase Long, +'.concat(
                numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)).concat(
                  ' sUSD'
                )
              )
            : 'Decrease Long, '.concat(
                numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)).concat(
                  ' sUSD'
                )
              )
          : event.size.gt(0)
          ? 'Decrease Short, '.concat(
              numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)).concat(
                ' sUSD'
              )
            )
          : 'Increase Short, '.concat(
              numberWithCommas((Number(utils.formatEther(event.size)) / 1e18).toFixed(2)).concat(
                ' sUSD'
              )
            );
      }
    }
  }
  if (event.type === 'Liquidated') {
    return 'Liquidation';
  }

  if (event.entity === 'Margin Transferred') {
    return (event.size.gt(0) ? 'Deposit' : 'Withdraw') + ' Margin';
  }

  // DelayedOffChainOrder
  if (event.futuresOrder?.status && event.type === 'PositionOpened') {
    return event.futuresOrder.status
      .toString()
      .concat(': Open ')
      .concat(event.positionSize.gt(0) ? 'Long' : 'Short');
  }
};
