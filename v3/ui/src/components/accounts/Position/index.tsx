import { ExternalLinkIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Text,
  Box,
  Link,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
} from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';

export default function Position() {
  return (
    <Box mb="2">
      <Table size="sm" variant="simple">
        <TableCaption color="white">
          {/* if only staking with spartan council fund */}
          <InfoOutlineIcon display="inline-block" transform="translateY(-1px)" /> Your staking
          position is currently managed by{' '}
          <NavLink to="/dao">
            <Link fontWeight="semibold" color="blue.400">
              The Spartan Council
            </Link>
          </NavLink>{' '}
          and is subject to change.
        </TableCaption>
        <Thead>
          <Tr>
            <Th color="white" pb="2">
              Asset
            </Th>
            <Th color="white" pb="2">
              Fees APY
            </Th>
            <Th color="white" pb="2">
              Rewards APY
            </Th>
            <Th color="white" pb="2">
              Position
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td py="4">
              <Heading size="sm">Synthetic&nbsp;Bitcoin</Heading>
              <Text mt="1" fontSize="xs">
                <span style={{ opacity: 0.8 }}>sBTC</span>
                <NavLink to="/synths/example">
                  <Link color="blue.400" ml="1" display="inline-block" transform="translateY(-1px)">
                    <ExternalLinkIcon />
                  </Link>
                </NavLink>
              </Text>
            </Td>
            <Td>
              25.4%
              <Text fontSize="xs" opacity="0.8">
                sUSD
              </Text>
            </Td>
            <Td>
              70.4%
              <Text fontSize="xs" opacity="0.8">
                SNX
              </Text>
            </Td>
            <Td fontSize="lg">100%</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}
