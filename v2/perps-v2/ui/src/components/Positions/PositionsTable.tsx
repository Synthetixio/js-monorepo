import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text, Td, Fade } from '@chakra-ui/react';
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
                <TableHeaderCell>Unrealized PNL</TableHeaderCell>
                <TableHeaderCell>Realized PNL</TableHeaderCell>
                <TableHeaderCell>Size</TableHeaderCell>
                <TableHeaderCell>Remaining Margin</TableHeaderCell>
                <TableHeaderCell>Funding</TableHeaderCell>
                <TableHeaderCell>Fees</TableHeaderCell>
                <TableHeaderCell>Avg Entry Price</TableHeaderCell>
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
                    pnlPercentage,
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
                      <PnL
                        pnl={unrealizedPnl.toNumber()}
                        pnlPercentage={pnlPercentage.toNumber()}
                      />
                      <PnL pnl={realizedPnl.toNumber()} />

                      <Size size={size.toNumber()} marketPrice={marketPrice.toNumber()} />

                      {/* Collateral */}
                      <Currency amount={remainingMargin.toNumber()} />
                      {/* Funding */}
                      <Funding amount={funding.toNumber()} />
                      {/* Fees */}
                      <Currency amount={fees.toNumber()} />
                      {/* Entry Price */}
                      <Currency amount={avgEntryPrice.toNumber()} />

                      {/* Mark Price */}
                      <MarkPrice
                        indexPrice={indexPrice.toNumber()}
                        markPrice={marketPrice.toNumber()}
                      />

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
