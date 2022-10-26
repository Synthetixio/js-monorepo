import { Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { NetworkChain } from '../../components/NetworkChain';
import { MultipleTransactionModal } from '../../components/shared/TransactionReview/MultipleTransactionModal';
import { Initializer } from '../../Initializer';
import { transactionState } from '../../utils/state';
import Footer from './Footer';
import Header from './Header';

export const DefaultLayout: React.FC = () => {
  const [transaction, setTransaction] = useRecoilState(transactionState);

  return (
    <Box
      as="main"
      background="black"
      minHeight="100vh"
      color="rgba(255,255,255,0.85)"
      display="flex"
      flexDirection="column"
    >
      <Flex flex="1" flexDirection="column">
        <NetworkChain>
          <Initializer>
            <Header />
            <Container display="flex" flexDir="column" width="container.lg" flex="1">
              <Outlet />
            </Container>

            <MultipleTransactionModal
              isOpen={transaction.isOpen}
              onClose={() =>
                setTransaction({
                  transactions: [],
                  isOpen: false,
                })
              }
              title={transaction.title}
              subtitle={transaction.subtitle}
              transacions={transaction.transactions}
            />
          </Initializer>
        </NetworkChain>
      </Flex>
      <Footer />
    </Box>
  );
};
