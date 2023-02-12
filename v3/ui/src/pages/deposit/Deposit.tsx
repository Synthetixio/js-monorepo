import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import { FC, useEffect } from 'react';
import { createSearchParams, generatePath, useNavigate } from 'react-router-dom';
import { DepositForm } from '../../components/accounts/Deposit';
import { useAccounts } from '@snx-v3/useAccounts';
import { BorderBox } from '@snx-v3/BorderBox';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { PoolBox } from '@snx-v3/PoolBox';
import { Welcome } from '../../components/shared/Welcome';
import { CollateralIcon } from '@snx-v3/icons';
import { HomeLink } from '@snx-v3/HomeLink';

const DepositUi: FC<{ collateralDisplaySymbol?: string; DepositForm: FC; PoolBox: FC }> = ({
  collateralDisplaySymbol,
  PoolBox,
  DepositForm,
}) => {
  return (
    <Flex height="100%" flexDirection="column">
      <HomeLink />
      <Welcome
        Banner={() => {
          return (
            <Flex alignItems="center">
              <Box
                mr={2}
                bg="linear-gradient(180deg, #08021E 0%, #1F0777 146.21%)"
                p="3px"
                borderRadius="50px"
              >
                <CollateralIcon
                  width="30px"
                  height="30px"
                  symbol={collateralDisplaySymbol || 'SNX'}
                  fill="#0B0B22"
                  color="#00D1FF"
                />
              </Box>
              <Heading>{collateralDisplaySymbol} Vault</Heading>
            </Flex>
          );
        }}
      />
      <Divider my={8} bg="gray.900" />
      <Flex alignItems="stretch" flexWrap={{ base: 'wrap', md: 'nowrap' }} gap={4}>
        <BorderBox flexGrow={1} p={4} flexDirection="column">
          <Heading fontSize="xl" color="gray.50">
            Deposit Collateral
          </Heading>
          <Text fontSize="sm" color="gray.500" my={1}>
            Take an interest-free loan against your collateral. This increases your debt and
            decreases your C-Ratio.
          </Text>
          <Heading mt={4} mb={2} size="sm" color="gray.50">
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

  return (
    <DepositUi
      collateralDisplaySymbol={collateralType?.displaySymbol}
      DepositForm={DepositForm}
      PoolBox={PoolBox}
    />
  );
};
