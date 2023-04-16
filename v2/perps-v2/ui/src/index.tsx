import React from 'react';
import { theme, Fonts } from '@synthetixio/v3-theme';
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
import Dashboard from './pages/Dashboard';
import Actions from './pages/Actions';
import { isStaging } from './utils/isStaging';

const client = new ApolloClient({
  uri: isStaging ? PERPS_V2_DASHBOARD_GRAPH_GOERLI_URL : PERPS_V2_DASHBOARD_GRAPH_URL,
  cache: new InMemoryCache(),
  resolvers,
  typeDefs,
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
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider theme={customTheme}>
        <Fonts />
        <RouterProvider router={router} />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
