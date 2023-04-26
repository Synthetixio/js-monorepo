import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Link } from "@chakra-ui/react";
import { Header } from "../components";

export function Index() {
  return (
    <Flex height="100vh" maxHeight="100vh" flexDirection="column">
      <Header />
      <Flex gap={8} p={8} flex="1" height="100%" minHeight={0}>
        <Link href="/perps/markets/eth">
          Perps ETH Market <ExternalLinkIcon mx="2px" />
        </Link>

        <Link href="/spot/markets/eth">
          Swap ETH <ExternalLinkIcon mx="2px" />
        </Link>
      </Flex>
    </Flex>
  );
}
