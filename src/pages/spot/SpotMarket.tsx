import { Flex } from "@chakra-ui/react";
import { Header } from "../../components";

export function SpotMarket() {
  return (
    <Flex height="100vh" maxHeight="100vh" flexDirection="column">
      <Header isSpot />
      <Flex flex="1" height="100%" minHeight={0}>
        Spot Market
      </Flex>
    </Flex>
  );
}
