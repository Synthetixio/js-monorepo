import { Box, Container } from '@chakra-ui/react';
import { SelfLiquidation } from '@snx-v2/SelfLiquidation';

const V2SelfLiquidation = () => {
  return (
    <Box bg="navy.900">
      <Container pt={12} pb={16} bg="navy.900" maxW="4xl">
        <SelfLiquidation />
      </Container>
    </Box>
  );
};

export default V2SelfLiquidation;
