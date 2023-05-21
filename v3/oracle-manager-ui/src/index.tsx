import { createRoot } from 'react-dom/client';
import { ChakraProvider, ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { RecoilRoot } from 'recoil';
import { App } from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from '../components/Header';
import { RegisteredNode } from './RegisteredNode';
import { BlockchainProvider } from '@snx-v3/useBlockchain';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Alert: ComponentStyleConfig = {
  variants: {
    solid: (props) => {
      return {
        icon: { color: 'black' },
        container: { bg: `${props.colorScheme}.500`, color: 'black' },
      };
    },
  },
};

const customTheme = extendTheme({
  ...theme,
  components: { ...theme.components, Alert },
  styles: {
    global: {
      body: {
        bg: 'navy.900',
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: 'node/:nodeId', element: <RegisteredNode /> },
]);
const container = document.querySelector('#app');

const root = createRoot(container!);
root.render(
  <RecoilRoot>
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchInterval: 9999999,
              refetchOnMount: false,
              refetchOnWindowFocus: false,
            },
          },
        })
      }
    >
      <BlockchainProvider>
        <ChakraProvider theme={customTheme}>
          <Fonts />
          <Header />
          <RouterProvider router={router} />
        </ChakraProvider>
      </BlockchainProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
