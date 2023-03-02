import { useAccount } from "wagmi";

import { Header, Market, Sidebar } from "./components";

import theme from "./theme";
import { ChakraProvider, ColorModeScript, Flex, Box } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { optimism } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [optimism],
  [infuraProvider({ apiKey: process.env.INFURA_ID }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function App() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#90cdf4",
            accentColorForeground: "#000000",
            borderRadius: "small",
          })}
          chains={chains}
        >
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}
