// import Socket  Bridge from '../components/SocketBridge';
import Head from 'react-helmet';
import styled from 'styled-components';
// import Connector from '../containers/Connector';
// import Button from '../components/Button';
import { Trans, useTranslation } from 'react-i18next';
import { Box, Flex, Text } from '@chakra-ui/react';
import AvailableBalanceBridge from '../components/AvailableBalanceBridge';
import BridgeSections from '../components/BridgeSections';
import SocketBridge from 'components/SocketBridge';
import { useState } from 'react';
import { BridgeTypeEnum } from '../constants/enums';
import NativeBridge from '../components/NativeBridge';

const BridgePage = () => {
  // const { connectWallet, walletConnectedToUnsupportedNetwork, isWalletConnected } =
  //   Connector.useContainer();
  const [currentBridge, setCurrentBridge] = useState<BridgeTypeEnum | undefined>();

  const handleBack = () => {
    setCurrentBridge(undefined);
  };

  const { t } = useTranslation();
  return (
    <Container>
      <Head>
        <title>{t('bridge.page-title')}</title>
      </Head>
      <Flex
        width="100%"
        flexDir={['column', 'column', 'column', 'row']}
        py="28px"
        gap={[3, 3, 3, '40px']}
        justifyContent="space-between"
      >
        <Box width="100%">
          <Headline>{t('bridge.headline')}</Headline>
          <Text mt="12px" color="gray.500" variant="heading" fontSize="small">
            <Trans i18nKey="bridge.description" />
          </Text>
        </Box>
        <AvailableBalanceBridge />
      </Flex>
      {!currentBridge && <BridgeSections setCurrentBridge={setCurrentBridge} />}
      {currentBridge === BridgeTypeEnum.NATIVE && <NativeBridge onBack={handleBack} />}
      {currentBridge === BridgeTypeEnum.INSTANT && <SocketBridge onBack={handleBack} />}

      {/* {Boolean(walletConnectedToUnsupportedNetwork || isWalletConnected) ? (
        <>
          <SocketBridge />
        </>
      ) : (
        <ConnectWalletContainer>
          <ConnectParagraph>{t('bridge.connect-wallet-text')}</ConnectParagraph>
          <Button variant="primary" onClick={() => connectWallet()}>
            {t('common.wallet.connect-wallet')}
          </Button>
        </ConnectWalletContainer>
      )} */}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// const ConnectWalletContainer = styled.div`
//   margin-top: 50px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const ConnectParagraph = styled.p`
//   margin-bottom: 10px;
// `;

// const HeadlineContainer = styled.div`
//   padding: 20px 0;
// `;

const Headline = styled.h1`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
`;
export default BridgePage;
