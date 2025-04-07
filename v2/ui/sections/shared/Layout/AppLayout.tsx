import { FC, ReactNode } from 'react';
import { Header as V2Header } from '../../../v2-components/Header';
import { Alert, AlertIcon, Box, Collapse, Container, Text } from '@chakra-ui/react';
import { DeprecationBanner } from '../../../../components/DeprecationBanner/DeprecationBanner';
import { useMigrationData } from './useMigrationData';
import Connector from 'containers/Connector';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { walletAddress } = Connector.useContainer();
  const { data: migrationData } = useMigrationData({
    walletAddress: walletAddress ? walletAddress : undefined,
  });
  return (
    <>
      <V2Header />
      <Container pt={6} maxW="1200px" width="100%">
        <Collapse in={Boolean(migrationData?.address)} animateOpacity unmountOnExit>
          <Alert status="error" mb="6">
            <AlertIcon />
            <Text>
              We’ve recently deprecated solo staking and your account was impacted. Please create a
              ticket in discord and the team will help recover your account
            </Text>
          </Alert>
        </Collapse>
        <Collapse in={!migrationData?.address} animateOpacity unmountOnExit>
          <DeprecationBanner />
        </Collapse>
      </Container>
      <Box overflow="auto" flex="1 1 auto" overflowX="hidden">
        {children}
      </Box>
    </>
  );
};

export default AppLayout;
