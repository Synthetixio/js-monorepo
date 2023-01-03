import { FC } from 'react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Spinner,
  Table,
  TableCellProps,
  TableContainer,
  Text,
  Th,
  Td,
  Thead,
  Tr,
  Tbody,
  TextProps,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useGetMarketNamesById } from '../../hooks/useGetMarketNames';
import { useGetPoolData, Pool as PoolType } from '../../hooks/useGetPoolData';
import {
  calculateSevenDaysPnlGrowth,
  calculatePoolPerformanceSevenDays,
  calculatePoolPerformanceLifetime,
} from '../../utils/calculations';
import { PoolHeader } from './PoolHeader';
import { formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Wei from '@synthetixio/wei';

const StyledTh: FC<TableCellProps> = (props) => (
  <Th
    sx={{
      paddingBottom: 1,
      paddingTop: 4,
      borderColor: 'gray.900',
      borderTop: 'none',
      paddingLeft: 2,
      paddingRight: 2,
    }}
    {...props}
  />
);

const StyledTd: FC<TableCellProps & { isLastItem: boolean }> = (props) => (
  <Td
    sx={{
      borderBottom: props.isLastItem ? 'none' : '1px',
      borderBottomColor: 'gray.900',
      paddingLeft: 2,
      paddingRight: 2,
    }}
    {...props}
  />
);

const GreenOrRedText = (props: TextProps & { value: Wei }) => (
  <Text color={props.value.gte(0) ? 'green.500' : 'red.400'} {...props}></Text>
);

function Markets({
  isLoading,
  poolData,
  marketNamesById,
}: {
  isLoading: boolean;
  poolData?: PoolType | null;
  marketNamesById?: Record<string, string | undefined>;
}) {
  if (isLoading || !poolData) return <Spinner />;
  const sevenDaysPerformance = calculatePoolPerformanceSevenDays(poolData);
  const lifeTimePerformance = calculatePoolPerformanceLifetime(poolData);
  return (
    <Box padding={4} pb={0} borderColor="gray.900" borderWidth="1px" borderRadius="base">
      <Text fontSize="xl" fontWeight={700} mb={2}>
        Markets
      </Text>
      <Flex>
        <Box
          borderColor="gray.900"
          borderWidth="1px"
          borderRadius="base"
          bg="whiteAlpha.50"
          paddingY={2}
          paddingX={4}
          mr={2}
          w="50%"
        >
          <Text color="gray.500" fontSize="xs">
            PERFORMANCE 7 DAYS
          </Text>
          <GreenOrRedText
            value={sevenDaysPerformance.value}
            display="flex"
            alignItems="center"
            fontSize="2xl"
          >
            {formatNumberToUsd(sevenDaysPerformance.value.toNumber())}{' '}
            <InfoOutlineIcon height="16px" width="16px" color="white" ml={1} />
          </GreenOrRedText>
          {sevenDaysPerformance.growthPercentage ? (
            <GreenOrRedText value={sevenDaysPerformance.growthPercentage}>
              {formatPercent(sevenDaysPerformance.growthPercentage.toNumber())}
            </GreenOrRedText>
          ) : null}
        </Box>
        <Box
          borderColor="gray.900"
          borderWidth="1px"
          borderRadius="base"
          bg="whiteAlpha.50"
          paddingY={2}
          paddingX={4}
          ml={2}
          w="50%"
        >
          <Text color="gray.500" fontSize="xs">
            PERFORMANCE LIFETIME
          </Text>
          <GreenOrRedText
            value={lifeTimePerformance}
            display="flex"
            alignItems="center"
            fontSize="2xl"
          >
            {formatNumberToUsd(lifeTimePerformance.toNumber())}{' '}
            <InfoOutlineIcon height="16px" width="16px" color="white" ml={1} />
          </GreenOrRedText>
        </Box>
      </Flex>
      <Flex>
        <TableContainer w="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <StyledTh>MARKET</StyledTh>
                <StyledTh>ALLOCATION</StyledTh>
                <StyledTh>PNL 7 DAYS</StyledTh>
                <StyledTh>PNL LIFETIME</StyledTh>
              </Tr>
            </Thead>
            <Tbody>
              {poolData.configurations.length === 0 ? (
                <Tr w="full">
                  <Td colSpan={4} border="none">
                    <Text textAlign="center" mt={4}>
                      No markets configures to pool
                    </Text>
                  </Td>
                </Tr>
              ) : (
                poolData.configurations.map(({ id, market, max_debt_share_value, weight }, i) => {
                  const isLastItem = i + 1 === poolData.configurations.length;
                  const growth = calculateSevenDaysPnlGrowth(market.market_snapshots_by_week);
                  return (
                    <Tr key={id}>
                      <StyledTd isLastItem={isLastItem}>
                        <Text fontSize="sm" display="block">
                          {marketNamesById?.[market.id] || '-'}
                        </Text>
                        <Text fontSize="xs" display="block">
                          ID: {market.id}
                        </Text>
                      </StyledTd>
                      <StyledTd isLastItem={isLastItem}>
                        <Text fontSize="sm" display="block">
                          {formatPercent(weight.toNumber())} of collateral
                        </Text>
                        <Text fontSize="xs" display="block">
                          Max debt:
                        </Text>
                        <Text fontSize="xs">
                          {formatNumberToUsd(max_debt_share_value.toNumber())}
                        </Text>
                      </StyledTd>
                      <StyledTd isLastItem={isLastItem}>
                        {!growth ? (
                          ''
                        ) : (
                          <>
                            <Text fontSize="sm" display="block">
                              {formatNumberToUsd(growth.value.toNumber())}
                            </Text>
                            {growth.percentage ? (
                              <GreenOrRedText
                                fontSize="xs"
                                value={growth.percentage}
                                display="block"
                              >
                                {formatPercent(growth.percentage.toNumber())}
                              </GreenOrRedText>
                            ) : null}
                          </>
                        )}
                      </StyledTd>
                      <StyledTd isLastItem>{formatNumberToUsd(market.pnl.toNumber())}</StyledTd>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
}

export const Pool = () => {
  const { id } = useParams();
  const { data: poolData, isLoading: isLoadingPoolData } = useGetPoolData(id);

  const marketIdsAndAddresses = poolData?.configurations.map(({ market }) => ({
    marketId: market.id,
    address: market.address,
  }));
  const { data: marketNamesById, isLoading: isLoadingMarketNames } =
    useGetMarketNamesById(marketIdsAndAddresses);
  const isLoading = isLoadingPoolData || isLoadingMarketNames;
  return (
    <>
      <Helmet>
        <title>Pool</title>
        <meta name="description" content="Pool" />
      </Helmet>
      <Link
        width="fit-content"
        display="flex"
        alignItems="center"
        color="cyan.500"
        as={ReactRouterLink}
        to="/"
        fontSize="sm"
        fontWeight={700}
        ml={2}
        mb={2}
      >
        <ArrowBackIcon mr={1} /> Account Overview
      </Link>
      <Flex>
        <Box w="40%" mr={2}>
          <PoolHeader poolId={poolData?.id} poolName={poolData?.name} />
          <Box
            mt={4}
            borderColor="gray.900"
            borderWidth="1px"
            height="400px"
            borderRadius="base"
            padding={4}
          >
            Collateral, TODO
          </Box>
        </Box>
        <Box w="60%" ml={2}>
          <Markets marketNamesById={marketNamesById} poolData={poolData} isLoading={isLoading} />
        </Box>
      </Flex>
    </>
  );
};
