import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { Currency, TableHeaderCell, Market, Size, MarginTransfer, WalletTooltip } from '../Shared';
import { AllActionsLoading } from '../Actions/AllActionsLoading';
import { useLiquidations } from '../../hooks';

export const LiquidationsTable = () => {
  const { loading, data, error } = useLiquidations();
  console.log('data', loading, error, data);

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
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Fee</TableHeaderCell>
              <TableHeaderCell>Address</TableHeaderCell>
            </Tr>
          </Thead>
          <Tbody>
            {loading && (
              <>
                <AllActionsLoading />
                <AllActionsLoading />
                <AllActionsLoading />
                <AllActionsLoading />
                <AllActionsLoading />
                <AllActionsLoading />
              </>
            )}

            {data?.map(
              ({
                id,
                market: { id: asset },
                liquidator,
                price,
                size,
                timestamp,
                trader,
                txHash,
              }) => {
                return (
                  <Tr key={id} borderTopWidth="1px">
                    <Market
                      asset={asset}
                      leverage={leverage?.toNumber() || null}
                      isPosition={false}
                    />
                    {/* 
                    <Currency amount={price?.toNumber() || null} />
                    {isPosition(label) ? (
                      <Size size={size.toNumber()} marketPrice={price ? price.toNumber() : null} />
                    ) : (
                      <MarginTransfer size={size.toNumber()} />
                    )}
                    <Currency amount={fees?.toNumber() || null} />
                    <WalletTooltip address={address} /> */}
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
