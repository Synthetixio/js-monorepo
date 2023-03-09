import {
  Box,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Pagination } from '@synthetixio/v3-theme';
import { FC, useMemo, useState } from 'react';
import { ActionItem } from './components/ActionItem';
import { EventType } from './EventType';
import { useGetFuturesTrades } from './queries/futures-trades';
import { useGetFuturesMarginTransfer } from './queries/margin-transfered';

export const Actions: FC = () => {
  const [page, setPage] = useState([0, 50]);
  const { data: futuresTrades, isLoading: futuresTradesIsLoading } = useGetFuturesTrades();
  const { data: marginTransfer, isLoading: marginTransferIsLoading } =
    useGetFuturesMarginTransfer();

  const allEvents = useMemo(() => {
    if (marginTransfer?.length && futuresTrades?.length) {
      return (marginTransfer as any)
        .concat(futuresTrades as any)
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
  }, [futuresTrades, marginTransfer]);

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" w="100%">
      <Text>Refetching every 30 seconds</Text>
      <TableContainer m="4" w="100%">
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
            {futuresTradesIsLoading || marginTransferIsLoading ? (
              <Spinner colorScheme="cyan" />
            ) : (
              allEvents
                .slice(page[0], page[1])
                .map((event, index) => (
                  <ActionItem event={event} key={event.id.concat(index.toString())} />
                ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Box m="4">
        <Pagination
          dropdownOptions={[25, 50, 100]}
          maxLength={allEvents.length}
          onChange={setPage}
          text="Show rows per pages"
        />
      </Box>
    </Flex>
  );
};
