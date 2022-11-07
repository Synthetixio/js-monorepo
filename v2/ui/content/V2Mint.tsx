import { Container, Box } from '@chakra-ui/react';

import { useRecoilValue } from 'recoil';
import { delegateWalletState } from 'store/wallet';
import { Mint } from '@snx-v2/Mint';
import { HomeButton } from '@snx-v2/HomeButton';

const V2Mint = () => {
  const delegateWallet = useRecoilValue(delegateWalletState);

  return (
    <Box bg="navy.900" height="100%">
      <Container pt={4} pb={16} bg="navy.900" maxW="4xl">
        <HomeButton />
        <Mint delegateWalletAddress={delegateWallet?.address} />
      </Container>
    </Box>
  );
};

export default V2Mint;
