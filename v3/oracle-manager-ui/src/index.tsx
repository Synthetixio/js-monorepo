import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { RecoilRoot } from 'recoil';
import { App } from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from '../components/Header';
import { RegisteredNode } from './RegisteredNode';
import { ConnectorContextProvider } from '../containers/Connector';

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
    <ConnectorContextProvider>
      <ChakraProvider theme={customTheme}>
        <Fonts />
        <Header />
        <RouterProvider router={router} />
      </ChakraProvider>
    </ConnectorContextProvider>
  </RecoilRoot>
);
