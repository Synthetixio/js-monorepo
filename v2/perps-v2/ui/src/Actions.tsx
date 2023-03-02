import { Spinner, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { ActionItem } from './components/ActionItem';
import { EventType } from './EventType';
import { useGetDelayedOrder } from './queries/delayed-orders';
import { useGetFuturesTrades } from './queries/futures-trades';
import { useGetLiquidations } from './queries/liquidation';

export const Actions: FC = () => {
  const { data: orders, isLoading: ordersIsLoading } = useGetDelayedOrder();
  const { data: futuresTrades, isLoading: futuresTradesIsLoading } = useGetFuturesTrades();
  const { data: positionLiquidated, isLoading: positionLiquidatedIsLoading } = useGetLiquidations();

  const allEvents = useMemo(() => {
    if (orders?.length && futuresTrades?.length) {
      return (orders as any)
        .concat(futuresTrades as any)
        .concat(positionLiquidated as any)
        .sort((a: { timestamp: string }, b: { timestamp: string }) => {
          if (Number(a.timestamp) < Number(b.timestamp)) {
            return 1;
          }
          if (Number(a.timestamp) > Number(b.timestamp)) {
            return -1;
          }
          return 0;
        }) as EventType[];
    }
    return [];
  }, [orders, futuresTrades, positionLiquidated]);

  return (
    <TableContainer m="4">
      <Table>
        <Thead>
          <Tr>
            <Th>Action</Th>
            <Th>Wallet Address</Th>
            <Th>Market</Th>
            <Th>Price</Th>
            <Th>Size</Th>
            <Th>Fee</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ordersIsLoading || futuresTradesIsLoading || positionLiquidatedIsLoading ? (
            <Spinner colorScheme="cyan" />
          ) : (
            allEvents.map((event, index) => (
              <ActionItem event={event} key={event.id.concat(index.toString())} />
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
