import { Box, Button, Divider, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { usePreferredPool } from '@snx-v3/usePreferredPool';
import { FC } from 'react';
import { generatePath, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { DepositForm } from '../../components/accounts/Deposit/DepositForm';

const DepositUi: FC<{
  activeCollateralType: CollateralType;
  preferredPool?: { name: string; id: string };
  accountId?: string;
}> = ({ preferredPool, accountId, activeCollateralType }) => {
  const navigate = useNavigate();
  return (
    <Flex height="100%" flexDirection="column">
      <Flex alignItems="flex-end">
        <Box flexGrow={1} mr={12}>
          <Heading fontSize="xl">Welcome to Synthetix V3</Heading>
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
      <Flex>
        <Box
          p={4}
          mt={8}
          bg="navy.900"
          mr={2}
          borderWidth="1px"
          borderColor="gray.900"
          borderRadius="base"
        >
          <Heading fontSize="xl">Deposit Collateral</Heading>
          <Text fontSize="sm">
            Take an interest-free loan against your collateral. This increases your debt and
            decreases your C-Ratio.
          </Text>
          <Heading mt={4} mb={2} size="sm">
            Deposit {activeCollateralType.symbol}
          </Heading>
          {
            preferredPool ? (
              <DepositForm
                poolId={preferredPool.id}
                accountId={accountId}
                activeCollateralType={activeCollateralType}
              />
            ) : null // todo skeleton
          }
        </Box>
        <Box
          ml={2}
          p={4}
          mt={8}
          bg="navy.900"
          borderWidth="1px"
          borderColor="gray.900"
          borderRadius="base"
        >
          {
            preferredPool ? (
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
                    navigate(
                      accountId
                        ? generatePath('/pools/:poolId?accountId=:accountId', {
                            poolId: preferredPool.id,
                            accountId,
                          })
                        : generatePath('/pools/:poolId', {
                            poolId: preferredPool.id,
                          })
                    )
                  }
                  variant="outline"
                >
                  See Pool
                </Button>
              </Flex>
            ) : null // TODO skeleton
          }
          <Text color="gray.400" mt={2} fontSize="sm">
            The Spartan Council Pool is the primary pool of Synthetix. All collateral will be
            deposited in this pool by default.
          </Text>
          <Box mt={4} p={4} border="1px" borderColor="gray.500" borderRadius="base">
            <Heading fontSize="md">Performance</Heading>
            <Text color="green.500" fontSize="2xl" fontWeight="bold">
              TODO
            </Text>
            <Text color="green.500" fontSize="md" fontWeight="bold">
              TODO
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export const Deposit = () => {
  const params = useParams();
  const [queryParams] = useSearchParams();
  const { data: collateralTypes } = useCollateralTypes();
  const { data: preferredPool } = usePreferredPool();
  const activeCollateralType = collateralTypes?.find((x) => x.symbol === params.collateralSymbol);
  if (!activeCollateralType) return <Spinner />;
  return (
    <DepositUi
      activeCollateralType={activeCollateralType}
      preferredPool={preferredPool}
      accountId={queryParams.get('accountId') || undefined}
    />
  );
};
