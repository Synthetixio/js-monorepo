import { FC } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { MultipleTransactionModal } from '../../components/shared/TransactionReview/MultipleTransactionModal';
import { Initializer } from '../../Initializer';
import Footer from './Footer';
import Header from './Header';

export const DefaultLayout: FC = () => (
  <Box
    as="main"
    minHeight="100vh"
    color="rgba(255,255,255,0.85)"
    display="flex"
    flexDirection="column"
  >
    <Flex flex="1" flexDirection="column">
      <Initializer>
        <Header />
        <Container display="flex" flexDir="column" maxW="1024px" flex="1">
          <Outlet />
        </Container>
        <MultipleTransactionModal />
      </Initializer>
    </Flex>
    <Footer />
  </Box>
);
