import { Box, Flex } from "@chakra-ui/react";
import { Header, Market, Sidebar } from "../components";

export function App() {
  return (
    <Flex height="100vh" maxHeight="100vh" flexDirection="column">
      <Header />
      <Flex flex="1" height="100%" minHeight={0}>
        <Box flex="5" pb="32px">
          <Market />
        </Box>
        <Box flex="2" maxHeight="100%">
          <Sidebar />
        </Box>
      </Flex>
    </Flex>
  );
}
