import { ArrowRightIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { generatePath, Link as RouterLink } from 'react-router-dom';
import { PoolDialog } from './PoolDialog';
import { useParams } from '@snx-v3/useParams';
import { useGetPoolData } from '../../hooks/useGetPoolData';

export function Pool() {
  const params = useParams();
  const poolData = useGetPoolData(params.poolId);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box my="4">
      <Flex mb="6">
        <Box>
          <Text fontSize="sm" fontWeight="semibold">
            Current Pool
          </Text>
          <Heading size="lg" mb="1">
            {poolData.data?.name}
          </Heading>
          <Text fontSize="sm">
            <span style={{ opacity: 0.8 }}>Pool #{params.poolId}</span>
            {params.accountId && params.poolId ? (
              <Link
                as={RouterLink}
                to={generatePath('/accounts/:accountId/pools/:poolId', {
                  accountId: params.accountId,
                  poolId: params.poolId,
                })}
                color="cyan.500"
                ml="1"
                display="inline-block"
                transform="translateY(-2px)"
              >
                <ExternalLinkIcon />
              </Link>
            ) : null}
          </Text>
        </Box>
        <Box ml="auto">
          <Button
            transform="translateY(-3px)"
            size="xs"
            onClick={onOpen}
            variant="outline"
            colorScheme="gray"
          >
            <EditIcon transform="translateY(-0.5px)" opacity="0.66" mr="1.5" /> Change Pool
          </Button>
        </Box>
      </Flex>

      <PoolDialog isOpen={isOpen} onClose={onClose} />

      <Heading size="md" mb="1">
        Markets
      </Heading>
      <Text mb="4">This pool is currently backing the assets in the following markets.</Text>
      <Table size="sm" variant="simple" mb="6">
        <Thead>
          <Tr>
            <Th color="white" pb="2">
              Market
            </Th>
            <Th color="white" pb="2">
              Liquidity
            </Th>
            <Th color="white" pb="2">
              Projected Fees
            </Th>
            <Th color="white" pb="2"></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td py="4">
              Synthetic&nbsp;Bitcoin
              <Text fontSize="xs" opacity="0.66" mt="1">
                ID: {params.poolId}
              </Text>
            </Td>
            <Td py="4">
              20% allocation
              <Text fontSize="xs" opacity="0.66" mt="1">
                Max Debt: $2,000
              </Text>
            </Td>
            <Td py="4">X% APY</Td>
            <Td>
              <Link
                as={RouterLink}
                to={generatePath('/markets/:marketId', { marketId: '0' })}
                color="cyan.500"
                display="inline-block"
                transform="translateY(-1.5px)"
              >
                <ArrowRightIcon />
              </Link>
            </Td>
          </Tr>
          <Tr>
            <Td py="4">
              Synthetic&nbsp;Ether
              <Text fontSize="xs" opacity="0.66" mt="1">
                ID: 2
              </Text>
            </Td>
            <Td py="4">
              20% allocation
              <Text fontSize="xs" opacity="0.66" mt="1">
                Max Debt: $2,000
              </Text>
            </Td>
            <Td py="4">X% APY</Td>
            <Td>
              <Link
                as={RouterLink}
                to={generatePath('/markets/:marketId', { marketId: '0' })}
                color="cyan.500"
                display="inline-block"
                transform="translateY(-1.5px)"
              >
                <ArrowRightIcon />
              </Link>
            </Td>
          </Tr>
          <Tr>
            <Td py="4">
              Synthetic&nbsp;Euro
              <Text fontSize="xs" opacity="0.66" mt="1">
                ID: 3
              </Text>
            </Td>
            <Td py="4">
              10% allocation
              <Text fontSize="xs" opacity="0.66" mt="1">
                Max Debt: $2,000
              </Text>
            </Td>
            <Td py="4">X% APY</Td>
            <Td>
              <Link
                as={RouterLink}
                to={generatePath('/markets/:marketId', { marketId: '0' })}
                color="cyan.500"
                display="inline-block"
                transform="translateY(-1.5px)"
              >
                <ArrowRightIcon />
              </Link>
            </Td>
          </Tr>
          <Tr>
            <Td py="4">
              ETH Perps
              <Text fontSize="xs" opacity="0.66" mt="1">
                ID: 4
              </Text>
            </Td>
            <Td py="4">
              25% allocation
              <Text fontSize="xs" opacity="0.66" mt="1">
                Max Debt: $5,000
              </Text>
            </Td>
            <Td py="4">X% APY</Td>
            <Td>
              <Link
                as={RouterLink}
                to={generatePath('/markets/:marketId', { marketId: '0' })}
                color="cyan.500"
                display="inline-block"
                transform="translateY(-1.5px)"
              >
                <ArrowRightIcon />
              </Link>
            </Td>
          </Tr>
          <Tr>
            <Td py="4">
              BTC Perps
              <Text fontSize="xs" opacity="0.66" mt="1">
                ID: 5
              </Text>
            </Td>
            <Td py="4">
              25% allocation
              <Text fontSize="xs" opacity="0.66" mt="1">
                Max Debt: $5,000
              </Text>
            </Td>
            <Td py="4">X% APY</Td>
            <Td>
              <Link
                as={RouterLink}
                to={generatePath('/markets/:marketId', { marketId: '0' })}
                color="cyan.500"
                display="inline-block"
                transform="translateY(-1.5px)"
              >
                <ArrowRightIcon />
              </Link>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}