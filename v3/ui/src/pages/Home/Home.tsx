import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Divider,
  Fade,
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
import { LiquidityPositionType, useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { Welcome } from '../../components/shared/Welcome';
import { Stats, StatsProps } from './Stats';

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
  navigate,
  liquidityPositions,
  isLoading,
  VaultRow,
  Stats,
}: {
  collateralTypes?: CollateralType[];
  preferredPool?: { name: string; id: string };
  accountId?: string;
  navigate: NavigateFunction;
  liquidityPositions?: LiquidityPositionType[];
  isLoading: boolean;
  VaultRow: FC<{ collateralType: CollateralType; poolId: string }>;
  Stats: FC<StatsProps>;
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
      <Stats totalDebt={totalDebt} totalCollateral={totalCollateral} />
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
            <Skeleton isLoaded={!isLoading && !!preferredPool}>
              <Fade in={!isLoading && !!preferredPool}>
                <Heading fontSize="2xl">{preferredPool?.name || 'Unnamed Pool'}</Heading>
              </Fade>
            </Skeleton>
            <Fade in={!isLoading && !!preferredPool}>
              <Text ml={{ base: 0, md: 2 }} color="gray.400">{`Pool #${
                preferredPool?.id || 1
              }`}</Text>
            </Fade>
          </Flex>
          {preferredPool?.id && (
            <Fade in={!isLoading && !!preferredPool}>
              <Button
                mt={{ base: 2, md: 0 }}
                size="sm"
                onClick={() =>
                  navigate({
                    pathname: generatePath('/pools/:poolId', { poolId: preferredPool.id }),
                  })
                }
                variant="outline"
              >
                Pool Info
              </Button>
            </Fade>
          )}
        </Flex>
        <Skeleton isLoaded={!isLoading} mt={2}>
          <Fade in={!isLoading}>
            <Text color="gray.500">
              The Spartan Council Pool is the primary pool of Synthetix. All collateral will be
              deposited in this pool by default.
            </Text>
          </Fade>
        </Skeleton>
        <Box overflowX="auto">
          <Table mt={8} size="sm" variant="unstyled" mb="9">
            <Thead sx={{ tr: { borderBottomColor: 'gray.900', borderBottomWidth: '1px' } }}>
              <Tr>
                <Th color="gray.500" fontSize="xs" lineHeight="4" pb="3" textTransform="initial">
                  Collateral
                </Th>
                <Th color="gray.500" fontSize="xs" lineHeight="4" pb="3" textTransform="initial">
                  Debt
                </Th>
                <Th color="gray.500" fontSize="xs" lineHeight="4" pb="3" textTransform="initial">
                  C-Ratio
                </Th>
                <Th color="gray.500" fontSize="xs" lineHeight="4" pb="3" textTransform="initial">
                  Issuance Ratio
                </Th>
                <Th color="gray.500" fontSize="xs" lineHeight="4" pb="3" textTransform="initial">
                  Liquidation Ratio
                </Th>
                <Th
                  color="gray.500"
                  fontSize="xs"
                  lineHeight="4"
                  pb="2"
                  textTransform="initial"
                ></Th>
              </Tr>
            </Thead>
            <Tbody sx={{ tr: { borderBottomColor: 'gray.900', borderBottomWidth: '1px' } }}>
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
  const { data: accounts = [], isLoading: accountsLoading } = useAccounts();
  const { data: collateralTypes = [], isLoading: collateralTypesLoading } = useCollateralTypes();
  const { data: preferredPool, isLoading: preferredPoolLoading } = usePreferredPool();

  const params = useParams();
  const navigate = useNavigate();

  const [accountId] = accounts;

  const {
    data: liquidityPositionsById,
    isLoading: liquidityPositionLoading,
    isInitialLoading: liquidityInitialLoading,
  } = useLiquidityPositions({
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
  const isLoading =
    accountsLoading ||
    collateralTypesLoading ||
    preferredPoolLoading ||
    (liquidityPositionLoading && liquidityInitialLoading);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <HomeUi
        isLoading={isLoading}
        liquidityPositions={
          liquidityPositionsById ? Object.values(liquidityPositionsById) : undefined
        }
        collateralTypes={collateralTypes}
        preferredPool={preferredPool}
        navigate={navigate}
        VaultRow={VaultRow}
        Stats={Stats}
      />
    </>
  );
}
