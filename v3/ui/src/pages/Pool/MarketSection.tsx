import { FC } from 'react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Flex,
  Table,
  TableCellProps,
  TableContainer,
  Text,
  Th,
  Td,
  Thead,
  Tr,
  Tbody,
  Tooltip,
  Skeleton,
  TextProps,
} from '@chakra-ui/react';
import { PoolType, usePoolData } from '@snx-v3/usePoolData';
import {
  calculateSevenDaysPnlGrowth,
  calculatePoolPerformanceSevenDays,
  calculatePoolPerformanceLifetime,
} from '@snx-v3/calculations';
import { formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { useParams } from '@snx-v3/useParams';
import { useMarketNamesById } from '@snx-v3/useMarketNamesById';
import { TrendText } from '@snx-v3/TrendText';
import { BorderBox } from '@snx-v3/BorderBox';
import Wei from '@synthetixio/wei';

const StyledTh: FC<TableCellProps> = (props) => (
  <Th
    textTransform="none"
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

const StyledTd: FC<TableCellProps & { isLastItem?: boolean }> = ({ isLastItem, ...props }) => (
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

const LoadingRow = () => (
  <Tr>
    <StyledTd>
      <Skeleton w="full" height={8} />
    </StyledTd>
    <StyledTd>
      <Skeleton w="full" height={8} />
    </StyledTd>
    <StyledTd>
      <Skeleton w="full" height={8} />
    </StyledTd>
    <StyledTd>
      <Skeleton w="full" height={8} />
    </StyledTd>
  </Tr>
);

interface TotalValueProps extends TextProps {
  value?: Wei;
  isLoading: boolean;
}

const TotalValue: FC<TotalValueProps> = ({ value, isLoading, ...props }) => {
  if (isLoading) return <Skeleton w={16} h={8} mt={1} />;
  if (!value) return <>-</>;
  return (
    <TrendText
      value={value}
      display="flex"
      alignItems="center"
      fontSize="2xl"
      fontWeight="800"
      {...props}
    >
      {formatNumberToUsd(value.toNumber())}{' '}
    </TrendText>
  );
};

export function MarketSectionUi({
  poolData,
  marketNamesById,
  poolId,
  poolDataFetched,
}: {
  poolData?: PoolType;
  marketNamesById?: Record<string, string | undefined>;
  poolId?: string;
  poolDataFetched: boolean;
}) {
  const sevenDaysPerformance = calculatePoolPerformanceSevenDays(poolData);
  const lifeTimePerformance = calculatePoolPerformanceLifetime(poolData);

  if (poolDataFetched && !poolData) {
    return (
      <BorderBox padding={4}>
        <Text>Pool with id: {poolId} does not exists</Text>
      </BorderBox>
    );
  }
  return (
    <BorderBox padding={4} flexDirection="column" data-testid="pool markets">
      <Text fontSize="xl" fontWeight={700}>
        Markets
      </Text>
      <Text color="gray.400" fontSize="sm">
        {poolData?.name}
      </Text>
      <Flex mt={4} gap={4} flexDirection={{ base: 'column', sm: 'row' }}>
        <BorderBox paddingY={2} paddingX={4} flexGrow="1" flexDirection="column">
          <Text
            fontSize="md"
            color="white"
            display="flex"
            gap={1}
            alignItems="center"
            fontWeight={700}
          >
            Last 7 Days{' '}
            <Tooltip label="Market's performance in the last seven days">
              <InfoOutlineIcon w="10px" h="10px" />
            </Tooltip>
          </Text>
          <TotalValue value={sevenDaysPerformance?.value} isLoading={!poolDataFetched} />
          <TotalValue
            value={sevenDaysPerformance?.growthPercentage}
            isLoading={!poolDataFetched}
            fontSize="md"
          />
        </BorderBox>
        <BorderBox paddingY={2} paddingX={4} flexGrow="1" flexDirection="column">
          <Text
            fontWeight={700}
            fontSize="md"
            color="white"
            display="flex"
            gap={1}
            alignItems="center"
          >
            Performance Lifetime
            <Tooltip label="Market's lifetime performance">
              <InfoOutlineIcon w="10px" h="10px" />
            </Tooltip>
          </Text>
          <TotalValue value={lifeTimePerformance} isLoading={!poolDataFetched} />
        </BorderBox>
      </Flex>
      <Flex>
        <TableContainer w="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <StyledTh>Market</StyledTh>
                <StyledTh>Pool Allocation</StyledTh>
                <StyledTh>Last 7 Days</StyledTh>
                <StyledTh>Lifetime</StyledTh>
              </Tr>
            </Thead>
            <Tbody>
              {!poolData && <LoadingRow />}
              {poolData?.configurations.length === 0 ? (
                <Tr w="full">
                  <Td colSpan={4} border="none">
                    <Text textAlign="center" mt={4}>
                      No markets configured for the pool
                    </Text>
                  </Td>
                </Tr>
              ) : (
                poolData?.configurations.map(({ id, market, weight }, i) => {
                  const isLastItem = i + 1 === poolData.configurations.length;
                  const growth = calculateSevenDaysPnlGrowth(market.market_snapshots_by_week);
                  return (
                    <Tr key={id} color="gray.500" data-testid="pool market" data-market={id}>
                      <StyledTd isLastItem={isLastItem}>
                        <Text
                          fontSize="sm"
                          display="block"
                          color="gray.50"
                          data-testid="market name"
                        >
                          {marketNamesById?.[market.id] ? marketNamesById[market.id] : '-'}
                        </Text>
                        <Text fontSize="xs" display="block" color="gray.50" data-testid="market id">
                          ID: {market.id}
                        </Text>
                      </StyledTd>
                      <StyledTd isLastItem={isLastItem} fontSize="sm" data-testid="pool allocation">
                        {poolData.total_weight ? (
                          <>
                            <Text display="block" color="gray.50">
                              {formatPercent(weight.div(poolData.total_weight).toNumber())}
                            </Text>
                            {/* TODO, figure out max debt. See notion ticket "Pool page market max debt" */}
                            {/*
                            <Flex flexWrap="wrap" maxW="135px">
                              <Text mr={1}>Max Debt:</Text>
                              <Text>
                                {max_debt_share_value.gt(Number.MAX_SAFE_INTEGER)
                                  ? 'Unlimited'
                                  : formatNumberToUsd(max_debt_share_value.toNumber())}
                              </Text>
                            </Flex>
                            */}
                          </>
                        ) : (
                          '-'
                        )}
                      </StyledTd>
                      <StyledTd isLastItem={isLastItem} data-testid="market growth">
                        {growth ? (
                          <>
                            <Tooltip
                              hasArrow
                              label={
                                <Flex
                                  flexDirection="column"
                                  alignItems="flex-start"
                                  textAlign="left"
                                >
                                  <Text>
                                    Last 7 days calculated by <br /> &quot;this week&apos;s
                                    pnl&quot; - &quot;last week&apos;s pnl&quot;
                                  </Text>
                                  <Text>
                                    Last Week PnL:{' '}
                                    {formatNumberToUsd(
                                      market.market_snapshots_by_week[1]?.pnl.toNumber() || 0
                                    )}
                                  </Text>
                                  <Text>
                                    This Week PnL:{' '}
                                    {formatNumberToUsd(
                                      market.market_snapshots_by_week[0]?.pnl.toNumber() || 0
                                    )}
                                  </Text>
                                </Flex>
                              }
                            >
                              <Text fontSize="sm" display="block" color="gray.50">
                                {formatNumberToUsd(growth.value.toNumber())}
                              </Text>
                            </Tooltip>
                            {growth.percentage ? (
                              <TrendText
                                fontSize="xs"
                                value={growth.percentage}
                                display="block"
                                data-testid="market growth percentage"
                              >
                                {formatPercent(growth.percentage.toNumber())}
                              </TrendText>
                            ) : null}
                          </>
                        ) : (
                          '-'
                        )}
                      </StyledTd>
                      <StyledTd isLastItem={isLastItem}>
                        <Tooltip
                          hasArrow
                          label={
                            <Flex flexDirection="column" alignItems="flex-start" textAlign="left">
                              <Text color="gray.50">
                                Withdrawn: {formatNumberToUsd(market.usd_withdrawn.toNumber())}
                              </Text>
                              <Text color="gray.50">
                                Deposited: {formatNumberToUsd(market.usd_deposited.toNumber())}{' '}
                              </Text>
                              <Text color="gray.50">
                                Reported Debt: {formatNumberToUsd(market.reported_debt.toNumber())}
                              </Text>
                              <Text color="gray.50">
                                Net Issuance <br /> (withdrawn - deposited):{' '}
                                {formatNumberToUsd(market.net_issuance.toNumber())}
                              </Text>

                              <Text color="gray.50">
                                PnL <br /> (reported debt + net issuance) * -1:{' '}
                                {formatNumberToUsd(market.pnl.toNumber())}
                              </Text>
                            </Flex>
                          }
                        >
                          <Text color="gray.50" data-testid="market pnl">
                            {formatNumberToUsd(market.pnl.toNumber())}
                          </Text>
                        </Tooltip>
                      </StyledTd>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </BorderBox>
  );
}
export const MarketSection = () => {
  const params = useParams();
  const { data: poolData, isFetched: poolDataFetched } = usePoolData(params.poolId);

  const marketIdsAndAddresses = poolData?.configurations.map(({ market }) => ({
    marketId: market.id,
    address: market.address,
  }));
  const { data: marketNamesById } = useMarketNamesById(marketIdsAndAddresses);

  return (
    <MarketSectionUi
      poolId={params.poolId}
      poolDataFetched={poolDataFetched}
      poolData={poolData}
      marketNamesById={marketNamesById}
    />
  );
};
