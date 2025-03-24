import { FC, PropsWithChildren } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from './sections/shared/Layout/AppLayout';
import { Box, Container } from '@chakra-ui/react';
import { HomeButton } from '@snx-v2/HomeButton';
import LoansPage from './content/LoansPage';

// wallet pages
import { WalletLayout } from '@snx-v2/WalletLayout';
import { WalletBalances } from '@snx-v2/WalletBalances';
import EscrowPage from './content/EscrowPage';
import MigrateEscrowPage from './content/MigrateEscrowPage';
import MigrateDebtPage from './content/MigrateDebtPage';
import HistoryPage from './content/HistoryPage';
import DelegatePage from './content/DelegatePage';
import MergeAccountsPage from './content/MergeAccountsPage';
import BridgePage from './content/BridgePage';

import NotFound from './content/404';

import V2Earn from 'content/V2Earn';
import V2HomePage from './content/V2Home';
import V2MintPage from './content/V2Mint';
import V2BurnPage from './content/V2Burn';
import V2UnflagPage from './content/V2Unflag';
import V2SwapLinksPage from './content/V2SwapLinks';
import V2SelfLiquidation from './content/V2SelfLiquidation';
import V2Terms from 'content/V2Terms';
import { TermsModal } from '@snx-v2/TermsModal';
import { SESSION_STORAGE_KEYS } from '@snx-v2/Constants';

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
  <Box bg="navy.900" height="100%" className="v2">
    <Container p={6} bg="navy.900" maxW="1200px">
      <HomeButton />
      {children}
    </Container>
  </Box>
);

const WalletWrapper: FC<PropsWithChildren> = ({ children }) => (
  // <Wrapper>
  <Container pt={6} maxW="1200px" width="100%">
    <Wrapper>
      <WalletLayout>{children}</WalletLayout>
    </Wrapper>
  </Container>
);

export default function AppRoutes() {
  const TERMS_CONDITIONS_ACCEPTED =
    sessionStorage.getItem(SESSION_STORAGE_KEYS.TERMS_CONDITIONS_ACCEPTED) === 'true';
  return (
    <BrowserRouter>
      <AppLayout>
        <TermsModal defaultOpen={!TERMS_CONDITIONS_ACCEPTED} />
        <Routes>
          <Route path="/" element={<V2HomePage />} />
          <Route path="/staking" element={<Navigate to="/staking/mint" />} />
          <Route path="/staking/mint" element={<V2MintPage />} />
          <Route path="/staking/burn" element={<V2BurnPage />} />
          <Route path="/staking/unflag" element={<V2UnflagPage />} />
          <Route path="/staking/swap-links" element={<V2SwapLinksPage />} />
          <Route path="/staking/self-liquidation" element={<V2SelfLiquidation />} />
          <Route path="/earn" element={<V2Earn />} />
          <Route path="/wallet" element={<Navigate to="/wallet/balances" replace={true} />} />
          <Route path="/terms" element={<V2Terms />} />
          <Route
            path="/wallet/balances"
            element={
              <WalletWrapper>
                <WalletBalances />
              </WalletWrapper>
            }
          />

          <Route
            path="/loans"
            element={
              <Wrapper>
                <LoansPage />
              </Wrapper>
            }
          >
            <Route
              path=":action"
              element={
                <Wrapper>
                  <LoansPage />
                </Wrapper>
              }
            />
            <Route
              path=":loanType/:loanId/:loanAction"
              element={
                <Wrapper>
                  <LoansPage />
                </Wrapper>
              }
            />
          </Route>

          <Route
            path="/migrate-escrow"
            element={
              <WalletWrapper>
                <MigrateEscrowPage />
              </WalletWrapper>
            }
          />

          <Route
            path="/migrate-debt"
            element={
              <WalletWrapper>
                <MigrateDebtPage />
              </WalletWrapper>
            }
          />

          <Route
            path="/escrow"
            element={
              <WalletWrapper>
                <EscrowPage />
              </WalletWrapper>
            }
          >
            <Route
              path=":action"
              element={
                <WalletWrapper>
                  <EscrowPage />
                </WalletWrapper>
              }
            />
          </Route>

          <Route
            path="/history"
            element={
              <WalletWrapper>
                <HistoryPage />
              </WalletWrapper>
            }
          />

          <Route
            path="/delegate"
            element={
              <WalletWrapper>
                <DelegatePage />
              </WalletWrapper>
            }
          />

          <Route
            path="/merge-accounts"
            element={
              <WalletWrapper>
                <MergeAccountsPage />
              </WalletWrapper>
            }
          >
            <Route
              path=":action"
              element={
                <WalletWrapper>
                  <MergeAccountsPage />
                </WalletWrapper>
              }
            />
          </Route>

          <Route
            path="/bridge"
            element={
              <Wrapper>
                <BridgePage />
              </Wrapper>
            }
          />

          <Route
            path="*"
            element={
              <Wrapper>
                <NotFound />
              </Wrapper>
            }
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
