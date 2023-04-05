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
                {/* <TableHeaderCell>Net Value</TableHeaderCell> */}
                <TableHeaderCell>Unrealized PNL</TableHeaderCell>
                <TableHeaderCell>Realized PNL</TableHeaderCell>
                <TableHeaderCell>Size</TableHeaderCell>
                <TableHeaderCell>Collateral</TableHeaderCell>
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
                    margin,
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
                  // Need to take away fees
                  // const netValue = size.abs().mul(marketPrice).add(pnl).sub(fees);

                  return (
                    <Tr key={address?.concat(index.toString())} borderTopWidth="1px">
                      {/* Market and Direction */}
                      <Market
                        asset={asset}
                        leverage={leverage.toNumber()}
                        direction={long ? 'LONG' : 'SHORT'}
                      />
                      {/* Net value */}
                      {/* <NetValue amount={netValue.toNumber()} /> */}
                      <PnL
                        pnl={unrealizedPnl.toNumber()}
                        pnlPercentage={pnlPercentage.toNumber()}
                      />
                      <PnL pnl={realizedPnl.toNumber()} />

                      <Size size={size.toNumber()} marketPrice={marketPrice.toNumber()} />

                      {/* Collateral */}
                      <Currency amount={margin.toNumber()} />
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
