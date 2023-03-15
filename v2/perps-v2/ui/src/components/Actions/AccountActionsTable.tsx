import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FuturesPosition_OrderBy, OrderDirection } from '../../__generated__/graphql';
import { Currency, TableHeaderCell, Market, Size } from '../Shared';
import { ACCOUNT_ACTIONS_QUERY } from '../../queries/actions';
import { AccountActionsLoading } from './AccountActionsLoading';

export const AccountActionsTable = () => {
  const { walletAddress } = useParams();

  const { loading, data, error } = useQuery(ACCOUNT_ACTIONS_QUERY, {
    variables: {
      where: { isOpen: true, account: walletAddress },
      orderBy: FuturesPosition_OrderBy.OpenTimestamp,
      orderDirection: OrderDirection.Desc,
      first: 50,
    },
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
              <TableHeaderCell>Market</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Fee</TableHeaderCell>
            </Tr>
          </Thead>
          <Tbody>
            {loading && (
              <>
                <AccountActionsLoading />
                <AccountActionsLoading />
                <AccountActionsLoading />
              </>
            )}
            {data?.futuresPositions.map(
              ({ market: { asset }, lastPrice, leverage, size, long, feesPaidToSynthetix, id }) => {
                return (
                  <Tr key={id} borderTopWidth="1px">
                    <Currency amount={lastPrice} />
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
        {(!loading && data?.futuresPositions.length === 0) ||
          (error && (
            <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
              <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
                No actions
              </Text>
            </Flex>
          ))}
      </TableContainer>
    </>
  );
};
