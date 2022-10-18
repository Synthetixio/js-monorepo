import React, { Suspense } from 'react';
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
import { NotFoundPage } from './pages/404';

export const Synthetix: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  if (colorMode == 'light') {
    toggleColorMode();
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/accounts/:id/positions/:collateral/:poolId" element={<StakingPosition />} />
          <Route path="/accounts/:id/collateral" element={<Collateral />} />
          <Route path="/accounts/:id/accept-nomination" element={<AcceptNomination />} />
          <Route path="/accounts/:id/settings" element={<Settings />} />
          <Route path="/accounts/:id" element={<Account />} />
          <Route path="/accounts/create" element={<CreateAccount />} />
          <Route path="/markets/create" element={<CreateMarket />} />
          <Route path="/markets/:address" element={<Market />} />
          <Route path="/pools/:id" element={<Pool />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
