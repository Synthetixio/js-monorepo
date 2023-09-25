import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { POSITIONS_QUERY_MARKET } from '../../../queries/positions';
import { Market, PnL, Size, TableHeaderCell, WalletTooltip } from '../../Shared';
import { FuturesPosition_OrderBy, OrderDirection } from '../../../__generated__/graphql';
import { wei } from '@synthetixio/wei';
import { SmallTableLoading } from './SmallTableLoading';

export const ClosestToLiquidation = () => {
  const { data, loading, error } = useQuery(POSITIONS_QUERY_MARKET, {
    variables: {
      where: {
        isOpen: true,
        unrealizedPnl_lt: '0',
      },
      orderBy: FuturesPosition_OrderBy.Leverage,
      orderDirection: OrderDirection.Desc,
      first: 3,
    },
    pollInterval: 10000,
  });

  return (
    <>
      <TableContainer
        width="100%"
        my={5}
        borderColor="gray.900"
        borderWidth="1px"
        borderRadius="5px"
        sx={{
          borderCollapse: 'separate !important',
          borderSpacing: 0,
        }}
        bg="navy.700"
      >
        <Text pt={4} px={6} fontFamily="heading" fontSize="20px" fontWeight={700} lineHeight="28px">
          Closest to Liquidation
        </Text>
        <Table bg="navy.700">
          <Thead>
            <Tr>
              <TableHeaderCell>Market</TableHeaderCell>
              <TableHeaderCell>
                <Text>Size</Text>
                <Text>&nbsp;</Text>
              </TableHeaderCell>
              <TableHeaderCell>Realised PnL</TableHeaderCell>
            </Tr>
          </Thead>
          <Tbody>
            {loading && (
              <>
                <SmallTableLoading />
                <SmallTableLoading />
                <SmallTableLoading />
              </>
            )}
            {data?.futuresPositions.map((item) => {
              const {
                id,
                trader,
                market: { asset },
                leverage,
                long,
                unrealizedPnl,
                size,
                lastPrice,
              } = item;

              return (
                <Tr key={id} borderTopWidth="1px">
                  <Market
                    asset={asset}
                    leverage={wei(leverage, 18, true).toNumber()}
                    direction={long ? 'LONG' : 'SHORT'}
                  />
                  <Size
                    size={wei(size, 18, true).toNumber()}
                    marketPrice={wei(lastPrice, 18, true).toNumber()}
                  />
                  <PnL pnl={wei(unrealizedPnl, 18, true).toNumber()} />
                  <WalletTooltip address={trader.id} />
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {(!loading && data?.futuresPositions.length === 0) ||
          (error && (
            <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
              <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
                No results
              </Text>
            </Flex>
          ))}
      </TableContainer>
    </>
  );
};
