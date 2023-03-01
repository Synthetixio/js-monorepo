import { Box, Flex } from "@chakra-ui/react";
import { PriceChart, Stats, Switcher } from "./Market/index";

export function Market() {
  return (
    <Box width="100%" height="100%" pb="32px">
      <Flex>
        <Switcher />
        <Stats />
      </Flex>
      <PriceChart />
    </Box>
  );
}
