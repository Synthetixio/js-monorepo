import { Box, Text, Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

export function Pool() {
  const { id } = useParams();

  return (
    <Box>
      <Helmet>
        <title>Pool</title>
        <meta name="description" content="Pool" />
      </Helmet>
      <Box>
        {/*
          <Tooltip label='This synth has been verified by the Spartan Council'>
            <Tag mb="4" mr="2" colorScheme="green" size="sm">Verified</Tag>
          </Tooltip>
          */}
        <Flex mb="6" flexDirection="column">
          <Text color="gray.400">Pool #{id}</Text>
          {/*<Heading size="lg" mr="auto" lineHeight="1.2">Spartan Council</Heading>*/}
        </Flex>
        {/*
          <Heading size="md" mb="3">Market Allocation</Heading>
          <Box mb="8">
            <Position />
          </Box>

          <Heading size="md" mb="1">Collateral</Heading>

          <TableContainer mb={12}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th color="white">Asset</Th>
                  <Th color="white">Amount</Th>
                  <Th color="white" isNumeric>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Synthetix Tokens</Td>
                  <Td>
                    2,000 SNX
                  </Td>
                  <Td isNumeric>$10,000</Td>
                </Tr>
                <Tr>
                  <Td>LUSD Stablecoin</Td>
                  <Td>
                    343,403 LUSD
                  </Td>
                  <Td isNumeric>$343,403</Td>
                </Tr>
                <Tr>
                  <Td>Ether</Td>
                  <Td>
                    2.5 ETH
                  </Td>
                  <Td isNumeric>$8,750</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
  */}
        {/* controlling account? delegated accounts? collateral value over time? */}
      </Box>
      {/*
        <Flex mt="8">
          <NextLink href={"/funds/create"} passHref><Button size="xs" colorScheme="green"><AddIcon w="2" h="2" />&nbsp;&nbsp;Create a Fund</Button></NextLink>
        </Flex>
        */}
    </Box>
  );
}
