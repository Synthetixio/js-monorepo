import { Helmet } from 'react-helmet';
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
import { BorderBox } from '@snx-v3/BorderBox';
import { useLiquidityPositions, LiquidityPositionType } from '@snx-v3/useLiquidityPositions';
import { formatNumberToUsd } from '@snx-v2/formatters';
import { Welcome } from '../../components/shared/Welcome';

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
  VaultRow,
  navigate,
  liquidityPositions,
}: {
  collateralTypes?: CollateralType[];
  preferredPool?: { name: string; id: string };
  accountId?: string;
  VaultRow: FC<{ collateralType: CollateralType; poolId: string }>;
  navigate: NavigateFunction;
  liquidityPositions?: LiquidityPositionType[];
}) {
  const { totalCollateral, totalDebt } =
    liquidityPositions?.reduce(
      (acc, val) => {
        acc.totalCollateral = acc.totalCollateral + val.collateralValue.toNumber();
        acc.totalDebt = acc.totalDebt + val.debt.toNumber();
        return acc;
      },
      { totalCollateral: 0, totalDebt: 0 }
    ) || {};

  return (
    <Flex height="100%" flexDirection="column">
      <Welcome />
      <Divider my={8} bg="gray.900" />
      <Flex justifyContent="space-between" gap={4} flexDirection={{ base: 'column', md: 'row' }}>
        <BorderBox p={4} width="33%" flexDir="column">
          <Text
            fontSize="xs"
            fontFamily="heading"
            textTransform="uppercase"
            color="gray.500"
            textAlign="center"
            fontWeight="400"
          >
            Total Collateral
          </Text>
          <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="2xl">
            {totalCollateral ? formatNumberToUsd(totalCollateral) : '—'}
          </Text>
        </BorderBox>
        <BorderBox p={4} flexDir="column" width="33%">
          <Text
            fontSize="xs"
            fontFamily="heading"
            textTransform="uppercase"
            color="gray.500"
            textAlign="center"
            fontWeight="400"
          >
            Total debt
          </Text>
          <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="2xl">
            {totalDebt ? formatNumberToUsd(totalDebt) : '—'}
          </Text>
        </BorderBox>
        <BorderBox p={4} flexDir="column" width="33%">
          <Text
            fontSize="xs"
            fontFamily="heading"
            textTransform="uppercase"
            color="gray.500"
            textAlign="center"
            fontWeight="400"
          >
            Total Earnings Lifetime
          </Text>
          <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="2xl">
            —
          </Text>
        </BorderBox>
      </Flex>
      <BorderBox p={4} mt={8} flexDir="column">
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
                navigate({ pathname: generatePath('/pools/:poolId', { poolId: preferredPool.id }) })
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
                <Th color="whiteAlpha.800" pb="2">
                  Liquidation Ratio
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
      </BorderBox>
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
  const { data: liquidityPositionsById } = useLiquidityPositions({
    accountId: params.accountId,
  });

  useEffect(() => {
    if (!params.accountId && accountId) {
      navigate({
        pathname: generatePath('/'),
        search: createSearchParams({ accountId }).toString(),
      });
    }
  }, [navigate, accountId, params.accountId]);

  const title = 'Synthetix V3';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <HomeUi
        liquidityPositions={
          liquidityPositionsById ? Object.values(liquidityPositionsById) : undefined
        }
        collateralTypes={collateralTypes}
        VaultRow={VaultRow}
        preferredPool={preferredPool}
        navigate={navigate}
      />
    </>
  );
}
