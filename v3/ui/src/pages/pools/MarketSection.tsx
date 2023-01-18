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
} from '@chakra-ui/react';
import { Pool } from '../../hooks/useGetPoolData';
import {
  calculateSevenDaysPnlGrowth,
  calculatePoolPerformanceSevenDays,
  calculatePoolPerformanceLifetime,
} from '../../utils/calculations';
import { formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { useParams } from '@snx-v3/useParams';
import { useMarketNamesById } from '@snx-v3/useMarketNamesById';
import { useGetPoolData } from '../../hooks/useGetPoolData';
import { TrendText } from '@snx-v3/TrendText';
import { BorderBox } from '@snx-v3/BorderBox';

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

const StyledTd: FC<TableCellProps & { isLastItem: boolean }> = ({ isLastItem, ...props }) => (
  <Td
    sx={{
      borderBottom: isLastItem ? 'none' : '1px',
      borderBottomColor: 'gray.900',
      paddingLeft: 2,
      paddingRight: 2,
    }}
    {...props}
  />
);

export function MarketSectionUi({
  isLoading,
  poolData,
  marketNamesById,
}: {
  isLoading: boolean;
  poolData?: Pool;
  marketNamesById?: Record<string, string | undefined>;
}) {
  const sevenDaysPerformance = calculatePoolPerformanceSevenDays(poolData);
  const lifeTimePerformance = calculatePoolPerformanceLifetime(poolData);
  if (isLoading || !sevenDaysPerformance || !lifeTimePerformance) return <Spinner />;

  return (
    <Box padding={4} pb={0} borderColor="gray.900" borderWidth="1px" borderRadius="base">
      <Text fontSize="xl" fontWeight={700} mb={2}>
        Markets
      </Text>
      <Flex>
        <BorderBox paddingY={2} paddingX={4} mr={2} w="50%">
          <Text color="gray.500" fontSize="xs">
            PERFORMANCE 7 DAYS
          </Text>
          <TrendText
            value={sevenDaysPerformance.value}
            display="flex"
            alignItems="center"
            fontSize="2xl"
          >
            {formatNumberToUsd(sevenDaysPerformance.value.toNumber())}{' '}
            <InfoOutlineIcon height="16px" width="16px" color="white" ml={1} />
          </TrendText>
          {sevenDaysPerformance.growthPercentage ? (
            <TrendText value={sevenDaysPerformance.growthPercentage}>
              {formatPercent(sevenDaysPerformance.growthPercentage.toNumber())}
            </TrendText>
          ) : null}
        </BorderBox>
        <BorderBox paddingY={2} paddingX={4} ml={2} w="50%">
          <Text color="gray.500" fontSize="xs">
            PERFORMANCE LIFETIME
          </Text>
          <TrendText value={lifeTimePerformance} display="flex" alignItems="center" fontSize="2xl">
            {formatNumberToUsd(lifeTimePerformance.toNumber())}{' '}
            <InfoOutlineIcon height="16px" width="16px" color="white" ml={1} />
          </TrendText>
        </BorderBox>
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
              {/* TODO skeleton */}
              {!poolData && <Spinner />}
              {poolData?.configurations.length === 0 ? (
                <Tr w="full">
                  <Td colSpan={4} border="none">
                    <Text textAlign="center" mt={4}>
                      No markets configures to pool
                    </Text>
                  </Td>
                </Tr>
              ) : (
                poolData?.configurations.map(({ id, market, max_debt_share_value, weight }, i) => {
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
                              <TrendText fontSize="xs" value={growth.percentage} display="block">
                                {formatPercent(growth.percentage.toNumber())}
                              </TrendText>
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
export const MarketSection = () => {
  const params = useParams();
  const { data: poolData, isLoading: isLoadingPoolData } = useGetPoolData(params.poolId);

  const marketIdsAndAddresses = poolData?.configurations.map(({ market }) => ({
    marketId: market.id,
    address: market.address,
  }));
  const { data: marketNamesById, isLoading: isLoadingMarketNames } =
    useMarketNamesById(marketIdsAndAddresses);
  const isLoading = isLoadingPoolData || isLoadingMarketNames;

  return (
    <MarketSectionUi marketNamesById={marketNamesById} poolData={poolData} isLoading={isLoading} />
  );
};
