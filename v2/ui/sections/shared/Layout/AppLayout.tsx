import { FC, ReactNode } from 'react';
import { Header as V2Header } from '../../../v2-components/Header';
import { Box } from '@chakra-ui/react';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <V2Header />
      <Box overflow="auto" flex="1 1 auto" overflowX="hidden">
        {children}
      </Box>
    </>
  );
};

export default AppLayout;
