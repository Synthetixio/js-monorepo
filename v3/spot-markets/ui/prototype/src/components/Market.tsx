import { Box, Flex } from "@chakra-ui/react";
import { PriceChart, Stats, MarketSwitcher } from "./Market/index";

export function Market() {
  return (
    <Flex direction="column" height="100%" width="100%">
      <Flex flexDirection="column" height="100%">
        <Flex>
          <MarketSwitcher />
          <Stats />
        </Flex>
        <PriceChart />
      </Flex>
    </Flex>
  );
}
