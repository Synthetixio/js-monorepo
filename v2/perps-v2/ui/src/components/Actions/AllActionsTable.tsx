import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { FuturesPosition_OrderBy, OrderDirection } from '../../__generated__/graphql';
import { Currency, TableHeaderCell, Market, Size, WalletAddress } from '../Shared';
import { ALL_ACTIONS_QUERY } from '../../queries/actions';
import { AllActionsLoading } from './AllActionsLoading';

export const AllActionsTable = () => {
  const { loading, data } = useQuery(ALL_ACTIONS_QUERY, {
    variables: {
      where: { isOpen: true },
      orderBy: FuturesPosition_OrderBy.OpenTimestamp,
      orderDirection: OrderDirection.Desc,
      first: 50,
    },
    pollInterval: 5000,
  });

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
              <TableHeaderCell>Action</TableHeaderCell>
              <TableHeaderCell>Wallet Address</TableHeaderCell>
              <TableHeaderCell>Market</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Fee</TableHeaderCell>
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
            {data?.futuresPositions.map(
              (
                {
                  openTimestamp,
                  account,
                  market: { asset },
                  lastPrice,
                  leverage,
                  size,
                  long,
                  feesPaidToSynthetix,
                },
                index
              ) => {
                console.log(openTimestamp);
                return (
                  <Tr key={account.concat(index.toString())} borderTopWidth="1px">
                    {/* TODO Action */}
                    <Currency amount={lastPrice} />
                    <WalletAddress account={account} />
                    <Market asset={asset} leverage={leverage} long={long} />
                    <Currency amount={lastPrice} />
                    <Size size={size} lastPrice={lastPrice} />
                    <Currency amount={feesPaidToSynthetix} />
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
        {!loading && data?.futuresPositions.length === 0 && (
          <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
            <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
              No open positions
            </Text>
          </Flex>
        )}
      </TableContainer>
    </>
  );
};
