import { ExternalLinkIcon, EditIcon, ArrowRightIcon } from '@chakra-ui/icons';
import {
  Text,
  Box,
  Link,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  useDisclosure,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { poolsData } from '../../../utils/constants';
import { CollateralType } from '../../../utils/types';
import { PoolDialog } from './PoolDialog';

interface Props {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
  collateralAmount: number;
  debt: number;
  refetch: () => void;
}

export const Pool: FC<Props> = ({
  poolId,
  collateralAmount,
  accountId,
  collateral,
  debt,
  refetch,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pool = poolsData[poolId.toString()];
  return (
    <Box mb="2">
      <Alert status="info" mt="3" mb="6">
        <AlertIcon />
        By pooling liquidity for markets, you’re backing synthetic assets on-chain. You can earn
        fees and rewards, but your debt may increase and harm your C-Ratio.
      </Alert>
      <Box mb="6">
        <Text fontSize="sm" fontWeight="semibold">
          Current Pool
        </Text>
        <Heading size="lg" mb="1">
          {pool?.name}
          <Link
            color="cyan.500"
            ml="1.5"
            display="inline-block"
            transform="translateY(-2px)"
            onClick={onOpen}
          >
            <EditIcon w="5" />
          </Link>
        </Heading>
        <Text fontSize="sm">
          <span style={{ opacity: 0.8 }}>Pool #{poolId}</span>
          <RouterLink to={`/pools/${poolId}`}>
            <Link color="cyan.500" ml="1" display="inline-block" transform="translateY(-2px)">
              <ExternalLinkIcon />
            </Link>
          </RouterLink>
        </Text>
      </Box>

      <PoolDialog
        collateralAmount={collateralAmount}
        accountId={accountId}
        poolId={poolId}
        collateral={collateral}
        refetch={refetch}
        isOpen={isOpen}
        debt={debt}
        onClose={onClose}
      />
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
              <Text fontSize="xs" opacity="0.66" mt="1'">
                ID: {poolId}
              </Text>
            </Td>
            <Td py="4">
              50% allocation
              <Text fontSize="xs" opacity="0.66" mt="1'">
                Max Debt: $2,000
              </Text>
            </Td>
            <Td py="4">X% APY</Td>
            <Td>
              <Link
                as={RouterLink}
                to={`/markets/${0}`}
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
};
