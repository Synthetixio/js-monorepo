import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { MarketsTableLoading } from './MarketsTableLoading';
import { useMarketStats } from '../../hooks';
import { Market, TableHeaderCell } from '../Shared';

export const MarketsTable = () => {
  const { data, loading } = useMarketStats();

  console.log(data);

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
              <TableHeaderCell>24H Change</TableHeaderCell>
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
                id,
                market: { asset },
              } = item;
              return (
                <Tr key={id} borderTopWidth="1px">
                  <Market asset={asset} leverage={null} isPosition={false} />

                  {/* <Currency amount={price?.toNumber() || null} />
                  {isPosition(label) ? (
                    <Size size={size.toNumber()} marketPrice={price?.toNumber() || null} />
                  ) : (
                    <MarginTransfer size={size.toNumber()} />
                  )}
                  <Currency amount={fees?.toNumber() || null} /> */}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {!loading && data.length === 0 && (
          <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
            <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
              No actions
            </Text>
          </Flex>
        )}
      </TableContainer>
    </>
  );
};
