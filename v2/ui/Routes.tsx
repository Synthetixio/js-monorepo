import { FC, PropsWithChildren } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { safeLazy } from '@synthetixio/safe-import';
import AppLayout from './sections/shared/Layout/AppLayout';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import useLocalStorage from 'hooks/useLocalStorage';
import { Box, Container } from '@chakra-ui/react';
import { HomeButton } from '@snx-v2/HomeButton';

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
const PoolPage = safeLazy(() => import(/* webpackChunkName: "pools" */ './content/PoolsPage'));

const WalletLayout = safeLazy(() =>
  import(/* webpackChunkName: "wallet" */ '@snx-v2/WalletLayout').then(({ WalletLayout }) => ({
    default: WalletLayout,
  }))
);
const WalletBalances = safeLazy(() =>
  import(/* webpackChunkName: "wallet" */ '@snx-v2/WalletBalances').then(({ WalletBalances }) => ({
    default: WalletBalances,
  }))
);
const EscrowPage = safeLazy(() => import(/* webpackChunkName: "wallet" */ './content/EscrowPage'));

const MigrateEscrowPage = safeLazy(
  () => import(/* webpackChunkName: "wallet" */ './content/MigrateEscrowPage')
);
const HistoryPage = safeLazy(
  () => import(/* webpackChunkName: "wallet" */ './content/HistoryPage')
);
const DelegatePage = safeLazy(
  () => import(/* webpackChunkName: "wallet" */ './content/DelegatePage')
);
const MergeAccountsPage = safeLazy(
  () => import(/* webpackChunkName: "wallet" */ './content/MergeAccountsPage')
);
const BridgePage = safeLazy(() => import(/* webpackChunkName: "wallet" */ './content/BridgePage'));

const NotFound = safeLazy(() => import(/* webpackChunkName: "404" */ './content/404'));

const V2HomePage = safeLazy(() => import(/* webpackChunkName: "v2-home" */ './content/V2Home'));
const V2MintPage = safeLazy(() => import(/* webpackChunkName: "v2-mint" */ './content/V2Mint'));
const V2BurnPage = safeLazy(() => import(/* webpackChunkName: "v2-burn" */ './content/V2Burn'));
const V2UnflagPage = safeLazy(
  () => import(/* webpackChunkName: "v2-unflag" */ './content/V2Unflag')
);
const V2SwapLinksPage = safeLazy(
  () => import(/* webpackChunkName: "v2-swap-links" */ './content/V2SwapLinks')
);
const V2SelfLiquidation = safeLazy(
  () => import(/* webpackChunkName: "v2-self-liquidation" */ './content/V2SelfLiquidation')
);

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  const [STAKING_V2_ENABLED] = useLocalStorage(LOCAL_STORAGE_KEYS.STAKING_V2_ENABLED, false);
  return STAKING_V2_ENABLED ? (
    <Box bg="navy.900" height="100%" className="v2">
      <Container pt={4} pb={16} bg="navy.900" maxW="4xl">
        <HomeButton />
        {children}
      </Container>
    </Box>
  ) : (
    <>{children}</>
  );
};

const WalletWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [STAKING_V2_ENABLED] = useLocalStorage(LOCAL_STORAGE_KEYS.STAKING_V2_ENABLED, false);
  return STAKING_V2_ENABLED ? (
    <Wrapper>
      <WalletLayout>{children}</WalletLayout>
    </Wrapper>
  ) : (
    <>{children}</>
  );
};

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
              <Route path="/staking/unflag" element={<V2UnflagPage />} />
              <Route path="/staking/swap-links" element={<V2SwapLinksPage />} />
              <Route path="/staking/self-liquidation" element={<V2SelfLiquidation />} />
              <Route path="/wallet" element={<Navigate to="/wallet/balances" replace={true} />} />
              <Route
                path="/wallet/balances"
                element={
                  <Wrapper>
                    <WalletLayout>
                      <WalletBalances />
                    </WalletLayout>
                  </Wrapper>
                }
              />
            </>
          ) : (
            <Route path="/staking" element={<StakingPage />}>
              <Route path=":action" element={<StakingPage />} />
            </Route>
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

          <Route
            path="/debt"
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
