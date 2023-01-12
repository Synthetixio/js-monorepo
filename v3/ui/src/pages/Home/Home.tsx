import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { createSearchParams, generatePath, NavigateFunction, useNavigate } from 'react-router-dom';
import { useAccounts } from '@snx-v3/useAccounts';
import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { VaultRow } from './VaultRow';
import { usePreferredPool } from '@snx-v3/usePreferredPool';
import { useParams } from '@snx-v3/useParams';

export function HomeUi({
  collateralTypes,
  preferredPool,
  accountId,
  VaultRow,
  navigate,
}: {
  collateralTypes: CollateralType[];
  preferredPool: { name: string; id: string };
  accountId?: string;
  VaultRow: FC<{ collateralType: CollateralType; poolId: string }>;
  navigate: NavigateFunction;
}) {
  return (
    <Flex height="100%" flexDirection="column">
      <Flex alignItems="flex-end">
        <Box flexGrow={1} mr={12}>
          <Heading>Welcome to Synthetix V3</Heading>
          <Text>
            Deposit your collateral (SNX and/or ETH) to borrow snxUSD and contribute to the network
            collateral. If you have never staked on Synthetix V3 before, please read through this
            quick introduction first.
          </Text>
        </Box>
        <Button variant="outline" minW="unset" size="sm">
          Read Introduction
        </Button>
      </Flex>
      <Divider mt={4} bg="gray.900" />
      <Box p={4} bg="navy.900" mt={8} borderWidth="1px" borderColor="gray.900" borderRadius="base">
        <Flex justifyContent="space-between">
          <Flex alignItems="baseline" justifyContent="flex-start">
            <Heading>{preferredPool.name}</Heading>
            <Text color="gray.400" ml={2}>
              Pool #{preferredPool.id}
            </Text>
          </Flex>
          <Button
            size="sm"
            onClick={() =>
              navigate({
                pathname: generatePath('/pools/:poolId', {
                  poolId: preferredPool.id,
                }),
                search: accountId ? createSearchParams({ accountId }).toString() : '',
              })
            }
            variant="outline"
          >
            Pool Info
          </Button>
        </Flex>
        <Text color="gray.400" mt={2}>
          The Spartan Council Pool is the primary pool of Synthetix. All collateral will be
          deposited in this pool by default.
        </Text>
        <Table mt={8} size="sm" variant="simple" mb="9">
          <Thead>
            <Tr>
              <Th color="whiteAlpha.800" pb="2">
                Collateral
              </Th>
              <Th color="whiteAlpha.800" pb="2">
                Debt
              </Th>
              <Th color="whiteAlpha.800" pb="2">
                C-Ratio
              </Th>
              <Th color="whiteAlpha.800" pb="2">
                Performance
              </Th>
              <Th color="whiteAlpha.800" pb="2"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {collateralTypes.map((c) => (
              <VaultRow key={c.tokenAddress} collateralType={c} poolId={preferredPool.id} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}
export function Home() {
  const { data: accounts = [] } = useAccounts();
  const { data: collateralTypes = [] } = useCollateralTypes();
  const { data: preferredPool } = usePreferredPool();
  const params = useParams();
  const navigate = useNavigate();
  const [accountId] = accounts;

  useEffect(() => {
    if (!params.accountId && accountId) {
      navigate({
        pathname: generatePath('/'),
        search: createSearchParams({ accountId }).toString(),
      });
    }
  }, [navigate, accountId, params.accountId]);

  if (!collateralTypes || !preferredPool) return null;

  return (
    <HomeUi
      collateralTypes={collateralTypes}
      VaultRow={VaultRow}
      preferredPool={preferredPool}
      accountId={params.accountId}
      navigate={navigate}
    />
  );
}
