import React, { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layouts/Default';
import { Home } from './pages';
import { Account } from './pages/accounts';
import { CreateSynth } from './pages/synths/CreateSynth';
import { Synth } from './pages/synths/Synth';

export const Synthetix: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/accounts/:id" element={<Account />} />
          <Route path="/synths/create" element={<CreateSynth />} />
          <Route path="/synths/:id" element={<Synth />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
