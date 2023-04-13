import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Currency, TableHeaderCell, PnL, Market, Size, Funding, MarkPrice } from '../Shared';
import { PositionsLoading } from './PositionsLoading';
import { usePositions } from '../../hooks';

export const PositionsTable = () => {
  const { walletAddress } = useParams();
  const { data, error, loading } = usePositions(walletAddress);

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
        <>
          <Table bg="navy.700">
            <Thead>
              <Tr>
                <TableHeaderCell>Market</TableHeaderCell>
                <TableHeaderCell>Mark Price</TableHeaderCell>
                <TableHeaderCell>Size</TableHeaderCell>
                <TableHeaderCell>Unrealized PNL</TableHeaderCell>
                <TableHeaderCell>Realized PNL</TableHeaderCell>
                <TableHeaderCell>Remaining Margin</TableHeaderCell>
                <TableHeaderCell>Funding</TableHeaderCell>
                <TableHeaderCell>Fees</TableHeaderCell>
                <TableHeaderCell>Avg Entry Price</TableHeaderCell>
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
                    avgEntryPrice,
                    indexPrice,
                    leverage,
                    unrealizedPnl,
                    realizedPnl,
                    remainingMargin,
                    size,
                    long,
                    address,
                    funding,
                    liquidationPrice,
                    marketPrice,
                    fees,
                    unrealizedPnlPercentage,
                  },
                  index
                ) => {
                  return (
                    <Tr key={address?.concat(index.toString())} borderTopWidth="1px">
                      {/* Market and Direction */}
                      <Market
                        asset={asset}
                        leverage={leverage.toNumber()}
                        direction={long ? 'LONG' : 'SHORT'}
                      />
                      {/* Mark Price */}
                      <MarkPrice
                        indexPrice={indexPrice.toNumber()}
                        markPrice={marketPrice.toNumber()}
                      />
                      <Size size={size.toNumber()} marketPrice={marketPrice.toNumber()} />

                      <PnL
                        pnl={unrealizedPnl.toNumber()}
                        pnlPercentage={unrealizedPnlPercentage.toNumber()} //
                      />
                      <PnL pnl={realizedPnl.toNumber()} />

                      {/* Collateral */}
                      <Currency amount={remainingMargin.toNumber()} />
                      {/* Funding */}
                      <Funding amount={funding.toNumber()} />
                      {/* Fees */}
                      <Currency amount={fees.toNumber()} />
                      {/* Entry Price */}
                      <Currency amount={avgEntryPrice.toNumber()} />

                      {/* Liquidation Price */}
                      <Currency amount={liquidationPrice.toNumber()} />
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
        </>
      </TableContainer>
    </>
  );
};
