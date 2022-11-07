import { Container, Box } from '@chakra-ui/react';
import { Burn } from '@snx-v2/Burn';
import { delegateWalletState } from 'store/wallet';
import { useRecoilValue } from 'recoil';
import { HomeButton } from '@snx-v2/HomeButton';

const V2Burn = () => {
  const delegateWallet = useRecoilValue(delegateWalletState);
  return (
    <>
      <Box bg="navy.900" height="100%">
        <Container pt={4} pb={16} bg="navy.900" maxW="4xl">
          <HomeButton />
          <Burn delegateWalletAddress={delegateWallet?.address} />
        </Container>
      </Box>
    </>
  );
};

export default V2Burn;
