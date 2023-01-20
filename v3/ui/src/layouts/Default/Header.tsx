import { Box, Container, Flex, Link, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { NetworkController } from '../../components/NetworkController';
import { useEffect } from 'react';
import { AccountsSelector } from '@snx-v3/AccountsSelector';
import { Logo } from '@snx-v3/Icons';

export default function Header() {
  const { onClose } = useDisclosure();
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location, onClose]);

  return (
    <>
      <Flex mb="8" py="4" bg="navy.900" borderBottomWidth="1px" borderBottomColor="gray.900">
        <Container maxW="1024px" as={Flex} justifyContent="space-between" alignItems="center">
          <Box display={{ base: 'none', md: 'inline-block' }}>
            <Link to="/" as={RouterLink} py={4} pr={2}>
              <Logo />
            </Link>
          </Box>
          <Flex justifyContent="center" alignItems="center">
            <Box display={{ base: 'none', md: 'inline-block' }} pr={4}>
              <AccountsSelector />
            </Box>
            <NetworkController />
          </Flex>
        </Container>
      </Flex>
    </>
  );
}
