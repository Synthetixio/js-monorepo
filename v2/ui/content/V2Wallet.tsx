import { Wallet } from '@snx-v2/Wallet';
import { Container, Box } from '@chakra-ui/react';
import { HomeButton } from '@snx-v2/HomeButton';

const V2Wallet = () => {
  return (
    <Box bg="navy.900" height="100%">
      <Container pt={4} pb={16} bg="navy.900" maxW="4xl">
        <HomeButton />
        <Wallet />
      </Container>
    </Box>
  );
};
export default V2Wallet;
