import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { WagmiConfig } from "wagmi";

import { chains, client } from "./wagmi";

import theme from "./theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { SpotMarket } from "./pages/spot/SpotMarket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SpotMarket />,
  },
]);

/**
 * Root providers and initialization of app
 * @see https://reactjs.org/docs/strict-mode.html
 * @see https://wagmi.sh/react/WagmiConfig
 * @see https://www.rainbowkit.com/docs/installation
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <WagmiConfig client={client}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#00a4c4",
            accentColorForeground: "#ffffff",
            borderRadius: "small",
          })}
        >
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
);
