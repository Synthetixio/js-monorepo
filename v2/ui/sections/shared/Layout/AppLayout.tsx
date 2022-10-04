import { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { DESKTOP_SIDE_NAV_WIDTH, DESKTOP_BODY_PADDING } from '@snx-v1/constantsUi';

import NotificationContainer from 'constants/NotificationContainer';

import media from '@snx-v1/media';

import Header from './Header';
import SideNav from './SideNav';
import { Header as V2Header } from '../../../v2-components/Header';
import useLocalStorage from 'hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import { Box } from '@chakra-ui/react';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const [STAKING_V2_ENABLED] = useLocalStorage(LOCAL_STORAGE_KEYS.STAKING_V2_ENABLED, false);

  return (
    <>
      {STAKING_V2_ENABLED ? (
        <V2Header />
      ) : (
        <>
          <SideNav />
          <Header />
        </>
      )}
      {STAKING_V2_ENABLED ? (
        <Box overflow="auto" flex="1 1 auto">
          {children}
        </Box>
      ) : (
        <Content>{children}</Content>
      )}
      <NotificationContainer />
    </>
  );
};

const Content = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  ${media.greaterThan('mdUp')`
    padding-left: ${`calc(${DESKTOP_SIDE_NAV_WIDTH + DESKTOP_BODY_PADDING}px)`};
 `};
`;

export default AppLayout;
