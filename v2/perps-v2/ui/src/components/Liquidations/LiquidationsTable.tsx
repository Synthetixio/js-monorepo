import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import {
  Currency,
  TableHeaderCell,
  Market,
  Size,
  WalletTooltip,
  LiquidatorTooltip,
  Age,
} from '../Shared';
import { useLiquidations } from '../../hooks';
import { LiquidationsLoading } from './LiquidationsLoading';

export const LiquidationsTable = () => {
  const { loading, data, error } = useLiquidations();

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
              <TableHeaderCell>Age</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Fee</TableHeaderCell>
              <TableHeaderCell>Address</TableHeaderCell>
              <TableHeaderCell>Liquidator</TableHeaderCell>
            </Tr>
          </Thead>
          <Tbody>
            {loading && (
              <>
                <LiquidationsLoading />
                <LiquidationsLoading />
                <LiquidationsLoading />
                <LiquidationsLoading />
              </>
            )}

            {data?.map(
              ({
                id: liquidationId,
                market: { asset },
                liquidator,
                timestamp,
                price,
                size,
                trader: { id },
                fee,
                futuresPosition: { leverage },
                txHash,
                long,
              }) => {
                return (
                  <Tr key={liquidationId} borderTopWidth="1px">
                    <Market
                      asset={asset}
                      leverage={leverage?.toNumber() || null}
                      direction={long ? 'LONG' : 'SHORT'}
                      txHash={txHash}
                    />
                    <Age timestamp={timestamp} />
                    <Currency amount={price?.toNumber() || null} />
                    <Size size={size.toNumber()} marketPrice={price ? price.toNumber() : null} />
                    <Currency amount={fee?.toNumber() || null} />
                    <WalletTooltip address={id} />
                    <LiquidatorTooltip address={liquidator} />
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
        {((!loading && data?.length === 0) || error) && (
          <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
            <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
              No Liquidations
            </Text>
          </Flex>
        )}
      </TableContainer>
    </>
  );
};
