import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Button,
  Table,
  Thead,
  Tbody,
  Skeleton,
} from '@chakra-ui/react';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { ContractContext } from '@snx-v2/ContractContext';
import { formatNumber, formatNumberToUsd } from '@synthetixio/formatters';
import { ArrowTopRight, DSNXIcon } from '@snx-v2/icons';
import { SwitchNetworkContext } from '@snx-v2/SwitchNetworkContext';
import { StyledTd, StyledTh } from '@snx-v2/TableComponents';
import { useGetDSnxBalance } from '@snx-v2/useDSnxBalance';
import { NetworkId, NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { useContext, FC } from 'react';

const OneClickHedgingUi: FC<{
  isOptimism: boolean;
  dSNXBalance?: number;
  dSNXBalanceUsd?: number;
  switchNetwork: (id: NetworkId) => Promise<void>;
}> = ({ isOptimism, dSNXBalance, dSNXBalanceUsd, switchNetwork }) => {
  return (
    <Box position="relative">
      <Box
        display={isOptimism ? 'none' : 'block'}
        borderWidth="1px"
        borderColor="gray.900"
        borderRadius="base"
        bg="navy.700"
        width="312px"
        height="142"
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        zIndex={1}
        margin="auto"
        p={4}
        textAlign="center"
      >
        <Text fontSize="sm" fontWeight="700">
          Only available on Optimism
        </Text>
        <Text color="gray.500" fontSize="xs">
          One-Click Debt Hedging is only available on Optimism. Switch Network in order to use dSNX
          to hedge your debt.
        </Text>
        <Button
          onClick={() => switchNetwork(NetworkIdByName['mainnet-ovm'])}
          mt={2}
          size="sm"
          variant="outline"
        >
          Switch To Optimism
        </Button>
      </Box>
      <Flex
        filter={isOptimism ? undefined : 'blur(2px)'}
        bg="navy.700"
        borderWidth="1px"
        borderColor="gray.900"
        borderRadius="base"
        py={4}
        px={2}
        gap={2}
        flexDir="column"
      >
        <Heading fontSize="lg" fontWeight="700">
          Option 1: One-Click Debt Hedging
        </Heading>
        <Text fontSize="xs" color="gray.500">
          To approximately hedge the debt pool, swap your borrowed sUSD into dSNX, which replicates
          the fluctuations of the Synthetix debt pool. 1 sUSD worth of dSNX pool token hedges
          approximately 1 USD worth of active debt.{' '}
          <Link href={EXTERNAL_LINKS.Toros.docs} textColor="cyan.400" isExternal>
            Learn how it works
          </Link>
          .
        </Text>
        <Table>
          <Thead>
            <StyledTh p={2}>Asset</StyledTh>
            <StyledTh p={2}>Balance</StyledTh>
            <StyledTh p={0} />
          </Thead>
          <Tbody>
            <StyledTd p={2}>
              <Flex>
                <Flex flexShrink={0} alignItems="center">
                  <DSNXIcon width="30px" height="30px" />
                </Flex>
                <Flex ml={1} flexDirection="column">
                  <Text fontSize="sm">dSNX</Text>
                  <Text fontSize="xs" color="gray.500">
                    Debt Mirror Index
                  </Text>
                </Flex>
              </Flex>
            </StyledTd>
            <StyledTd p={2}>
              <Flex flexDirection="column">
                <Text fontSize="sm">
                  {dSNXBalance !== undefined ? (
                    formatNumber(dSNXBalance)
                  ) : (
                    <Skeleton as="span" w={8} height={4} />
                  )}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {dSNXBalanceUsd !== undefined ? (
                    formatNumberToUsd(dSNXBalanceUsd)
                  ) : (
                    <Skeleton as="span" mt={2} w={8} height={4} />
                  )}
                </Text>
              </Flex>
            </StyledTd>
            <StyledTd p={0}>
              <Button
                _hover={{ textDecoration: 'none' }}
                as={Link}
                size="sm"
                variant="outline"
                href={EXTERNAL_LINKS.Toros.dSNXPool}
                isExternal={true}
              >
                Hedge on Toros <ArrowTopRight ml="1" />
              </Button>
            </StyledTd>
          </Tbody>
        </Table>
        <Text color="gray.500" fontSize="xs" fontStyle="italic">
          Warning: dSNX approximately hedges debt, users can incur losses.
        </Text>
      </Flex>
    </Box>
  );
};

export const OneClickHedging = () => {
  const { data: dSNXBalanceData } = useGetDSnxBalance();
  const switchNetwork = useContext(SwitchNetworkContext);
  const { networkId } = useContext(ContractContext);

  return (
    <OneClickHedgingUi
      dSNXBalance={dSNXBalanceData?.balance.toNumber()}
      dSNXBalanceUsd={dSNXBalanceData?.balanceUsd.toNumber()}
      isOptimism={networkId === NetworkIdByName['mainnet-ovm']}
      switchNetwork={switchNetwork}
    />
  );
};
