import { Box, Flex } from "@chakra-ui/react";
import { Header, Market, Sidebar } from "../components";

export function Index() {
  return (
    <Flex height="100vh" maxHeight="100vh" flexDirection="column">
      <Header />
      <Flex flex="1" height="100%" minHeight={0}>
        Index
      </Flex>
    </Flex>
  );
}
