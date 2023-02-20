import { FC, Suspense, useEffect } from 'react';
import { Spinner, useColorMode } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layouts/Default';
import { Home } from './pages/Home';
import { Manage } from './pages/Manage';
import { Deposit } from './pages/deposit';
import { CreateAccount, Settings, Collateral, AcceptNomination } from './pages/accounts';
import { CreateMarket } from './pages/markets/CreateMarket';
import { Market } from './pages/markets/Market';
import { Pool } from './pages/Pool';
import { Teleporter } from './pages/teleporter/Teleporter';
import { NotFoundPage } from './pages/404';

export const Synthetix: FC = () => {
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
            path="/accounts/:accountId/positions/:collateralSymbol/:poolId"
            element={<Manage />}
          />
          <Route path="/deposit/:collateralSymbol/:poolId" element={<Deposit />} />
          <Route path="/accounts/:accountId/collateral" element={<Collateral />} />
          <Route path="/accounts/:accountId/accept-nomination" element={<AcceptNomination />} />
          <Route path="/accounts/:accountId/settings" element={<Settings />} />
          <Route path="/accounts/create" element={<CreateAccount />} />
          <Route path="/pools/:poolId" element={<Pool />} />
          <Route path="/markets/create" element={<CreateMarket />} />
          <Route path="/markets/:marketId" element={<Market />} />
          <Route path="/teleporter" element={<Teleporter />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
