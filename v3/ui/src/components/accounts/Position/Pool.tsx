import { ExternalLinkIcon, EditIcon } from '@chakra-ui/icons';
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
      <Text mt="2" mb="6">
        By pooling liquidity for markets, you’re enabling the creation synthetic assets on-chain.
        You can earn fees and rewards, but your debt may increase. See{' '}
        <em>Hedging Your Staking Position</em> for information on how to protect your C-Ratio.
      </Text>
      <Box mb="6">
        <Text fontSize="sm" fontWeight="semibold">
          Current Pool
        </Text>
        <Heading size="lg" mb="1">
          {pool?.name}
          <Link
            color="blue.400"
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
            <Link color="blue.400" ml="1" display="inline-block" transform="translateY(-2px)">
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
        Market Exposure
      </Heading>
      <Text mb="4">
        You’re currently backing the following markets. Your exposure can change based on market
        conditions.
        {/* To customize the markets you’re exposed to,{' '} 
         <Link fontWeight="semibold" color="blue.400">
          create your own pool
        </Link> 
        .*/}
      </Text>
      <Table size="sm" variant="simple" mb="6">
        <Thead>
          <Tr>
            <Th color="white" pb="2">
              Asset
            </Th>
            <Th color="white" pb="2">
              Fees APY
            </Th>
            <Th color="white" pb="2">
              Exposure
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td py="4">
              <Heading size="sm">Synthetic&nbsp;Bitcoin</Heading>
              <Text mt="1" fontSize="xs">
                <span style={{ opacity: 0.8 }}>sBTC</span>
                <RouterLink to="/synths/example">
                  <Link color="blue.400" ml="1" display="inline-block" transform="translateY(-1px)">
                    <ExternalLinkIcon />
                  </Link>
                </RouterLink>
              </Text>
            </Td>
            <Td>
              25.4%
              <Text fontSize="xs" opacity="0.8">
                sUSD
              </Text>
            </Td>
            <Td>
              0.2 sBTC
              <Text fontSize="xs" opacity="0.8">
                Max: 0.4 sBTC
              </Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Heading size="sm" mb="1">
        Hedging Your Staking Position
      </Heading>
      <Text fontSize="sm" mb="12">
        If you’re concerned about maintaining your C-Ratio, you can hedge your staking position. To
        become fully hedged, make sure you’re always holding your exposure to each of the assets
        above (or their non-synthetic equivalents). These assets will change in value by the amount
        that you would need to restore your C-Ratio to its current value.
      </Text>
    </Box>
  );
};
