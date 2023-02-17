import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Wallet } from './Wallet';
import { Header } from './components/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Actions } from './Actions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  // TODO @MF after page refresh it crashes on vercel
  {
    path: ':walletAddress',
    element: <Wallet />,
  },
  { path: '/actions', element: <Actions /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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
