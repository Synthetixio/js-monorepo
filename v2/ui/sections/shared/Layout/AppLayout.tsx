import { FC, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { DESKTOP_SIDE_NAV_WIDTH, DESKTOP_BODY_PADDING } from '@snx-v1/constantsUi';
import ROUTES from 'constants/routes';
import NotificationContainer from 'constants/NotificationContainer';

import media from '@snx-v1/media';
import { delegateWalletState } from 'store/wallet';
import Header from './Header';
import SideNav from './SideNav';
import { Header as V2Header } from '../../../v2-components/Header';
import useSynthetixQueries from '@synthetixio/queries';
import Connector from 'containers/Connector';
import useLocalStorage from 'hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import { Box } from '@chakra-ui/react';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isL2 } = Connector.useContainer();

  const { useIsBridgeActiveQuery } = useSynthetixQueries();

  const depositsInactive = !(useIsBridgeActiveQuery().data ?? true); // Deposits are active by default to prevent redirects when status unknown
  const delegateWallet = useRecoilValue(delegateWalletState);

  useEffect(() => {
    if (delegateWallet && location.pathname !== ROUTES.Home) {
      navigate(ROUTES.Home);
    }
  }, [isL2, depositsInactive, delegateWallet, location.pathname, navigate]);

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
      {STAKING_V2_ENABLED ? <Box flex="1 1 auto">{children}</Box> : <Content>{children}</Content>}
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
