import React, { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layouts/Default';
import { Home } from './pages';
import {
  Account,
  CreateAccountPage,
  Settings,
  Collateral,
  AccountPosition,
  StakingPosition,
} from './pages/accounts';
import { CreateSynth } from './pages/synths/CreateSynth';
import { Synth } from './pages/synths/Synth';
import { Fund } from './pages/funds/fund';

export const Synthetix: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/accounts/:id/collateral/position" element={<AccountPosition />} />
          <Route path="/accounts/:id/positions/:collateral/:fundId" element={<StakingPosition />} />
          <Route path="/accounts/:id/collateral" element={<Collateral />} />
          <Route path="/accounts/:id/settings" element={<Settings />} />
          <Route path="/accounts/:id" element={<Account />} />
          <Route path="/accounts/create" element={<CreateAccountPage />} />
          <Route path="/synths/create" element={<CreateSynth />} />
          <Route path="/synths/:address" element={<Synth />} />
          <Route path="/funds/:id" element={<Fund />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
