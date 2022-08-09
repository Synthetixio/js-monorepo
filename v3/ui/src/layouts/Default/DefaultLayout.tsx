import { Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export const DefaultLayout: React.FC = () => {
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
        <Header />
        <Container maxW="container.sm" py="8">
          <Outlet />
        </Container>
      </Flex>
      <Footer />
    </Box>
  );
};
