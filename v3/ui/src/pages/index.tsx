import { Container, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import CreateAccount from '../components/accounts/CreateAccount';
import { accountsState } from '../utils/state';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const [
    {
      accounts: [account],
    },
  ] = useRecoilState(accountsState);

  useEffect(() => {
    if (account) {
      navigate({ pathname: `/accounts/${account}` });
    }
  }, [account, navigate]);

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
