import { Container, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import CreateAccount from '../components/accounts/CreateAccount';
import { generatePath, useNavigate } from 'react-router-dom';
import { useAccounts } from '@snx-v3/useAccounts';

export function Home() {
  const navigate = useNavigate();
  const { data: accounts } = useAccounts();

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      navigate(generatePath('/accounts/:accountId', { accountId: accounts[0] }));
    }
  }, [accounts, navigate]);

  return (
    <Flex
      height="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex="1"
      pb="12"
    >
      <Container maxW="container.sm" pt="0" pb="24">
        <CreateAccount />
      </Container>
    </Flex>
  );
}
