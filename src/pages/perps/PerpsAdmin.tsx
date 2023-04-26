import { Flex } from "@chakra-ui/react";
import { Header } from "../../components";
import { CreateMarketForm } from "../../components/Market/CreateMarketForm";
import { SettlementStrategyForm } from "../../components/Market/SettlementStrategyForm";
import { SkewScaleForm } from "../../components/Market/SkewScaleForm";

export function PerpsAdmin() {
  return (
    <Flex height="100vh" maxHeight="100vh" flexDirection="column">
      <Header />
      <Flex
        m={8}
        align="start"
        direction="row"
        flex="1"
        height="100%"
        minHeight={0}
        gap={4}
        flexWrap="wrap"
      >
        <CreateMarketForm />
        <SettlementStrategyForm />
        <SkewScaleForm />
      </Flex>
    </Flex>
  );
}
