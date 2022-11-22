import React, { Suspense, useEffect } from 'react';
import { Spinner, useColorMode } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layouts/Default';
import { Home } from './pages';
import {
  Account,
  CreateAccount,
  Settings,
  Collateral,
  StakingPosition,
  AcceptNomination,
} from './pages/accounts';
import { CreateMarket } from './pages/markets/CreateMarket';
import { Market } from './pages/markets/Market';
import { Pool } from './pages/pools/pool';
import { Teleporter } from './pages/teleporter/Teleporter';
import { NotFoundPage } from './pages/404';
import RequireAccount from './components/accounts/RequireAccount';

export const Synthetix: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route
            path="/accounts/:id/positions/:collateral/:poolId"
            element={
              <RequireAccount>
                <StakingPosition />
              </RequireAccount>
            }
          />
          <Route
            path="/accounts/:id/collateral"
            element={
              <RequireAccount>
                <Collateral />
              </RequireAccount>
            }
          />
          <Route
            path="/accounts/:id/accept-nomination"
            element={
              <RequireAccount>
                <AcceptNomination />
              </RequireAccount>
            }
          />
          <Route
            path="/accounts/:id/settings"
            element={
              <RequireAccount>
                <Settings />
              </RequireAccount>
            }
          />
          <Route
            path="/accounts/:id"
            element={
              <RequireAccount>
                <Account />
              </RequireAccount>
            }
          />
          <Route path="/accounts/create" element={<CreateAccount />} />
          <Route path="/markets/create" element={<CreateMarket />} />
          <Route path="/markets/:address" element={<Market />} />
          <Route path="/pools/:id" element={<Pool />} />
          <Route path="/teleporter" element={<Teleporter />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
