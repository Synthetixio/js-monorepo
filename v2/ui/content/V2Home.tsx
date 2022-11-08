import { useContext } from 'react';
import { Box, Container, Flex, Text, Center } from '@chakra-ui/react';
import { CRatioBanner } from '@snx-v2/CRatioBanner';
import { CRatioHealthCard } from '@snx-v2/CRatioHealthCard';
import { BalanceBox } from '@snx-v2/BalanceBox';
import { MainActionCardsList } from '@snx-v2/MainActionCards';
import { UtilityCard } from '@snx-v2/UtilityCard';
import {
  DHedgeIcon,
  KwentaIcon,
  LyraIcon,
  ThalesIcon,
  BridgeIcon,
  DebtPoolIcon,
} from '@snx-v2/icons';
import { BoxLink } from '@snx-v2/BoxLink';
import { useTranslation } from 'react-i18next';
import { Welcome } from '@snx-v2/Welcome';
import { ContractContext } from '@snx-v2/ContractContext';
import CurveLogo from '../../ui/assets/svg/app/curve.svg';
import Connector from 'containers/Connector';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';

const V2Home = () => {
  const { t } = useTranslation();
  const { walletAddress } = useContext(ContractContext);
  const { isAppReady, connectWallet } = Connector.useContainer();

  return (
    <>
      <CRatioBanner />
      <Container maxW="1200px" py="1" mt={[0, 4, 4]} mb={8}>
        {!walletAddress && isAppReady && <Welcome mt={8} />}
        <Flex
          mt="4"
          flexDirection={['column', 'column', 'column', 'row']}
          py={4}
          justifyContent="space-between"
        >
          {walletAddress ? (
            <Box
              paddingY="7"
              paddingX="4"
              bg="navy.900"
              flex="1"
              border="1px"
              borderColor="gray.900"
              borderRadius="base"
            >
              <CRatioHealthCard />
              <MainActionCardsList connectWallet={connectWallet} />
            </Box>
          ) : (
            <MainActionCardsList connectWallet={connectWallet} />
          )}
          <Flex
            ml={[0, 0, 0, 6]}
            mt={[8, 8, 8, 0]}
            alignSelf={['center', 'center', 'center', 'flex-start']}
            width="full"
            maxWidth={['none', 'none', 'none', '287px']}
            flexDirection="column"
          >
            {walletAddress && <BalanceBox />}
            <Box mt={walletAddress ? 4 : 0}>
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
                href={EXTERNAL_LINKS.CMS.Home}
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
      {/* sUSD Utilities Section */}
      <Box
        bg="navy.900"
        px={4}
        py={8}
        mt={2}
        borderTopWidth="1px"
        borderTopColor="gray.900"
        overflowX="scroll"
      >
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
            direction={['column', 'row', 'row']}
            height="fit-content"
            width={['100%', 'fit-content', 'fit-content']}
            mt={4}
            pr={['0', '0', '10']}
            alignItems={['center', 'unset', 'unset']}
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
              mt={[4, 0, 0]}
            />
            <UtilityCard
              mr={4}
              title="Lyra"
              description={t('staking-v2.home.utilities.lyraDescription')}
              link="https://www.lyra.finance/"
              Icon={LyraIcon}
              mt={[4, 0, 0]}
            />
            <UtilityCard
              mr={4}
              title="Thales"
              description={t('staking-v2.home.utilities.thalesDescription')}
              link="https://thalesmarket.io/"
              Icon={ThalesIcon}
              mt={[4, 0, 0]}
            />
            <UtilityCard
              mr={4}
              title="Curve"
              description={t('staking-v2.home.utilities.curveDescription')}
              link="https://curve.fi/"
              Icon={() => <CurveLogo />}
              mt={[4, 0, 0]}
            />
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default V2Home;
