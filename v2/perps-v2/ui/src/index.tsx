import React from 'react';
import App from './App';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Wallet } from './Wallet';
import { Header } from './components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { All } from './All';
import { createRoot } from 'react-dom/client';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: ':walletAddress',
    element: <Wallet />,
  },
  { path: '/all', element: <All /> },
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
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: {
                refetchOnWindowFocus: false,
                cacheTime: 900000,
                staleTime: 900000,
              },
            },
          })
        }
      >
        <Fonts />
        <Header />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
