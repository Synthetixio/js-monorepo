import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { TableHeaderCell, PnL, Market, Size, MarkPrice, PercentageChange, WalletTooltip } from '../Shared';
import { OpenPositionsLoading } from './OpenPositionsLoading';
import { usePositions } from '../../hooks';
import { useMarketSummaries } from '../../hooks/useMarketSummaries';
import { useState, useEffect, useMemo, useRef } from 'react';

export const OpenPositionsTable = () => {

  /*
  const [previousParams, setPreviousParams] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  const isInitialRender = useRef(true);
  const [searchParams] = useSearchParams();
  const currentParams = useMemo(() => searchParams.toString(), [searchParams]);

  const { data, error, loading } = usePositions();
  const noData = !data?.length;


  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else if (previousParams !== currentParams) {
      setShowLoading(true);
    }
    // Update previousParams for the next render
    setPreviousParams(currentParams);
  }, [currentParams, previousParams]);

  useEffect(() => {
    if (data) {
      // Data has loaded, hide loading
      setShowLoading(false);
    }
  }, [data]);
  */

  const [storedParams, setStoredParams] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const currentParams = useMemo(() => searchParams.toString(), [searchParams]);

  const { data, error, loading } = usePositions();
  const noData = !data?.length;

  useEffect(() => {
    if (storedParams !== currentParams) {
      setShowLoading(true);
      setStoredParams(currentParams);  // Update storedParams if they have changed
    }
  }, [currentParams, storedParams]);

  useEffect(() => {
    if (data) {
      // Data has loaded, hide loading
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
                <TableHeaderCell>Realized PNL</TableHeaderCell>
                <TableHeaderCell>ROI</TableHeaderCell>
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

                      <PercentageChange amount={unrealizedPnlPercentage.toNumber()} />

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
