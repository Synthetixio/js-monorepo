import { FC, PropsWithChildren } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { safeLazy } from '@synthetixio/safe-import';
import AppLayout from './sections/shared/Layout/AppLayout';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import useLocalStorage from 'hooks/useLocalStorage';
import { Box, Container } from '@chakra-ui/react';
import { HomeButton } from '@snx-v2/HomeButton';
import V2Earn from 'content/V2Earn';

import DashboardPage from './content/DashboardPage';
import SynthsPage from './content/SynthsPage';
import StakingPage from './content/StakingPage';
import LoansPage from './content/LoansPage';

// gov is heavy, leave it async
const GovPage = safeLazy(() => import(/* webpackChunkName: "gov" */ './content/GovPage'));

import EarnPage from './content/EarnPage';
import DebtPage from './content/DebtPage';
import PoolPage from './content/PoolsPage';

// wallet pages
import { WalletLayout } from '@snx-v2/WalletLayout';
import { WalletBalances } from '@snx-v2/WalletBalances';
import EscrowPage from './content/EscrowPage';
import MigrateEscrowPage from './content/MigrateEscrowPage';
import HistoryPage from './content/HistoryPage';
import DelegatePage from './content/DelegatePage';
import MergeAccountsPage from './content/MergeAccountsPage';
import BridgePage from './content/BridgePage';

import NotFound from './content/404';

import V2HomePage from './content/V2Home';
import V2MintPage from './content/V2Mint';
import V2BurnPage from './content/V2Burn';
import V2UnflagPage from './content/V2Unflag';
import V2SwapLinksPage from './content/V2SwapLinks';
import V2SelfLiquidation from './content/V2SelfLiquidation';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  const [STAKING_V2_ENABLED] = useLocalStorage(LOCAL_STORAGE_KEYS.STAKING_V2_ENABLED, true);
  return STAKING_V2_ENABLED ? (
    <Box bg="navy.900" height="100%" className="v2">
      <Container pt={8} pb={16} bg="navy.900" maxW="4xl">
        <HomeButton />
        {children}
      </Container>
    </Box>
  ) : (
    <>{children}</>
  );
};

const WalletWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [STAKING_V2_ENABLED] = useLocalStorage(LOCAL_STORAGE_KEYS.STAKING_V2_ENABLED, true);
  return STAKING_V2_ENABLED ? (
    <Wrapper>
      <WalletLayout>{children}</WalletLayout>
    </Wrapper>
  ) : (
    <>{children}</>
  );
};

export default function AppRoutes() {
  const [STAKING_V2_ENABLED] = useLocalStorage(LOCAL_STORAGE_KEYS.STAKING_V2_ENABLED, true);
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
              <Route path="/staking/unflag" element={<V2UnflagPage />} />
              <Route path="/staking/swap-links" element={<V2SwapLinksPage />} />
              <Route path="/staking/self-liquidation" element={<V2SelfLiquidation />} />
              <Route path="/earn" element={<V2Earn />} />
              <Route path="/wallet" element={<Navigate to="/wallet/balances" replace={true} />} />
              <Route
                path="/wallet/balances"
                element={
                  <WalletWrapper>
                    <WalletBalances />
                  </WalletWrapper>
                }
              />
            </>
          ) : (
            <>
              <Route path="/staking" element={<StakingPage />}>
                <Route path=":action" element={<StakingPage />} />
              </Route>
              <Route
                path="/earn"
                element={
                  <Wrapper>
                    <EarnPage />
                  </Wrapper>
                }
              >
                <Route
                  path=":pool"
                  element={
                    <Wrapper>
                      <EarnPage />
                    </Wrapper>
                  }
                >
                  <Route
                    path=":action"
                    element={
                      <Wrapper>
                        <EarnPage />
                      </Wrapper>
                    }
                  />
                </Route>
              </Route>
              <Route path="/wallet" element={<Navigate to="/synths" replace={true} />} />
              <Route path="/wallet/balances" element={<Navigate to="/synths" replace={true} />} />
            </>
          )}
          <Route
            path="/synths"
            element={
              <Wrapper>
                <SynthsPage />
              </Wrapper>
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
            path="/gov"
            element={
              <Wrapper>
                <GovPage />
              </Wrapper>
            }
          >
            <Route
              path=":spaceKey/:panel"
              element={
                <Wrapper>
                  <GovPage />
                </Wrapper>
              }
            />
          </Route>

          <Route
            path="/earn"
            element={
              <Wrapper>
                <EarnPage />
              </Wrapper>
            }
          >
            <Route
              path=":pool"
              element={
                <Wrapper>
                  <EarnPage />
                </Wrapper>
              }
            >
              <Route
                path=":action"
                element={
                  <Wrapper>
                    <EarnPage />
                  </Wrapper>
                }
              />
            </Route>
          </Route>

          <Route path="/debt" element={<Navigate to="/debt/overview" replace={true} />} />
          <Route path="/debt/manage" element={<Navigate to="/debt/manage/buy" replace={true} />} />
          <Route
            path="/debt/:activeTab"
            element={
              <Wrapper>
                <DebtPage />
              </Wrapper>
            }
          />
          <Route
            path="/debt/:activeTab/:action"
            element={
              <Wrapper>
                <DebtPage />
              </Wrapper>
            }
          />

          <Route
            path="/migrate-escrow"
            element={
              <WalletWrapper>
                <MigrateEscrowPage />
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
              <WalletWrapper>
                <BridgePage />
              </WalletWrapper>
            }
          />
          <Route
            path="/pools/weth-snx"
            element={
              <Wrapper>
                <PoolPage />
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
