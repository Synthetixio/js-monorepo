import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useGetMarketNamesById } from '../../hooks/useGetMarketNames';
import {
  calculateGrowthForKey,
  useGetMarketSnapshotsByMarketId,
} from '../../hooks/useGetMarketSnapshots';
import { PoolData, useGetPoolData } from '../../hooks/useGetPoolData';
import { formatValue } from '../../utils/helpers';

const getSevenDaysAgoStartOfDay = () => {
  const date = new Date();
  // Set the date to 7 days ago
  date.setDate(date.getDate() - 7);
  // Set the time to 00:00:00 (start of the day)
  date.setHours(0, 0, 0, 0);
  // We want start of date so that the query invalidates less often
  return date.getTime();
};
const calculateTotalMarketPerformance = (poolData: PoolData) => {
  return poolData.configurations.reduce((acc, { market }) => {
    return acc.add(market.pnl);
  }, BigNumber.from(0));
};
export function Pool() {
  const { id } = useParams();
  const { data: poolData } = useGetPoolData(id);
  const marketIds = poolData?.configurations.map(({ market }) => market.id);

  const { data: marketSnapshotsByMarketId } = useGetMarketSnapshotsByMarketId(
    getSevenDaysAgoStartOfDay(),
    marketIds
  );
  const marketIdsAndAddresses = poolData?.configurations.map(({ market }) => ({
    marketId: market.id,
    address: market.address,
  }));
  const { data: marketNamesById } = useGetMarketNamesById(marketIdsAndAddresses);
  return (
    <>
      <Helmet>
        <title>Pool</title>
        <meta name="description" content="Pool" />
      </Helmet>
      <Box>
        <Heading>Pool: {poolData?.name}</Heading>
        <Text>
          Market performance:
          {poolData ? formatValue(calculateTotalMarketPerformance(poolData)) : ''}
        </Text>
        {poolData?.configurations.map(({ id, market }) => {
          const growth = calculateGrowthForKey('pnl', marketSnapshotsByMarketId?.[market.id]);
          return (
            <List key={id}>
              <ListItem>Name: {marketNamesById?.[market.id]}</ListItem>
              <ListItem>PNL: {formatValue(market.pnl)}</ListItem>
              {growth && (
                <ListItem>
                  PNL 7 days: {formatValue(growth?.value)}({formatValue(growth?.percentage) * 100}%)
                </ListItem>
              )}
            </List>
          );
        })}
      </Box>
    </>
  );
}
