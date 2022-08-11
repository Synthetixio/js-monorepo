import { Helmet } from 'react-helmet';
import { Container, Box } from '@chakra-ui/react';
import Permissions from '../../components/accounts/Permissions';
import { Subnav } from '../../components/accounts/Subnav/index';
import { useParams } from 'react-router-dom';

export function Settings() {
  const { id } = useParams();

  return (
    <Box>
      <Helmet>
        <title>Account Settings</title>
        <meta name="description" content="Account Settings" />
      </Helmet>
      <Container maxW="container.sm">
        {id && <Subnav id={id} />}
        <Permissions />
      </Container>
    </Box>
  );
}
