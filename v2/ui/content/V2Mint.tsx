import { Container, Box } from '@chakra-ui/react';
import { Mint } from '@snx-v2/Mint';
import { HomeButton } from '@snx-v2/HomeButton';

const V2Mint = () => {
  return (
    <Box bg="navy.900" height="100%">
      <Container pt={8} pb={16} bg="navy.900" maxW="4xl">
        <HomeButton />
        <Mint />
      </Container>
    </Box>
  );
};

export default V2Mint;
