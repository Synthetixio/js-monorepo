import { Container, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import CreateAccount from '../components/accounts/CreateAccount';
import { useNavigateWithChain } from '../hooks';
import { accountsState } from '../utils/state';

export function Home() {
  const navigate = useNavigateWithChain();
  const [{ accounts }] = useRecoilState(accountsState);

  useEffect(() => {
    if (accounts.length) {
      navigate({ pathname: `/accounts/${accounts[0]}` });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex flex="1">
      <Container maxW="container.sm" py="8">
        <CreateAccount />
      </Container>
    </Flex>
  );
}
