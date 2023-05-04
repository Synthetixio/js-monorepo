import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { Market, Size, TableHeaderCell, WalletAddress } from '../../Shared';
import { wei } from '@synthetixio/wei';
import { SmallTableLoading } from './SmallTableLoading';
import { DataInterface, useLargestOpenPosition } from '../../../hooks';

export const LargestOpen = () => {
  const { loading, data, error } = useLargestOpenPosition();

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
        <>
          <Text
            pt={4}
            px={6}
            fontFamily="heading"
            fontSize="20px"
            fontWeight={700}
            lineHeight="28px"
          >
            Largest open positions
          </Text>
          <Table bg="navy.700">
            <Thead>
              <Tr>
                <TableHeaderCell>Market</TableHeaderCell>
                <TableHeaderCell>Wallet Address</TableHeaderCell>
                <TableHeaderCell>Size</TableHeaderCell>
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
              {data?.map((item: DataInterface) => {
                const {
                  id,
                  trader,
                  market: { asset },
                  pythItem: { price },
                  leverage,
                  long,
                  size,
                } = item;

                return (
                  <Tr key={id} borderTopWidth="1px">
                    <Market
                      asset={asset}
                      leverage={wei(leverage, 18, true).toNumber()}
                      direction={long ? 'LONG' : 'SHORT'}
                    />
                    <WalletAddress account={trader.id} />
                    <Size
                      size={wei(size, 18, true).toNumber()}
                      marketPrice={wei(price, 8, true).toNumber()}
                    />
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          {(!loading && data?.length === 0) ||
            (error && (
              <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
                <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
                  No actions
                </Text>
              </Flex>
            ))}
        </>
      </TableContainer>
    </>
  );
};
