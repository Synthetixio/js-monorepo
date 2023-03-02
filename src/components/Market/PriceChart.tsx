import { Box } from "@chakra-ui/react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

export function PriceChart() {
  return (
    <Box height="100%">
      <AdvancedRealTimeChart theme="dark" autosize></AdvancedRealTimeChart>
    </Box>
  );
}
