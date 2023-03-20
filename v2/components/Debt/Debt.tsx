import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Collapse,
  SkeletonText,
  Tooltip,
  Link,
  Table,
  Thead,
  Tbody,
  Skeleton,
} from '@chakra-ui/react';
import { formatNumber, formatNumberToUsd } from '@snx-v2/formatters';
import { useDebtData } from '@snx-v2/useDebtData';
import { FC, useContext, useState } from 'react';
import { DebtPoolTable } from '@snx-v2/DebtPoolTable';
import { ArrowTopRight, DSNXIcon, InfoIcon } from '@snx-v2/icons';
import { useGetDSnxBalance } from '@snx-v2/useDSnxBalance';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { ContractContext } from '@snx-v2/ContractContext';
import { StyledTd, StyledTh } from '@snx-v2/TableComponents';

export const DebtUi: FC<{
  debtBalance?: number;
  isOptimism: boolean;
  dSNXBalance?: number;
  dSNXBalanceUsd?: number;
}> = ({ debtBalance, dSNXBalance, dSNXBalanceUsd }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  return (
    <Box mt={8}>
      <Flex alignItems="center" gap={4}>
        <Box>
          <Heading fontSize="lg" fontWeight="700">
            Hedge your debt
          </Heading>
          <Text color="gray.500" fontSize="xs">
            Your active debt is not static and depends on the debt pool. You might want to mirror
            its composition to be protected against its increase. This is done by buying similar
            assets to the debt pool or by buying dSNX. Learn more about{' '}
            <Link textColor="cyan.400" isExternal>
              debt hedging strategies
            </Link>
            .
          </Text>
        </Box>
        <Flex
          flexDir="column"
          w="282px"
          bg="navy.700"
          p={2}
          flexShrink="0"
          alignItems="flex-end"
          borderWidth="1px"
          borderColor="gray.900"
          borderRadius="base"
        >
          <Text display="flex" alignItems="center" gap={1} color="gray.500" fontSize="sm">
            Active Debt
            <Tooltip label="Active debt is your share of the global debt pool">
              <Flex>
                <InfoIcon />
              </Flex>
            </Tooltip>
          </Text>
          <SkeletonText fontSize="2xl" fontWeight="700" isLoaded={debtBalance !== undefined}>
            {debtBalance !== undefined ? formatNumberToUsd(debtBalance) : null}
          </SkeletonText>
        </Flex>
      </Flex>
      <Flex gap={4}>
        <Flex
          bg="navy.700"
          borderWidth="1px"
          borderColor="gray.900"
          borderRadius="base"
          py={4}
          px={2}
          mt={4}
          gap={2}
          flexDir="column"
          flexBasis="50%"
        >
          <Heading fontSize="lg" fontWeight="700">
            Option 1: One-Click Debt Hedging
          </Heading>
          <Text fontSize="xs" color="gray.500">
            To approximately hedge the debt pool, swap your borrowed sUSD into dSNX, which
            replicates the fluctuations of the Synthetix debt pool. 1 sUSD worth of dSNX pool token
            hedges approximately 1 USD worth of active debt.{' '}
            <Link textColor="cyan.400" isExternal>
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
                <Button size="sm" variant="outline">
                  Hedge on Torus <ArrowTopRight ml="1" />
                </Button>
              </StyledTd>
            </Tbody>
          </Table>
          <Text color="gray.500" fontSize="xs" fontStyle="italic">
            Warning: dSNX approximately hedges debt, users can incur losses.
          </Text>
        </Flex>
        <Flex
          bg="navy.700"
          borderWidth="1px"
          borderColor="gray.900"
          borderRadius="base"
          flexBasis="50%"
          py={4}
          px={2}
          mt={4}
          gap={2}
          flexDir="column"
        >
          <Heading fontSize="lg" fontWeight="700">
            Option 2: Manual Hedging
          </Heading>
          <Text fontSize="xs" color="gray.500">
            To approximately hedge the Debt Pool, swap your borrowed sUSD into the following
            amounts, and adjust these amounts periodically.
          </Text>
        </Flex>
      </Flex>
      <Box p={4} mt={2} borderWidth="1px" borderColor="gray.900" borderRadius="base" bg="navy.700">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading fontSize="lg"> Detailed Debt Pool Composition</Heading>
          <Button onClick={() => setDetailOpen((x) => !x)} variant="outline">
            Show {detailOpen ? 'Less' : 'More'}
          </Button>
        </Flex>
        <Collapse in={detailOpen}>
          <Box mt={4}>
            <DebtPoolTable />
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};
export const Debt = () => {
  const { data: debtData } = useDebtData();
  const { data: dSNXBalanceData } = useGetDSnxBalance();
  const { networkId } = useContext(ContractContext);
  return (
    <DebtUi
      isOptimism={networkId === NetworkIdByName['mainnet-ovm']}
      debtBalance={debtData?.debtBalance.toNumber()}
      dSNXBalance={dSNXBalanceData?.balance.toNumber()}
      dSNXBalanceUsd={dSNXBalanceData?.balanceUsd.toNumber()}
    />
  );
};
