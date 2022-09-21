import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { safeLazy } from '@synthetixio/safe-import';
import AppLayout from './sections/shared/Layout/AppLayout';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import useLocalStorage from 'hooks/useLocalStorage';

const DashboardPage = safeLazy(
  () => import(/* webpackChunkName: "dashboard" */ './content/DashboardPage')
);
const SynthsPage = safeLazy(() => import(/* webpackChunkName: "synths" */ './content/SynthsPage'));
const StakingPage = safeLazy(
  () => import(/* webpackChunkName: "staking" */ './content/StakingPage')
);
const LoansPage = safeLazy(() => import(/* webpackChunkName: "loans" */ './content/LoansPage'));
const GovPage = safeLazy(() => import(/* webpackChunkName: "gov" */ './content/GovPage'));
const EarnPage = safeLazy(() => import(/* webpackChunkName: "earn" */ './content/EarnPage'));
const DebtPage = safeLazy(() => import(/* webpackChunkName: "debt" */ './content/DebtPage'));
const EscrowPage = safeLazy(() => import(/* webpackChunkName: "escrow" */ './content/EscrowPage'));
const MigrateEscrowPage = safeLazy(
  () => import(/* webpackChunkName: "migrate-escrow" */ './content/MigrateEscrowPage')
);
const HistoryPage = safeLazy(
  () => import(/* webpackChunkName: "history" */ './content/HistoryPage')
);
const DelegatePage = safeLazy(
  () => import(/* webpackChunkName: "delegate" */ './content/DelegatePage')
);
const MergeAccountsPage = safeLazy(
  () => import(/* webpackChunkName: "merge-accounts" */ './content/MergeAccountsPage')
);
const BridgePage = safeLazy(() => import(/* webpackChunkName: "bridge" */ './content/BridgePage'));
const NotFound = safeLazy(() => import(/* webpackChunkName: "404" */ './content/404'));

const V2HomePage = safeLazy(() => import(/* webpackChunkName: "v2-home" */ './content/V2Home'));
const V2MintPage = safeLazy(() => import(/* webpackChunkName: "v2-mint" */ './content/V2Mint'));
const V2BurnPage = safeLazy(() => import(/* webpackChunkName: "v2-home" */ './content/V2Burn'));

export default function AppRoutes() {
  const [STAKING_V2_ENABLED] = useLocalStorage(LOCAL_STORAGE_KEYS.STAKING_V2_ENABLED, false);
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={STAKING_V2_ENABLED ? <V2HomePage /> : <DashboardPage />} />

          {STAKING_V2_ENABLED ? (
            <>
              <Route path="/staking" element={<Navigate to="/staking/mint" />} />
              <Route path="/staking/mint" element={<V2MintPage />} />
              <Route path="/staking/burn" element={<V2BurnPage />} />
            </>
          ) : (
            <Route path="/staking" element={<StakingPage />}>
              <Route path=":action" element={<StakingPage />} />
            </Route>
          )}

          <Route path="/loans" element={<LoansPage />}>
            <Route path=":action" element={<LoansPage />} />
            <Route path=":loanType/:loanId/:loanAction" element={<LoansPage />} />
          </Route>

          <Route path="/synths" element={<SynthsPage />} />

          <Route path="/gov" element={<GovPage />}>
            <Route path=":spaceKey/:panel" element={<GovPage />} />
          </Route>

          <Route path="/earn" element={<EarnPage />}>
            <Route path=":pool" element={<EarnPage />}>
              <Route path=":action" element={<EarnPage />} />
            </Route>
          </Route>

          <Route path="/debt" element={<DebtPage />} />

          <Route path="/migrate-escrow" element={<MigrateEscrowPage />} />

          <Route path="/escrow" element={<EscrowPage />}>
            <Route path=":action" element={<EscrowPage />} />
          </Route>

          <Route path="/history" element={<HistoryPage />} />

          <Route path="/delegate" element={<DelegatePage />} />

          <Route path="/merge-accounts" element={<MergeAccountsPage />}>
            <Route path=":action" element={<MergeAccountsPage />} />
          </Route>

          <Route path="/bridge" element={<BridgePage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
