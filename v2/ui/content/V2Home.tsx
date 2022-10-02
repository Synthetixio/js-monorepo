import { Box, Container, Flex } from '@chakra-ui/react';
import { CRatioBanner } from '@snx-v2/CRatioBanner';
import { CRatioHealthCard } from '@snx-v2/CRatioHealthCard';
import { BalanceBox } from '@snx-v2/BalanceBox';
import { MainActionCards } from '@snx-v2/MainActionCards';
import { UtilityCard } from '@snx-v2/UtilityCard';
import { CurveIcon, DHedgeIcon, KwentaIcon, LyraIcon, ThalesIcon } from '@snx-v2/icons';

const V2Home = () => {
  return (
    <Container maxW="1200px">
      <Box height="42px" position="absolute" left="0" right="0">
        <CRatioBanner />
      </Box>
      <Box height="42px" />
      <Flex mt="4" flexDirection={['column', 'column', 'column', 'row']}>
        <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
          <CRatioHealthCard />
          <MainActionCards />
        </Box>
        <Flex
          ml="6"
          alignSelf={['center', 'center', 'center', 'flex-start']}
          maxWidth="287px"
          width="full"
        >
          <BalanceBox />
        </Flex>
      </Flex>
      <Flex>
        <UtilityCard
          title="Kwenta"
          description="Trade commodities, forex, crypto, and more with up to 25x leverage and deep liquidity."
          link="https://kwenta.io"
          Icon={KwentaIcon}
        />
        <UtilityCard
          title="dHedge"
          description="Use your sUSD to find the best investment managers and automated strategies in DeFi."
          link="https://www.dhedge.org/"
          Icon={DHedgeIcon}
        />
        <UtilityCard
          title="Lyra"
          description="Lyra’s decentralized exchange is the easiest place to buy and sell options on cryptocurrencies."
          link="https://www.lyra.finance/"
          Icon={LyraIcon}
        />
        <UtilityCard
          title="Thales"
          description="Trade various parimutuel markets like price up or down, sports markets, and others."
          link="https://thalesmarket.io/"
          Icon={ThalesIcon}
        />
        <UtilityCard
          title="Curve"
          description="Deposit your sUSD or sETH into Curve pools for consistent, secure yield on synth pairs."
          link="https://curve.fi/"
          Icon={CurveIcon}
        />
      </Flex>
    </Container>
  );
};

export default V2Home;
