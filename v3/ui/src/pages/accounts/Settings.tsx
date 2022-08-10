import { Helmet } from 'react-helmet';
import { Container, Box } from '@chakra-ui/react';
import Permissions from '../../components/accounts/Permissions';

export function Settings() {
  return (
    <Box>
      <Helmet>
        <title>Account Settings</title>
        <meta name="description" content="Account Settings" />
      </Helmet>
      <Container maxW="container.sm">
        {/* <Subnav /> */}
        <Permissions />
      </Container>
    </Box>
  );
}
