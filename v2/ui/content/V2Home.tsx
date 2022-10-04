import { Box, Container, Flex, Center } from '@chakra-ui/react';
import { CRatioBanner } from '@snx-v2/CRatioBanner';
import { CRatioHealthCard } from '@snx-v2/CRatioHealthCard';
import { BalanceBox } from '@snx-v2/BalanceBox';
import { MainActionCards } from '@snx-v2/MainActionCards';
import { BoxLink } from '@snx-v2/BoxLink';
import { BridgeIcon, DebtPoolIcon } from '@snx-v2/icons';
import { useTranslation } from 'react-i18next';

const V2Home = () => {
  const { t } = useTranslation();
  return (
    <Container maxW="1200px">
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
  );
};

export default V2Home;
