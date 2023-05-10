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
import { Dashboard, Actions } from './pages';
import { isStaging } from './utils/isStaging';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
  // {
  //   path: '/markets',
  //   element: (
  //     <>
  //       <Header />
  //       <Markets />
  //     </>
  //   ),
  // },
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

const queryClient = new QueryClient();
root.render(
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <Fonts />
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </ApolloProvider>
);
