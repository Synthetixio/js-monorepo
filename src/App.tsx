import { useAccount } from "wagmi";

import { Header, Attestooooooor, PriceChart, Account } from "./components";

import theme from "./theme";
import { ChakraProvider, ColorModeScript, Flex, Box } from "@chakra-ui/react";

export function App() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Flex height="100vh" maxHeight="100vh" flexDirection="column">
        <Header />
        <Flex flex="1" height="100%">
          <Box flex="5">
            <PriceChart />
          </Box>
          <Box flex="2">
            <Account />
          </Box>
        </Flex>
      </Flex>

      {isConnected && (
        <>
          <hr />
          <Attestooooooor />
          <hr />
        </>
      )}
    </ChakraProvider>
  );
}
