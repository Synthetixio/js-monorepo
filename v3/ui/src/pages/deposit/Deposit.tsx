import { Box, Button, Divider, Flex, Heading, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { usePreferredPool } from '@snx-v3/usePreferredPool';
import { useParams } from '@snx-v3/useParams';
import { FC, useEffect } from 'react';
import { createSearchParams, generatePath, NavigateFunction, useNavigate } from 'react-router-dom';
import { DepositForm } from '../../components/accounts/Deposit';
import { useAccounts } from '@snx-v3/useAccounts';
import { useGetPoolData } from '../../hooks/useGetPoolData';
import { calculatePoolPerformanceSevenDays } from '../../utils/calculations';
import { formatPercent } from '@snx-v2/formatters';
import { TrendText } from '@snx-v3/TrendText';
import { wei } from '@synthetixio/wei';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { BorderBox } from '@snx-v3/BorderBox';
import { useCollateralType } from '@snx-v3/useCollateralTypes';

const DepositUi: FC<{
  collateralDisplaySymbol?: string;
  preferredPool?: { name: string; id: string };
  accountId?: string;
  sevenDaysPoolPerformance?: number;
  navigate: NavigateFunction;
}> = ({
  preferredPool,
  accountId,
  collateralDisplaySymbol,
  navigate,
  sevenDaysPoolPerformance,
}) => {
  return (
    <Flex height="100%" flexDirection="column">
      <Flex alignItems="flex-end" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
        <Box flexGrow={1} mr={12}>
          <Heading fontSize="xl">Welcome to Synthetix V3</Heading>
          <Text>
            Deposit your collateral to borrow snxUSD and contribute to the network collateral. If
            you have never staked on Synthetix V3 before, please read through this quick
            introduction first.
          </Text>
        </Box>
        <Button variant="outline" minW="unset" size="sm" mt={{ base: 2, md: 0 }}>
          Read Introduction
        </Button>
      </Flex>
      <Divider mt={4} bg="gray.900" />
      <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }}>
        <BorderBox p={4} mt={8} mr={{ base: 0, md: 2 }}>
          <Heading fontSize="xl">Deposit Collateral</Heading>
          <Text fontSize="sm">
            Take an interest-free loan against your collateral. This increases your debt and
            decreases your C-Ratio.
          </Text>
          <Heading mt={4} mb={2} size="sm">
            Deposit {collateralDisplaySymbol}
          </Heading>
          <DepositForm />
        </BorderBox>
        <BorderBox ml={{ base: 0, md: 2 }} p={4} mt={8}>
          {preferredPool ? (
            <Flex justifyContent="space-between">
              <Flex flexDirection="column">
                <Heading fontSize="xl">{preferredPool.name}</Heading>
                <Text fontSize="sm" color="gray.400">
                  Pool #{preferredPool.id}
                </Text>
              </Flex>
              <Button
                size="sm"
                onClick={() =>
                  navigate({
                    pathname: generatePath('/pools/:poolId', { poolId: preferredPool.id }),
                    search: accountId ? createSearchParams({ accountId }).toString() : '',
                  })
                }
                variant="outline"
              >
                See Pool
              </Button>
            </Flex>
          ) : (
            <Flex justifyContent="space-between">
              <Box>
                <Skeleton w={16} height={8} />
                <Skeleton mt={1} w={8} height={6} />
              </Box>
              <Skeleton w={16} height={6} />
            </Flex>
          )}
          <Text color="gray.400" mt={2} fontSize="sm">
            The Spartan Council Pool is the primary pool of Synthetix. All collateral will be
            deposited in this pool by default.
          </Text>
          <Box mt={4} p={4} border="1px" borderColor="gray.500" borderRadius="base">
            <Heading fontSize="md" alignItems="center" display="flex">
              Performance Last 7 Days{' '}
              <Tooltip label="Average growth of all markets in the pool for the last 7 days">
                <InfoOutlineIcon ml={1} />
              </Tooltip>
            </Heading>
            <TrendText fontSize="2xl" fontWeight="bold" value={sevenDaysPoolPerformance || wei(0)}>
              {sevenDaysPoolPerformance ? (
                formatPercent(sevenDaysPoolPerformance)
              ) : (
                <Skeleton mt={1} w={16} height={9} />
              )}
            </TrendText>
          </Box>
        </BorderBox>
      </Flex>
    </Flex>
  );
};

export const Deposit = () => {
  const params = useParams();
  const { data: preferredPool } = usePreferredPool();
  const { data: poolData } = useGetPoolData(preferredPool?.id);
  const collateralType = useCollateralType(params.collateralSymbol);
  const sevenDaysPoolPerformance = calculatePoolPerformanceSevenDays(poolData);

  const navigate = useNavigate();

  const { data: accounts = [] } = useAccounts();
  const [accountId] = accounts;
  useEffect(() => {
    if (!params.accountId && accountId && params.collateralSymbol && params.poolId) {
      navigate({
        pathname: generatePath('/deposit/:collateralSymbol/:poolId', {
          collateralSymbol: params.collateralSymbol,
          poolId: params.poolId,
        }),
        search: createSearchParams({ accountId }).toString(),
      });
    }
  }, [navigate, accountId, params.accountId, params.collateralSymbol, params.poolId]);

  return (
    <DepositUi
      collateralDisplaySymbol={collateralType?.displaySymbol}
      preferredPool={preferredPool}
      accountId={params.accountId}
      navigate={navigate}
      sevenDaysPoolPerformance={sevenDaysPoolPerformance?.growthPercentage?.toNumber()}
    />
  );
};
