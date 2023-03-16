import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import {
  Currency,
  TableHeaderCell,
  PnL,
  Market,
  Size,
  Funding,
  MarkPrice,
  NetValue,
} from '../Shared';
import { PositionsLoading } from './PositionsLoading';
import { usePositions } from '../../hooks';

export const PositionsTable = () => {
  const { walletAddress } = useParams();

  const { loading, data, error } = usePositions(walletAddress);

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
            {data?.map(
              (
                {
                  asset,
                  entryPrice,
                  lastPrice,
                  leverage,
                  pnl,
                  margin,
                  size,
                  long,
                  address,
                  funding,
                  liquidationPrice,
                },
                index
              ) => {
                const netValue =
                  Math.abs(parseInt(size) / 1e18) * (parseInt(lastPrice) / 1e18) +
                  parseInt(funding) / 1e18 +
                  parseInt(pnl) / 1e18;

                return (
                  <Tr key={address?.concat(index.toString())} borderTopWidth="1px">
                    {/* Market and Direction */}
                    <Market asset={asset} leverage={leverage} long={long} />
                    {/* Net value */}
                    <NetValue amount={netValue.toFixed(2)} />
                    <PnL amount={pnl} entryPrice={entryPrice} lastPrice={lastPrice} />
                    <Size size={size} lastPrice={lastPrice} />
                    {/* Collateral */}
                    <Currency amount={margin} />
                    {/* Funding */}
                    <Funding amount={funding} />
                    {/* Entry Price */}
                    <Currency amount={entryPrice} />
                    <MarkPrice lastPrice={lastPrice} entryPrice={entryPrice} />
                    <Currency amount={liquidationPrice} />
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
        {!loading && data?.length === 0 && (
          <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
            <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
              No open positions
            </Text>
          </Flex>
        )}
        {error && (
          <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
            <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
              No open positions
            </Text>
          </Flex>
        )}
      </TableContainer>
    </>
  );
};
