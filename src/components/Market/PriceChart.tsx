import { Box } from "@chakra-ui/react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { perpsMarkets } from "../../constants/markets";
import { useParams } from "react-router-dom";

export function PriceChart() {
  const { marketId } = useParams();
  const id = marketId?.toUpperCase();
  if (!id) {
    return null;
  }
  return (
    <Box height="100%">
      <AdvancedRealTimeChart
        theme="dark"
        autosize
        symbol={perpsMarkets[id].tradingViewSymbol}
      ></AdvancedRealTimeChart>
    </Box>
  );
}
