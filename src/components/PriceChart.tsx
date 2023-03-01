import {
  Box,
  Flex,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

export function PriceChart() {
  return (
    <Box width="100%" height="100%" pb="32px">
      <Flex>
        <Box width="220px" p="4">
          Market Selector
        </Box>
        <StatGroup display="flex" flex="1">
          <Stat flex="1" p="4">
            <StatLabel>Market Price</StatLabel>
            <StatNumber>$123,123</StatNumber>
            <StatHelpText display="inline">
              <StatArrow type="decrease" />
              9.05% (24 hr.)
            </StatHelpText>
          </Stat>
          <Stat flex="1" p="4">
            <StatLabel>Index Price</StatLabel>
            <StatNumber>$123,123</StatNumber>
          </Stat>
          <Stat flex="1" p="4">
            <StatLabel>Funding Rate</StatLabel>
            <StatNumber>-34%</StatNumber>
            <StatHelpText display="inline">
              <StatArrow type="decrease" />
              9.05% (24 hr.)
            </StatHelpText>
          </Stat>

          <Stat flex="1" p="4">
            <StatLabel>Open Interest (Long)</StatLabel>
            <StatNumber>$100,000</StatNumber>
            <StatHelpText>9.05% ($1,000,000 total)</StatHelpText>
          </Stat>

          <Stat flex="1" p="4">
            <StatLabel>Open Interest (Short)</StatLabel>
            <StatNumber>$100,000</StatNumber>
            <StatHelpText>9.05% ($1,000,000 total)</StatHelpText>
          </Stat>
        </StatGroup>
      </Flex>
      <AdvancedRealTimeChart theme="dark" autosize></AdvancedRealTimeChart>
    </Box>
  );
}
