import { Container, Box } from '@chakra-ui/react';
import { Burn } from '@snx-v2/Burn';
import { HomeButton } from '@snx-v2/HomeButton';

const V2Burn = () => {
  return (
    <>
      <Box bg="navy.900" height="100%">
        <Container pt={8} pb={16} bg="navy.900" maxW="4xl">
          <HomeButton />
          <Burn />
        </Container>
      </Box>
    </>
  );
};

export default V2Burn;
