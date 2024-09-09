import { Box, Container, Flex, Text, Center } from '@chakra-ui/react';
import { CRatioBanner } from '@snx-v2/CRatioBanner';
import { CRatioHealthCard } from '@snx-v2/CRatioHealthCard';
import { BalanceBox } from '@snx-v2/BalanceBox';
import { MainActionCardsList } from '@snx-v2/MainActionCards';

import { BridgeIcon, DebtPoolIcon } from '@snx-v2/icons';
import { BoxLink } from '@snx-v2/BoxLink';
import { useTranslation } from 'react-i18next';
import { Welcome } from '@snx-v2/Welcome';
import Connector from 'containers/Connector';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';
import { useDebtData } from '@snx-v2/useDebtData';
import { useApr } from '@snx-v2/useApr';
import { StatBox } from '@snx-v2/StatBox';
import { formatPercent } from '@synthetixio/formatters';
import { Integrators } from '@snx-v2/Integrators';

const V2Home = () => {
  const { t } = useTranslation();
  const { isAppReady, connectWallet, network } = Connector.useContainer();
  const { delegateWallet } = useDelegateWallet();
  const { data: debtData } = useDebtData();
  const isStaking = debtData?.debtBalance.gt(0);
  const { data: aprs, isLoading: isAprLoading } = useApr();

  return (
    <>
      <Flex minHeight="calc(100vh - 86px)" direction="column">
        <Box sx={{ flex: '1 0 auto' }}>
          {isStaking && <CRatioBanner />}
          <Container maxW="1200px" py="1" mb={8}>
            <Flex
              mt="4"
              flexDirection={['column', 'column', 'column', 'row']}
              py={4}
              justifyContent="space-between"
            >
              <Box
                paddingY={isStaking ? '7' : undefined}
                paddingX={isStaking ? '4' : undefined}
                bg={isStaking ? 'navy.900' : undefined}
                border={isStaking ? '1px' : undefined}
                borderColor={isStaking ? 'gray.900' : undefined}
                borderRadius="base"
                flex="1"
              >
                {!isStaking && isAppReady && <Welcome mb={4} />}
                {isStaking && <CRatioHealthCard networkId={network?.id || 1} />}
                <MainActionCardsList connectWallet={connectWallet} />
              </Box>
              <Flex
                ml={[0, 0, 0, 6]}
                mt={[8, 8, 8, 0]}
                alignSelf={['center', 'center', 'center', 'flex-start']}
                width="full"
                maxWidth={['none', 'none', 'none', '287px']}
                flexDirection="column"
              >
                <StatBox
                  isLoading={isAprLoading}
                  titleToolTip="Trading Fees from previous week, extrapolated to APR"
                  label="Estimated APR"
                  alignItems={{ base: 'center', lg: 'end' }}
                  maxW={{ base: 'initial', lg: '325px' }}
                  w="100%"
                  bg="navy.900"
                  mb={4}
                  amount={formatPercent(aprs?.combinedApr.toNumber() || 0)}
                />
                {isStaking && <BalanceBox />}
                {delegateWallet ? null : (
                  <Box mt={isStaking ? 4 : 0}>
                    <BoxLink
                      to="/bridge"
                      headline={t('staking-v2.v2-home.box-links.bridge.headline')}
                      subHeadline={t('staking-v2.v2-home.box-links.bridge.subHeadline')}
                      icon={<BridgeIcon />}
                    />
                  </Box>
                )}
                {delegateWallet ? null : (
                  <Box mt={4}>
                    <BoxLink
                      to="/debt/manage"
                      headline={t('staking-v2.v2-home.box-links.hedge-debt.headline')}
                      subHeadline={t('staking-v2.v2-home.box-links.hedge-debt.subHeadline')}
                      icon={<DebtPoolIcon />}
                    />
                  </Box>
                )}
                <Box mt={4}>
                  <BoxLink
                    href={EXTERNAL_LINKS.Synthetix.Docs}
                    headline={t('staking-v2.v2-home.box-links.help.headline')}
                    subHeadline={t('staking-v2.v2-home.box-links.help.subHeadline')}
                    isExternal
                    icon={
                      <Center
                        boxSize="36px"
                        border="1px"
                        fontSize="3xl"
                        borderRadius="base"
                        fontWeight={800}
                        borderColor="whiteAlpha.400"
                        color="whiteAlpha.400"
                      >
                        ?
                      </Center>
                    }
                  />
                </Box>
              </Flex>
            </Flex>
          </Container>
        </Box>
        {/* sUSD Utilities Section */}
        <Box width="100%">
          <Box width="100%" borderTopWidth="1px" borderTopColor="gray.900" pt={8} bg="navy.900">
            <Container maxW="1200px" bg="transparent" mt={2}>
              <Box>
                <Text
                  variant="heading"
                  color="whiteAlpha.900"
                  fontSize="md"
                  lineHeight="lg"
                  fontWeight="700"
                >
                  {t('staking-v2.home.utilities.title')}
                </Text>
                <Text variant="heading" color="whiteAlpha.700" fontSize="sm" lineHeight="lg">
                  {t('staking-v2.home.utilities.description')}
                </Text>
              </Box>
            </Container>
          </Box>
          <Box pb={10} width="100%" px={[2, 0, 0, 0]} bg="navy.900">
            <Integrators />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default V2Home;
