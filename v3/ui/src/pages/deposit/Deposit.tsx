import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import { FC, useEffect } from 'react';
import { createSearchParams, generatePath, useNavigate } from 'react-router-dom';
import { DepositForm } from '../../components/accounts/Deposit';
import { useAccounts } from '@snx-v3/useAccounts';

import { BorderBox } from '@snx-v3/BorderBox';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { PoolBox } from '@snx-v3/PoolBox';

const DepositUi: FC<{ collateralDisplaySymbol?: string }> = ({ collateralDisplaySymbol }) => {
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
      <Flex mt={8} alignItems="stretch" flexWrap={{ base: 'wrap', md: 'nowrap' }} gap={4}>
        <BorderBox flexGrow={1} p={4}>
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
        <Box maxW={{ base: 'full', md: '400px' }} width="full">
          <PoolBox />
        </Box>
      </Flex>
    </Flex>
  );
};

export const Deposit = () => {
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
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

  return <DepositUi collateralDisplaySymbol={collateralType?.displaySymbol} />;
};
