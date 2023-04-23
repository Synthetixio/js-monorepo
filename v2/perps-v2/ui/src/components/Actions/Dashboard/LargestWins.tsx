import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { POSITIONS_QUERY_MARKET } from '../../../queries/positions';
import { Market, PnL, TableHeaderCell, WalletAddress } from '../../Shared';
import { FuturesPosition_OrderBy, OrderDirection } from '../../../__generated__/graphql';
import { getUnixTime, subDays } from 'date-fns';
import { wei } from '@synthetixio/wei';
import { SmallTableLoading } from './SmallTableLoading';

export const LargestWins = () => {
  const { data, loading, error } = useQuery(POSITIONS_QUERY_MARKET, {
    variables: {
      where: {
        openTimestamp_gte: `${getUnixTime(subDays(new Date(), 1))}`,
        isOpen: false,
      },
      orderBy: FuturesPosition_OrderBy.RealizedPnl,
      orderDirection: OrderDirection.Desc,
      first: 3,
    },
    pollInterval: 10000,
  });

  return (
    <>
      <TableContainer
        width="100%"
        my={5}
        borderColor="gray.900"
        borderWidth="1px"
        borderRadius="5px"
        sx={{
          borderCollapse: 'separate !important',
          borderSpacing: 0,
        }}
        bg="navy.700"
      >
        <Text pt={4} px={6} fontFamily="heading" fontSize="20px" fontWeight={700} lineHeight="28px">
          Largest Wins of the day
        </Text>
        <Table bg="navy.700">
          <Thead>
            <Tr>
              <TableHeaderCell>Market</TableHeaderCell>
              <TableHeaderCell>Wallet Address</TableHeaderCell>
              <TableHeaderCell>Realised PnL</TableHeaderCell>
            </Tr>
          </Thead>
          <Tbody>
            {loading && (
              <>
                <SmallTableLoading />
                <SmallTableLoading />
                <SmallTableLoading />
              </>
            )}
            {data?.futuresPositions.map((item) => {
              const {
                id,
                trader,
                market: { asset },
                leverage,
                realizedPnl,
                long,
              } = item;

              return (
                <Tr key={id} borderTopWidth="1px">
                  <Market
                    asset={asset}
                    leverage={wei(leverage, 18, true).toNumber()}
                    direction={long ? 'LONG' : 'SHORT'}
                  />
                  <WalletAddress account={trader.id} />
                  <PnL pnl={wei(realizedPnl, 18, true).toNumber()} />
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {(!loading && data?.futuresPositions.length === 0) ||
          (error && (
            <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
              <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
                No actions
              </Text>
            </Flex>
          ))}
      </TableContainer>
    </>
  );
};
