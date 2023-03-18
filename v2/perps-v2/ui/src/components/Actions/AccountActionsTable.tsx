import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useActions } from '../../hooks';
import { Currency, TableHeaderCell, Market, Size, MarginTransfer } from '../Shared';
import { Action } from '../Shared/Action';
import { AccountActionsLoading } from './AccountActionsLoading';

const isPosition = (l: string) => l !== 'Deposit Margin' && l !== 'Withdraw Margin';

export const AccountActionsTable = () => {
  const { walletAddress } = useParams();

  const { data, loading, error } = useActions(walletAddress);

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
            {data?.map((item) => {
              const { label, asset, price, leverage, size, fees, id, txHash, timestamp } = item;
              const isLong = !size.includes('-');

              return (
                <Tr key={id} borderTopWidth="1px">
                  <Action label={label} timestamp={timestamp} txHash={txHash} />
                  <Market
                    asset={asset}
                    leverage={leverage}
                    long={isLong}
                    isPosition={isPosition(label)}
                  />
                  <Currency amount={price} />
                  {isPosition(label) ? (
                    <Size size={size} lastPrice={price} />
                  ) : (
                    <MarginTransfer size={size} />
                  )}
                  <Currency amount={fees} />
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {(!loading && data.length === 0) ||
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
