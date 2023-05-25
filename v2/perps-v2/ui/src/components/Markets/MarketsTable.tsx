import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { MarketsTableLoading } from './MarketsTableLoading';
import { useMarkets } from '../../hooks';
import {
  DailyVolumeChange,
  Funding,
  Market,
  MarkPrice,
  OpenInterest,
  PremiumDiscount,
  Skew,
  TableHeaderCell,
} from '../Shared';
import { wei } from '@synthetixio/wei';
import { calculateSkew } from '../../utils';

export const MarketsTable = () => {
  const { data, loading, error } = useMarkets();

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
              <TableHeaderCell>Mark Price</TableHeaderCell>
              <TableHeaderCell>Premium/Discount</TableHeaderCell>
              <TableHeaderCell>1H Funding Rate</TableHeaderCell>
              <TableHeaderCell>Open Interest</TableHeaderCell>
              <TableHeaderCell>Skew</TableHeaderCell>
              <TableHeaderCell>24H Volume</TableHeaderCell>
            </Tr>
          </Thead>
          <Tbody>
            {loading && (
              <>
                <MarketsTableLoading />
                <MarketsTableLoading />
                <MarketsTableLoading />
              </>
            )}
            {data?.map((item) => {
              const {
                market: { asset, marketKey },
                markPrice,
                indexPrice,
                fundingRate,
                percentageDifference,
                volume,
                long,
                short,
                skewPercent,
              } = item;

              const skewValue = calculateSkew(long, short);
              return (
                <Tr key={marketKey} borderTopWidth="1px">
                  <Market asset={asset} leverage={null} isPosition={false} />
                  <MarkPrice markPrice={markPrice.toNumber()} indexPrice={indexPrice.toNumber()} />
                  <PremiumDiscount amount={skewPercent.toNumber()} />
                  <Funding withDollar={false} amount={100 * fundingRate.toNumber()} />
                  <OpenInterest
                    long={long.toNumber()}
                    short={short.toNumber()}
                    price={markPrice.toNumber()}
                  />
                  <Skew skew={skewValue} />
                  <DailyVolumeChange
                    volume={wei(volume, 18, true).toNumber()}
                    percentage={percentageDifference.toNumber()}
                  />
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <>
          {((!loading && data?.length === 0) || error) && (
            <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
              <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
                No market data
              </Text>
            </Flex>
          )}
        </>
      </TableContainer>
    </>
  );
};
