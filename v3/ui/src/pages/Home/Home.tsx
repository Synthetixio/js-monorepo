import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Td,
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

const LoadingRow = () => (
  <Tr>
    <Td>
      <Skeleton w="full" height={8} />
    </Td>
    <Td>
      <Skeleton w="full" height={8} />
    </Td>
    <Td>
      <Skeleton w="full" height={8} />
    </Td>
    <Td>
      <Skeleton w="full" height={8} />
    </Td>
    <Td>
      <Skeleton minWidth={16} height={8} />
    </Td>
  </Tr>
);

export function HomeUi({
  collateralTypes,
  preferredPool,
  accountId,
  VaultRow,
  navigate,
}: {
  collateralTypes?: CollateralType[];
  preferredPool?: { name: string; id: string };
  accountId?: string;
  VaultRow: FC<{ collateralType: CollateralType; poolId: string }>;
  navigate: NavigateFunction;
}) {
  return (
    <Flex height="100%" flexDirection="column">
      <Flex alignItems="flex-end" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
        <Box flexGrow={1} mr={12}>
          <Heading>Welcome to Synthetix V3</Heading>
          <Text>
            Deposit your collateral (SNX and/or ETH) to borrow snxUSD and contribute to the network
            collateral. If you have never staked on Synthetix V3 before, please read through this
            quick introduction first.
          </Text>
        </Box>
        <Button variant="outline" minW="unset" size="sm" mt={{ base: 2, md: 0 }}>
          Read Introduction
        </Button>
      </Flex>
      <Divider mt={4} bg="gray.900" />
      <Box p={4} bg="navy.900" mt={8} borderWidth="1px" borderColor="gray.900" borderRadius="base">
        <Flex
          justifyContent="space-between"
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          alignItems="center"
        >
          <Flex
            alignItems="baseline"
            justifyContent="flex-start"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            {preferredPool ? <Heading>{preferredPool.name}</Heading> : <Skeleton w={16} h={8} />}
            <Text color="gray.400" ml={{ base: 0, md: 2 }}>
              {preferredPool ? `Pool #${preferredPool.id}` : <Skeleton w={12} h={4} />}
            </Text>
          </Flex>
          {preferredPool ? (
            <Button
              mt={{ base: 2, md: 0 }}
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
          ) : (
            <Skeleton display="block" w={14} h={7} />
          )}
        </Flex>
        <Text color="gray.400" mt={2}>
          The Spartan Council Pool is the primary pool of Synthetix. All collateral will be
          deposited in this pool by default.
        </Text>
        <Box overflowX="auto">
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
                  Issuance Ratio
                </Th>
                <Th color="whiteAlpha.800" pb="2"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {preferredPool && collateralTypes ? (
                collateralTypes.map((c) => (
                  <VaultRow key={c.tokenAddress} collateralType={c} poolId={preferredPool.id} />
                ))
              ) : (
                <>
                  <LoadingRow />
                  <LoadingRow />
                </>
              )}
            </Tbody>
          </Table>
        </Box>
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
