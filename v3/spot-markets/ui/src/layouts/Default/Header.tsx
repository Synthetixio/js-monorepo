import { Box, Container, Flex, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { NetworkController } from './NetworkController';
import { useEffect } from 'react';

export default function Header() {
  const { onClose } = useDisclosure();
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location, onClose]);

  return (
    <Flex mb="8" py="4" bg="navy.900" borderBottomWidth="1px" borderBottomColor="gray.900">
      <Container maxW="1024px" as={Flex} justifyContent="space-between" alignItems="center">
        <Box display={{ base: 'none', md: 'inline-block' }}>&nbsp;</Box>
        <Flex justifyContent="center" alignItems="center">
          <NetworkController />
        </Flex>
      </Container>
    </Flex>
  );
}
