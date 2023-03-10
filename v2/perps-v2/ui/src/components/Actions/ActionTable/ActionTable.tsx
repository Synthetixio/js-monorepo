import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react';

interface ActionTableProps {
  isLoading: boolean;
}

export const ActionTable = ({ isLoading }: ActionTableProps) => {
  console.log(isLoading);
  return (
    <TableContainer>
      <Table
        mt={5}
        variant="simple"
        // borderWidth="1px"
        borderColor="gray.900"
        backgroundColor="#0B0B22"
        borderRadius="5px"
        display="inline-block"
        bg="navy.700"
      >
        <Thead border="none">
          <Tr border="none">
            <Th border="none" textTransform="capitalize">
              Market
            </Th>
            <Th border="none" textTransform="capitalize">
              Net Value
            </Th>
            <Th border="none" textTransform="capitalize">
              PnL
            </Th>
            <Th border="none" textTransform="capitalize">
              Size
            </Th>
            <Th border="none" textTransform="capitalize">
              Collateral
            </Th>
            <Th border="none" textTransform="capitalize">
              Entry Price
            </Th>
            <Th border="none" textTransform="capitalize">
              Mark Price
            </Th>
            <Th border="none" textTransform="capitalize">
              Liq. Price
            </Th>
          </Tr>
        </Thead>
        {/* Body begins here */}
        {/* {results.map} */}
        <Tbody>
          <Tr>
            {/* PERP */}
            <Td>
              <Text>BTCPERP</Text>
              <Text>4x LONG </Text>
            </Td>
            {/* PRICE */}
            <Td>$23,839.31</Td>
            {/* PnL */}
            <Td>
              <Text>$23.31</Text>
              <Text>+21.3%</Text>
            </Td>
            {/* Size */}
            <Td>
              <Text>1.25 BTC</Text>
              <Text>$230,943.11</Text>
            </Td>
            {/* Collateral */}
            <Td>$23,839.31</Td>
            {/* Entry Price */}
            <Td>$23,839.31</Td>
            {/* Mark Price */}
            <Td>$21,967.77</Td>
            {/* Liquidation Price */}
            <Td>$18,344.21</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
