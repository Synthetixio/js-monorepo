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
import { formatUnits } from 'ethers/lib/utils';

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
                  indexPrice,
                  leverage,
                  pnl,
                  margin,
                  size,
                  long,
                  address,
                  funding,
                  liquidationPrice,
                  skew,
                  skewScale,
                  fees,
                },
                index
              ) => {
                const skewRatio = parseInt(skew) / parseInt(skewScale);
                // The last price is the price supplied by oracle.
                // We need to contruct the market price by applying a premium
                const marketPrice = parseFloat(formatUnits(indexPrice, 18)) * (1 + skewRatio);
                const sizeAmount = parseFloat(formatUnits(size, 18));
                // Need to take away fees
                const netValue =
                  Math.abs(sizeAmount) * marketPrice +
                  parseFloat(formatUnits(funding, 18)) +
                  parseFloat(formatUnits(pnl, 18)) -
                  parseFloat(formatUnits(fees, 18));

                return (
                  <Tr key={address?.concat(index.toString())} borderTopWidth="1px">
                    {/* Market and Direction */}
                    <Market asset={asset} leverage={leverage} long={long} />
                    {/* Net value */}
                    <NetValue amount={netValue} />
                    <PnL
                      amount={pnl}
                      funding={funding}
                      fees={fees}
                      netValue={netValue}
                      entryValue={sizeAmount * parseFloat(formatUnits(entryPrice, 18))}
                    />
                    <Size size={size} marketPrice={marketPrice} />
                    {/* Collateral */}
                    <Currency amount={margin} />
                    {/* Funding */}
                    <Funding amount={funding} />
                    {/* Entry Price */}
                    <Currency amount={entryPrice} />
                    {/* Mark Price */}
                    <MarkPrice lastPrice={indexPrice} markPrice={marketPrice} />
                    {/* Liquidation Price */}
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
