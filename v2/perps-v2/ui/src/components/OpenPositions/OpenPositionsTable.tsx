import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import {
  TableHeaderCell,
  PnL,
  Market,
  Size,
  MarkPrice,
  PercentageChange,
  WalletTooltip,
} from '../Shared';
import { OpenPositionsLoading } from './OpenPositionsLoading';
import { usePositions, PositionType } from '../../hooks';
import { useState, useEffect, useMemo } from 'react';

export const OpenPositionsTable = () => {
  const [storedParams, setStoredParams] = useState<string>('');
  const [showLoading, setShowLoading] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const currentParams = useMemo(() => searchParams.toString(), [searchParams]);

  const { data, error, loading } = usePositions();
  const noData = !data?.length;

  // we are loading lots of data, only show loading component on inital render or when params have changed
  useEffect(() => {
    if (storedParams !== currentParams) {
      setShowLoading(true);
      setStoredParams(currentParams);
    }
  }, [currentParams, storedParams]);

  useEffect(() => {
    if (data) {
      setShowLoading(false);
    }
  }, [data]);

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
                <TableHeaderCell>ROI</TableHeaderCell>
                <TableHeaderCell>Realized PNL</TableHeaderCell>
                <TableHeaderCell>Address</TableHeaderCell>
              </Tr>
            </Thead>
            <Tbody>
              {showLoading && (
                <>
                  <OpenPositionsLoading />
                  <OpenPositionsLoading />
                  <OpenPositionsLoading />
                </>
              )}
              {data?.map(
                (
                  {
                    asset,
                    indexPrice,
                    leverage,
                    unrealizedPnl,
                    realizedPnl,
                    size,
                    long,
                    address,
                    marketPrice,
                    unrealizedPnlPercentage,
                  }: PositionType,
                  index: number
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
                      {/* PNL */}
                      <PnL
                        pnl={unrealizedPnl.toNumber()}
                        pnlPercentage={unrealizedPnlPercentage.toNumber()} //
                      />
                      {/* Unrealized ROI */}
                      <PercentageChange amount={unrealizedPnlPercentage.toNumber()} />
                      {/* Realized PNL */}
                      <PnL pnl={realizedPnl.toNumber()} />
                      {/* Address */}
                      <WalletTooltip address={address} />
                    </Tr>
                  );
                }
              )}
            </Tbody>
          </Table>

          {!loading && !error && noData && (
            <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
              <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
                No open positions
              </Text>
            </Flex>
          )}

          {error && noData && !loading && (
            <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
              <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
                We&apos;re having problem loading the position data
              </Text>
            </Flex>
          )}
        </>
      </TableContainer>
    </>
  );
};
