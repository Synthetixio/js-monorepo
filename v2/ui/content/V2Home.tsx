import { Box, Container, Flex, Text, Center } from '@chakra-ui/react';
import { CRatioBanner } from '@snx-v2/CRatioBanner';
import { CRatioHealthCard } from '@snx-v2/CRatioHealthCard';
import { BalanceBox } from '@snx-v2/BalanceBox';
import { MainActionCards } from '@snx-v2/MainActionCards';
import { UtilityCard } from '@snx-v2/UtilityCard';
import {
  CurveWhiteIcon,
  DHedgeIcon,
  KwentaIcon,
  LyraIcon,
  ThalesIcon,
  BridgeIcon,
  DebtPoolIcon,
} from '@snx-v2/icons';
import { BoxLink } from '@snx-v2/BoxLink';
import { useTranslation } from 'react-i18next';
import Connector from 'containers/Connector';
import { Welcome } from '@snx-v2/Welcome';

const V2Home = () => {
  const { t } = useTranslation();
  const { walletAddress } = Connector.useContainer();
  return (
    <>
      <Container maxW="1200px">
        {!walletAddress && <Welcome mt={8} />}
        <Box height="42px" position="absolute" left="0" right="0">
          <CRatioBanner />
        </Box>
        <Box height="42px" />
        <Flex mt="4" flexDirection={['column', 'column', 'column', 'row']}>
          <Box
            paddingY="7"
            paddingX="4"
            bg="navy.900"
            flex="1"
            border="1px"
            borderColor="gray.800"
            borderRadius="base"
          >
            <CRatioHealthCard />
            <MainActionCards />
          </Box>
          <Flex
            ml="6"
            alignSelf={['center', 'center', 'center', 'flex-start']}
            maxWidth="287px"
            width="full"
            flexDirection="column"
          >
            <BalanceBox />
            <Box mt={4}>
              <BoxLink
                to="/bridge"
                headline={t('staking-v2.v2-home.box-links.bridge.headline')}
                subHeadline={t('staking-v2.v2-home.box-links.bridge.subHeadline')}
                icon={<BridgeIcon />}
              />
            </Box>
            <Box mt={4}>
              <BoxLink
                to="/debt"
                headline={t('staking-v2.v2-home.box-links.debt-pool.headline')}
                subHeadline={t('staking-v2.v2-home.box-links.debt-pool.subHeadline')}
                icon={<DebtPoolIcon />}
              />
            </Box>
            <Box mt={4}>
              <BoxLink
                href="https://synthetix.io/"
                headline={t('staking-v2.v2-home.box-links.help.headline')}
                subHeadline={t('staking-v2.v2-home.box-links.help.subHeadline')}
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
      <Box bg="navy.900" px={4} py={8} mt={2} borderTopWidth="1px" borderTopColor="gray.900">
        <Container maxW="1200px">
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
          <Flex
            bg="navy.900"
            direction="row"
            height="fit-content"
            width="fit-content"
            overflow="hidden"
            mt={4}
          >
            <UtilityCard
              mr={4}
              title="Kwenta"
              description={t('staking-v2.home.utilities.kwentaDescription')}
              link="https://kwenta.io"
              Icon={KwentaIcon}
            />
            <UtilityCard
              mr={4}
              title="dHedge"
              description={t('staking-v2.home.utilities.dHedgeDescription')}
              link="https://www.dhedge.org/"
              Icon={DHedgeIcon}
            />
            <UtilityCard
              mr={4}
              title="Lyra"
              description={t('staking-v2.home.utilities.lyraDescription')}
              link="https://www.lyra.finance/"
              Icon={LyraIcon}
            />
            <UtilityCard
              mr={4}
              title="Thales"
              description={t('staking-v2.home.utilities.thalesDescription')}
              link="https://thalesmarket.io/"
              Icon={ThalesIcon}
            />
            <UtilityCard
              mr={4}
              title="Curve"
              description={t('staking-v2.home.utilities.curveDescription')}
              link="https://curve.fi/"
              Icon={CurveWhiteIcon}
            />
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default V2Home;
