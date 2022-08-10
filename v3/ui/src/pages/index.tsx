import { Container, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import CreateAccount from '../components/accounts/CreateAccount';
import { useNavigateWithChain } from '../hooks';
import { accountsState } from '../utils/state';

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigateWithChain();
  const [{ accounts }] = useRecoilState(accountsState);

  useEffect(() => {
    if (accounts.length) {
      navigate({ pathname: `/accounts/${accounts[0]}` });
    }
  }, []);

  return (
    <Flex flex="1">
      <Container maxW="container.sm" py="8">
        <CreateAccount />
      </Container>
    </Flex>
  );
}
