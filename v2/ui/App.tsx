import { useEffect, useMemo } from 'react';
import Head from 'react-helmet';
import { RecoilRoot } from 'recoil';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import WithAppContainers from 'containers';
import theme from 'styles/theme';
import Layout from 'sections/shared/Layout';
import { MediaContextProvider } from '@snx-v1/media';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DEFAULT_REQUEST_REFRESH_INTERVAL } from 'constants/defaults';
import { Web3OnboardProvider } from '@web3-onboard/react';
import { SynthetixQueryContextProvider, createQueryContext } from '@synthetixio/queries';
import SystemStatus from 'sections/shared/SystemStatus';
import Connector from 'containers/Connector';
import Routes from './Routes';
import { isSupportedNetworkId } from './utils/network';
import { ContractContext } from '@snx-v2/ContractContext';
import { SignerContext } from '@snx-v2/SignerContext';
import { SwitchNetworkContext } from '@snx-v2/SwitchNetworkContext';
import { GasSpeedProvider } from '@snx-v2/GasSpeedContext';
import { DelegateWalletProvider } from '@snx-v2/useDelegateWallet';
import ChakraProviderWithTheme from './components/ChakraProviderWithTheme';
import { onboard } from 'containers/Connector/config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: DEFAULT_REQUEST_REFRESH_INTERVAL,
      refetchOnWindowFocus: false,
    },
  },
});

function InnerApp() {
  const {
    provider,
    signer,
    ensName,
    walletType,
    network,
    L1DefaultProvider,
    synthetixjs,
    walletAddress,
    switchNetwork,
  } = Connector.useContainer();

  useEffect(() => {
    try {
      document.querySelector('#global-loader')?.remove();
    } catch (_e) {}
  }, []);

  const networkId = network?.id ? Number(network?.id) : -1;

  const contractContextData = useMemo(() => {
    return {
      networkId: isSupportedNetworkId(networkId) ? networkId : 1,
      walletAddress,
      ensName,
      walletType,
    };
  }, [ensName, networkId, walletAddress, walletType]);

  return (
    <>
      <SynthetixQueryContextProvider
        value={
          provider && isSupportedNetworkId(networkId) && synthetixjs
            ? createQueryContext({
                provider: provider,
                signer: signer || undefined,
                networkId,
                synthetixjs,
              })
            : createQueryContext({
                networkId: 1,
                provider: L1DefaultProvider,
                synthetixjs: null,
              })
        }
      >
        <GasSpeedProvider>
          <DelegateWalletProvider>
            <SignerContext.Provider value={signer}>
              <SwitchNetworkContext.Provider value={switchNetwork}>
                <ContractContext.Provider value={contractContextData}>
                  <Layout>
                    <SystemStatus>
                      <Routes />
                    </SystemStatus>
                  </Layout>
                </ContractContext.Provider>
              </SwitchNetworkContext.Provider>
            </SignerContext.Provider>
          </DelegateWalletProvider>
        </GasSpeedProvider>
        <ReactQueryDevtools />
      </SynthetixQueryContextProvider>
    </>
  );
}

function App() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t('meta.description')} />
        {/* open graph */}
        <meta property="og:url" content="https://staking.synthetix.io/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('meta.og.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:image" content="/images/staking-facebook.jpg" />
        <meta property="og:image:alt" content={t('meta.og.title')} />
        <meta property="og:site_name" content={t('meta.og.site-name')} />
        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@synthetix_io" />
        <meta name="twitter:creator" content="@synthetix_io" />
        <meta name="twitter:image" content="/images/staking-twitter.jpg" />
        <meta name="twitter:url" content="https://staking.synthetix.io/" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <ChakraProviderWithTheme>
        <Web3OnboardProvider web3Onboard={onboard}>
          <ThemeProvider theme={theme}>
            <RecoilRoot>
              <QueryClientProvider client={queryClient} contextSharing={true}>
                <WithAppContainers>
                  {/* @ts-ignore TODO: update styled-media-query */}
                  <MediaContextProvider>
                    <InnerApp />
                  </MediaContextProvider>
                </WithAppContainers>
              </QueryClientProvider>
            </RecoilRoot>
          </ThemeProvider>
        </Web3OnboardProvider>
      </ChakraProviderWithTheme>
    </>
  );
}

export default App;
