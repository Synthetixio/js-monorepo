import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { POSITIONS_QUERY } from '../../queries/positions';
import { Market, PnL, TableHeaderCell, WalletAddress } from '../Shared';
import { AccountActionsLoading } from './AccountActionsLoading';
import { FuturesPosition_OrderBy, OrderDirection } from '../../__generated__/graphql';
import { getUnixTime, subDays } from 'date-fns';

const isPosition = (l: string) => l !== 'Deposit Margin' && l !== 'Withdraw Margin';

export const SmallActionsTable = () => {
  const { walletAddress } = useParams();

  const { data, loading, error } = useQuery(POSITIONS_QUERY, {
    variables: {
      where: {
        account: walletAddress,
        openTimestamp_gte: `${getUnixTime(subDays(new Date(), 1))}`,
        isOpen: true,
      },
      orderBy: FuturesPosition_OrderBy.Pnl,
      orderDirection: OrderDirection.Desc,
      first: 3,
    },
  });

  console.log(data, error);

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
              <TableHeaderCell>Realised PnL</TableHeaderCell>
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
            {data?.futuresPositions.map((item) => {
              const {
                id,
                account,
                market: { asset },
                pnl,
              } = item;

              return (
                <Tr key={id} borderTopWidth="1px">
                  <Market
                    asset={asset}
                    leverage={leverage?.toNumber() || null}
                    isPosition={isPosition(label)}
                  />
                  <WalletAddress account={account} />
                  <PnL pnl={pnl} />
                </Tr>
              );
            })}
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
