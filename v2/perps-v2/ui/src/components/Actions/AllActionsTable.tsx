import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { Currency, TableHeaderCell, Market, Size, WalletAddress, MarginTransfer } from '../Shared';
import { AllActionsLoading } from './AllActionsLoading';
import { useActions } from '../../hooks';
import { Action } from '../Shared/Action';
const isPosition = (l: string) => l !== 'Deposit Margin' && l !== 'Withdraw Margin';

export const AllActionsTable = () => {
  const { loading, data, error } = useActions();

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

            {data?.map((item, index) => {
              const { label, address, asset, price, fees, size, txHash, timestamp, leverage } =
                item;
              const isLong = !size.includes('-');

              return (
                <Tr key={address.concat(index.toString())} borderTopWidth="1px">
                  <Action label={label} txHash={txHash} timestamp={timestamp} />
                  <WalletAddress account={address} />
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
        {!loading && data?.length === 0 && (
          <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
            <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
              No positions
            </Text>
          </Flex>
        )}
        {error && (
          <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
            <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
              No positions
            </Text>
          </Flex>
        )}
      </TableContainer>
    </>
  );
};
