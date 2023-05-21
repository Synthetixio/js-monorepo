import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { Currency, TableHeaderCell, Market, Size, MarginTransfer, WalletTooltip } from '../Shared';
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

            {data?.map(
              ({ label, address, asset, price, fees, size, txHash, timestamp, leverage, id }) => {
                return (
                  <Tr key={id} borderTopWidth="1px">
                    <Action label={label} txHash={txHash} timestamp={timestamp.toNumber()} />
                    <Market
                      asset={asset}
                      leverage={leverage?.toNumber() || null}
                      isPosition={isPosition(label)}
                    />
                    <Currency amount={price?.toNumber() || null} />
                    {isPosition(label) ? (
                      <Size size={size.toNumber()} marketPrice={price ? price.toNumber() : null} />
                    ) : (
                      <MarginTransfer size={size.toNumber()} />
                    )}
                    <Currency amount={fees?.toNumber() || null} />
                    <WalletTooltip address={address} />
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
        {((!loading && data?.length === 0) || error) && (
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
