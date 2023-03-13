import { useQuery } from '@apollo/client';
import { TableContainer, Table, Thead, Tr, Tbody, Td } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { POSITIONS_QUERY } from '../../queries/positions';
import { numberWithCommas } from '../../utils/numbers';
import { Currency, TableHeaderCell, PnL, Market, Size, Funding, MarkPrice } from '../Shared';
import { utils } from 'ethers';
import { FuturesPosition_OrderBy, OrderDirection } from '../../__generated__/graphql';

export const PositionsList = () => {
  const { walletAddress } = useParams();

  const { loading, data } = useQuery(POSITIONS_QUERY, {
    pollInterval: 5000,
    variables: {
      where: { size_gt: '0', isOpen: true },
      orderBy: FuturesPosition_OrderBy.OpenTimestamp,
      orderDirection: OrderDirection.Desc,
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
      </TableContainer>
    </>
  );
};
