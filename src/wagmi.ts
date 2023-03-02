import { configureChains, createClient } from "wagmi";
import { optimism, optimismGoerli } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { infuraProvider } from "wagmi/providers/infura";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const cannon = {
  id: 13370,
  name: "Cannon",
  network: "cannon",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://0.0.0.0:8545"],
    },
    public: {
      http: ["http://0.0.0.0:8545"],
    },
  },
};

/**
 * Tell wagmi which chains you want to support
 * To add a new chain simply import it and add it here
 * @see https://wagmi.sh/react/providers/configuring-chains
 */
const { chains, provider, webSocketProvider } = configureChains(
  [cannon],
  [
    infuraProvider({ apiKey: import.meta.env.VITE_INFURA_API_KEY! }),
    /**
     * Tells wagmi to use the default RPC URL for each chain
     * for some dapps the higher rate limits of Alchemy may be required
     */
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === cannon.id) {
          return { http: "http://0.0.0.0:8545" };
        }
        return { http: chain.rpcUrls.default.http[0] };
      },
    }),
  ],
);

/**
 * Export chains to be used by rainbowkit
 * @see https://wagmi.sh/react/providers/configuring-chains
 */
export { chains };

/**
 * Configures wagmi connectors for rainbowkit
 * @see https://www.rainbowkit.com/docs/custom-wallet-list
 * @see https://wagmi.sh/react/connectors
 */
const { connectors } = getDefaultWallets({
  appName: "Synthetix Perps V3 Prototype",
  chains,
});

/**
 * Creates a singleton wagmi client for the app
 * @see https://wagmi.sh/react/client
 */
export const client = createClient({
  autoConnect: true,
  connectors: connectors,
  provider,
  webSocketProvider,
});
