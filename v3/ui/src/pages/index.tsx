import { Container, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import CreateAccount from '../components/accounts/CreateAccount';
import { useNavigateWithChain } from '../hooks';
import { accountsState } from '../utils/state';

export function Home() {
  const navigate = useNavigateWithChain();
  const [{ accounts }] = useRecoilState(accountsState);
  const firstAccount = accounts.length ? accounts[0] : undefined;
  useEffect(() => {
    if (firstAccount) {
      navigate({ pathname: `/accounts/${firstAccount}` }, { replace: true });
    }
  }, [firstAccount, navigate]);

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
