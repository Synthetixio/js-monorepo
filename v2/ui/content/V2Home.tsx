import { Box, Container, Flex } from '@chakra-ui/react';
import { CRatioBanner } from '@snx-v2/CRatioBanner';
import { CRatioHealthCard } from '@snx-v2/CRatioHealthCard';
import { BalanceBox } from '@snx-v2/BalanceBox';
import { MainActionCards } from '@snx-v2/MainActionCards';

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
    </Container>
  );
};

export default V2Home;
