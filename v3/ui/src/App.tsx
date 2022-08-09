import React, { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layouts/Default/DefaultLayout';
import { Home } from './pages';
import { NetworkChain } from './components/NetworkChain';
import { Initializer } from './Initializer';

export const Synthetix: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <NetworkChain>
        <Initializer>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </Initializer>
      </NetworkChain>
    </Suspense>
  );
};
