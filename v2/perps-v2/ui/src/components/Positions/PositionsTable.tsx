import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import { usePositions } from '../../hooks';
import { POSITIONS_QUERY } from '../../queries/positions';
import { FuturesPosition_OrderBy, OrderDirection } from '../../__generated__/graphql';
import { Currency, TableHeaderCell, PnL, Market, Size, Funding, MarkPrice } from '../Shared';
import { PositionsLoading } from './PositionsLoading';

export const PositionsTable = () => {
  const { walletAddress } = useParams();

  // const { loading: hookLoading, data: hookData } = usePositions(walletAddress);

  const { loading, data, error } = useQuery(POSITIONS_QUERY, {
    variables: {
      where: { isOpen: true, account: walletAddress },
      orderBy: FuturesPosition_OrderBy.Size,
      orderDirection: OrderDirection.Asc,
      first: 50,
    },
  });

  return (
    <>
      <TableContainer
        maxW="100%"
        my={5}
        borderColor="gray.900"
        borderWidth="1px"
        borderRadius="5px"
        sx={{
          borderCollapse: 'separate !important',
          borderSpacing: 0,
        }}
      >
        <Table bg="navy.700">
          <Thead>
            <Tr>
              <TableHeaderCell>Market</TableHeaderCell>
              <TableHeaderCell>Net Value</TableHeaderCell>
              <TableHeaderCell>PnL</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Collateral</TableHeaderCell>
              <TableHeaderCell>Funding</TableHeaderCell>
              <TableHeaderCell>Entry Price</TableHeaderCell>
              <TableHeaderCell>Mark Price</TableHeaderCell>
              <TableHeaderCell>Liquidation Price</TableHeaderCell>
            </Tr>
          </Thead>
          <Tbody>
            {loading && (
              <>
                <PositionsLoading />
                <PositionsLoading />
                <PositionsLoading />
              </>
            )}
            {data?.futuresPositions.map(
              (
                {
                  account,
                  market: { asset },
                  entryPrice,
                  lastPrice,
                  leverage,
                  pnl,
                  margin,
                  size,
                  long,
                },
                index
              ) => {
                return (
                  <Tr key={account.concat(index.toString())} borderTopWidth="1px">
                    <Market asset={asset} leverage={leverage} long={long} />
                    <Currency amount={lastPrice} />
                    <PnL amount={pnl} entryPrice={entryPrice} lastPrice={lastPrice} />
                    <Size size={size} lastPrice={lastPrice} />
                    <Currency amount={margin} />
                    <Funding amount={margin} />
                    <Currency amount={entryPrice} />
                    <MarkPrice lastPrice={lastPrice} entryPrice={entryPrice} />
                    <Currency amount={lastPrice} />
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
        {(!loading && data?.futuresPositions.length === 0) ||
          (error && (
            <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
              <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
                No open positions
              </Text>
            </Flex>
          ))}
      </TableContainer>
    </>
  );
};
