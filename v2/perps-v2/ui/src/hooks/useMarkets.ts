import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Wei, { wei } from '@synthetixio/wei';
import { z } from 'zod';
import { MARKETS_QUERY } from '../queries/dashboard';
import { DailyMarketStat_OrderBy } from '../__generated__/graphql';
import { getDateRange } from './useMarketStats';
import { perpsMarketDataContract } from './usePositions';
import { utils } from 'ethers';
import { calculateMarkPrice, FuturesMarketKey, MARKETS, pyth, scale } from '../utils';
import { PerpsV2MarketData } from '@synthetixio/contracts/build/mainnet-ovm/deployment/PerpsV2MarketData';
import { ZodStringToWei } from './useLargestOpenPosition';

const DataSchema = z.object({
  market: z.object({
    __typename: z.string().optional(),
    id: z.string(),
    marketKey: z.string(),
    asset: z.string(),
    isActive: z.boolean(),
    timestamp: z.string(),
  }),
  percentageDifference: ZodStringToWei,
  volume: z.string(),
  fundingRate: ZodStringToWei,
  indexPrice: ZodStringToWei,
  markPrice: ZodStringToWei,
  skew: ZodStringToWei,
  long: ZodStringToWei,
  short: ZodStringToWei,
  skewPercent: ZodStringToWei,
});

interface StateInterface {
  loading: boolean;
  data: z.infer<typeof DataSchema>[] | null;
  error: unknown | null;
}

export function useMarkets() {
  const [state, setState] = useState<StateInterface>({ loading: true, data: null, error: null });
  const client = useApolloClient();
  const { upper, lower } = getDateRange(2, 3);

  useEffect(() => {
    (async () => {
      try {
        const { data: marketData } = await client.query({
          query: MARKETS_QUERY,
          variables: {
            where: { day_gte: lower, day_lte: upper },
            orderBy: DailyMarketStat_OrderBy.Volume,
          },
        });

        // First, we want to get the highest for the current and previous dat
        const todaysResults =
          marketData?.dailyMarketStats.filter((market) => market.day === upper) || [];
        const yesterdaysResults =
          marketData?.dailyMarketStats.filter((market) => market.day === lower) || [];

        // Then we want to get the difference between the current day and the previous day
        const dataWithPercentageDifference = todaysResults.map((market) => {
          // Find the same market in yesterdays results
          const yesterday = yesterdaysResults.find((yesterdayMarket) => {
            return yesterdayMarket.market.id === market.market.id;
          });

          // In the off chance there was no volume yesterday we set volume to 0
          const percentageDifference = wei(market.volume, 18, true)
            .sub(wei(yesterday?.volume || 0, 18, true))
            .div(wei(yesterday?.volume || 1, 18, true));

          return {
            ...market,
            percentageDifference,
          };
        });

        const allMarketDetails = await perpsMarketDataContract.allMarketSummaries();

        const fundingDetails = await Promise.all([
          ...dataWithPercentageDifference.map(({ market }) => {
            return perpsMarketDataContract.marketDetailsForKey(market.marketKey);
          }),
        ]);

        const dataWithPythId = dataWithPercentageDifference.map((item) => {
          const id = `${utils.parseBytes32String(item.market.marketKey)}` as FuturesMarketKey;
          const pythInfo = MARKETS[id];
          return { pythId: pythInfo.pythIds?.mainnet || '', ...item };
        });

        const indexPrices = await pyth.getLatestPriceFeeds([
          ...dataWithPythId.map(({ pythId }) => pythId),
        ]);

        const result: z.infer<typeof DataSchema>[] = [];

        dataWithPythId.map(({ market, percentageDifference, volume }, index) => {
          // Find the market details for this market
          const marketDetails = allMarketDetails?.find((item) => {
            return item.key === market.marketKey;
          }) as PerpsV2MarketData.MarketSummaryStructOutput;

          const { fundingParameters, marketSizeDetails } = fundingDetails[index];

          // Get the index price from pyth
          let indexPrice: Wei = wei(0);
          if (indexPrices && indexPrices[index]) {
            const rawPriceInfo = indexPrices[index].getPriceUnchecked();
            indexPrice = scale(wei(rawPriceInfo?.price), rawPriceInfo?.expo || 1);
          }

          const skewWithScale = wei(marketDetails?.marketSkew, 18, true).div(
            wei(fundingParameters.skewScale, 18, true)
          );

          const markPrice = calculateMarkPrice(indexPrice, {
            skew: wei(marketDetails?.marketSkew, 18, true),
            indexPrice,
            skewScale: wei(fundingParameters.skewScale, 18, true),
          });

          result.push({
            market,
            percentageDifference,
            volume,
            fundingRate: wei(marketDetails?.currentFundingRate, 18, true).div(24),
            indexPrice,
            markPrice,
            skew: wei(marketDetails?.marketSkew, 18, true),
            long: wei(marketSizeDetails?.sides.long, 18, true),
            short: wei(marketSizeDetails?.sides.short, 18, true),
            skewPercent: skewWithScale.mul(100),
          });
        });

        const data = result.sort((a, b) => {
          return wei(b.volume, 18, true).toNumber() - wei(a.volume, 18, true).toNumber();
        });

        setState({ loading: false, data, error: null });
      } catch (error) {
        setState({ loading: false, data: null, error });
      }
    })();
  }, [client, upper, lower]);

  return state;
}

// async function fetchMarketDetails(tokens: string[]) {
//   // Fetch all market details using multicall
//   const allMarketDetails = await perpsMarketDataContract.allMarketSummaries();

//   // Fetch all funding details using multicall
//   const fundingDetails = await Promise.all([
//     ...allMarketDetails.map(({ key }) => {
//       return perpsMarketDataContract.marketDetailsForKey(key);
//     }),
//   ]);

//   return { allMarketDetails, fundingDetails };
// }
