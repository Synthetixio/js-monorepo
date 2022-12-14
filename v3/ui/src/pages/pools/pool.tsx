import { Box, Heading, List, ListItem, Skeleton, Text } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useGetMarketNamesById } from '../../hooks/useGetMarketNames';
import { useGetPoolData1 } from '../../hooks/useGetPoolData';
import { calculatePnlGrowth, calculateTotalMarketPerformance } from '../../utils/calculations';
import { formatValue } from '../../utils/helpers';

export function Pool() {
  const { id } = useParams();
  const { data: poolData } = useGetPoolData1(id);

  const marketIdsAndAddresses = poolData?.configurations.map(({ market }) => ({
    marketId: market.id,
    address: market.address,
  }));
  const { data: marketNamesById, isLoading: isLoadingMarketNames } =
    useGetMarketNamesById(marketIdsAndAddresses);
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
        {poolData?.configurations && !isLoadingMarketNames ? (
          poolData.configurations.map(({ id, market }) => {
            console.log('market', market);
            const growth = calculatePnlGrowth(market.market_snapshot_by_week);
            return (
              <List key={id}>
                <ListItem>Name: {marketNamesById?.[market.id]}</ListItem>
                <ListItem>PNL: {formatValue(market.pnl)}</ListItem>
                {growth && (
                  <ListItem>
                    PNL 7 days: {formatValue(growth?.value)}({formatValue(growth?.percentage) * 100}
                    %)
                  </ListItem>
                )}
              </List>
            );
          })
        ) : (
          <Skeleton />
        )}
      </Box>
    </>
  );
}
