import { FC, ReactNode } from 'react';
import { Header as V2Header } from '../../../v2-components/Header';
import { Box, Container } from '@chakra-ui/react';
import { DeprecationBanner } from '../../../../components/DeprecationBanner/DeprecationBanner';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <V2Header />
      <Container pt={6} maxW="1200px" width="100%">
        <DeprecationBanner />
      </Container>
      <Box overflow="auto" flex="1 1 auto" overflowX="hidden">
        {children}
      </Box>
    </>
  );
};

export default AppLayout;
