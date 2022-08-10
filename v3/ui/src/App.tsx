import React, { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layouts/Default/DefaultLayout';
import { Home } from './pages';
import { Account } from './pages/accounts';

export const Synthetix: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/accounts/:id" element={<Account />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
