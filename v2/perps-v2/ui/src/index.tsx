import React from 'react';
import { theme, Fonts } from '@snx-v2/v3Theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Account from './pages/Account';
import { Header } from './components/Header';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  PERPS_V2_DASHBOARD_GRAPH_URL,
  PERPS_V2_DASHBOARD_GRAPH_GOERLI_URL,
} from './utils/constants';
import { resolvers, typeDefs } from './queries/resolved';
import { Dashboard, Actions, Markets, Positions, StatsV3 } from './pages';
import { isStaging } from './utils/isStaging';
import { QueryClient, QueryClientProvider } from 'react-query';
import { EthersProvider } from './utils/ProviderContext';

const client = new ApolloClient({
  uri: isStaging ? PERPS_V2_DASHBOARD_GRAPH_GOERLI_URL : PERPS_V2_DASHBOARD_GRAPH_URL,
  cache: new InMemoryCache(),
  resolvers,
  typeDefs,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
  {
    path: '/actions',
    element: (
      <>
        <Header />
        <Actions />
      </>
    ),
  },
  {
    path: ':walletAddress',
    element: (
      <>
        <Header />
        <Account />
      </>
    ),
  },
  {
    path: '/markets',
    element: (
      <>
        <Header />
        <Markets />
      </>
    ),
  },
  {
    path: '/positions',
    element: (
      <>
        <Header />
        <Positions />
      </>
    ),
  },
  {
    path: '/v3',
    element: (
      <>
        <Header />
        <StatsV3 />
      </>
    ),
  },
]);

const container = document.querySelector('#app');

const root = createRoot(container!);

const customTheme = extendTheme({
  ...theme,
  styles: {
    global: {
      body: {
        bg: 'navy.900',
      },
    },
  },
  breakpoints: {
    ...theme.breakpoints,
    c900: '950px',
  },
});

root.render(
  <EthersProvider>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={customTheme}>
          <Fonts />
          <RouterProvider router={router} />
        </ChakraProvider>
      </QueryClientProvider>
    </ApolloProvider>
  </EthersProvider>
);
