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
} from '@chakra-ui/react';
import { Pool, usePoolData } from '@snx-v3/usePoolData';
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

const TotalValue: FC<{ value?: Wei; isLoading: boolean }> = ({ value, isLoading }) => {
  if (isLoading) return <Skeleton w={16} h={8} mt={1} />;
  if (!value) return <>-</>;
  return (
    <TrendText value={value} display="flex" alignItems="center" fontSize="2xl" fontWeight="800">
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
  poolData?: Pool;
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
    <BorderBox padding={4} data-testid="pool markets">
      <Text fontSize="xl" fontWeight={700}>
        Markets
      </Text>
      <Text color="gray.400" fontSize="sm">
        {poolData?.name}
      </Text>
      <Flex mt={4} gap={4} flexDirection={{ base: 'column', sm: 'row' }}>
        <BorderBox paddingY={2} paddingX={4} flexGrow="1">
          <Text
            fontSize="md"
            color="white"
            display="flex"
            gap={1}
            alignItems="center"
            fontWeight={700}
          >
            LAST 7 DAYS{' '}
            <Tooltip label="Market's performance in the last seven days">
              <InfoOutlineIcon w="10px" h="10px" />
            </Tooltip>
          </Text>
          <TotalValue value={sevenDaysPerformance?.value} isLoading={!poolDataFetched} />
          <TotalValue value={sevenDaysPerformance?.growthPercentage} isLoading={!poolDataFetched} />
        </BorderBox>
        <BorderBox paddingY={2} paddingX={4} flexGrow="1">
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
                      No markets configures to pool
                    </Text>
                  </Td>
                </Tr>
              ) : (
                poolData?.configurations.map(({ id, market, weight }, i) => {
                  const totalWeight = poolData.total_weight;
                  const isLastItem = i + 1 === poolData.configurations.length;
                  const growth = calculateSevenDaysPnlGrowth(market.market_snapshots_by_week);
                  return (
                    <Tr key={id} color="gray.500">
                      <StyledTd isLastItem={isLastItem}>
                        <Text fontSize="sm" display="block">
                          {marketNamesById?.[market.id] || '-'}
                        </Text>
                        <Text fontSize="xs" display="block">
                          ID: {market.id}
                        </Text>
                      </StyledTd>
                      <StyledTd isLastItem={isLastItem} fontSize="sm">
                        <Text display="block">
                          {formatPercent(weight.div(totalWeight).toNumber())}
                        </Text>
                        {/* TODO, figure out max debt. See notion ticket "Pool page market max debt" */}
                        {/* <Flex flexWrap="wrap" maxW="135px">
                          <Text mr={1}>Max Debt:</Text>
                          <Text>
                            {max_debt_share_value.gt(Number.MAX_SAFE_INTEGER)
                              ? 'Unlimited'
                              : formatNumberToUsd(max_debt_share_value.toNumber())}
                          </Text>
                        </Flex> */}
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
      marketNamesById={marketNamesById}
      poolData={poolData}
      poolDataFetched={poolDataFetched}
      poolId={params.poolId}
    />
  );
};
