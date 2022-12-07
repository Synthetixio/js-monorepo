import { Helmet } from 'react-helmet';
import { Container, Box } from '@chakra-ui/react';
import Permissions from '../../components/accounts/Permissions';
import { DepositingNav } from '../../components/accounts/DepositingNav';

export function Settings() {
  return (
    <Box>
      <Helmet>
        <title>Account Settings</title>
        <meta name="description" content="Account Settings" />
      </Helmet>
      <Container maxW="container.sm">
        <DepositingNav />
        <Permissions />
      </Container>
    </Box>
  );
}
