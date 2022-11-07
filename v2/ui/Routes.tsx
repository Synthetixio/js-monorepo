import { ReactNode, FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { safeLazy } from '@synthetixio/safe-import';
import AppLayout from './sections/shared/Layout/AppLayout';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import useLocalStorage from 'hooks/useLocalStorage';
import { BoxProps, Flex } from '@chakra-ui/react';
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
const EscrowPage = safeLazy(() => import(/* webpackChunkName: "escrow" */ './content/EscrowPage'));
const PoolPage = safeLazy(() => import(/* webpackChunkName: "pools" */ './content/PoolsPage'));
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

interface WrapperProps extends BoxProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children, ...props }) => {
  const [STAKING_V2_ENABLED] = useLocalStorage(LOCAL_STORAGE_KEYS.STAKING_V2_ENABLED, false);
  return STAKING_V2_ENABLED ? (
    <Flex flexDirection="column" {...props} maxW="1200px" m="auto">
      <HomeButton marginTop={4} />
      {children}
    </Flex>
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
            </>
          ) : (
            <Route path="/staking" element={<StakingPage />}>
              <Route path=":action" element={<StakingPage />} />
            </Route>
          )}

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
            path="/synths"
            element={
              <Wrapper pb={4}>
                <SynthsPage />
              </Wrapper>
            }
          />

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
              <Wrapper>
                <MigrateEscrowPage />
              </Wrapper>
            }
          />

          <Route
            path="/escrow"
            element={
              <Wrapper>
                <EscrowPage />
              </Wrapper>
            }
          >
            <Route
              path=":action"
              element={
                <Wrapper>
                  <EscrowPage />
                </Wrapper>
              }
            />
          </Route>

          <Route
            path="/history"
            element={
              <Wrapper>
                <HistoryPage />
              </Wrapper>
            }
          />

          <Route
            path="/delegate"
            element={
              <Wrapper>
                <DelegatePage />
              </Wrapper>
            }
          />

          <Route
            path="/merge-accounts"
            element={
              <Wrapper>
                <MergeAccountsPage />
              </Wrapper>
            }
          >
            <Route
              path=":action"
              element={
                <Wrapper>
                  <MergeAccountsPage />
                </Wrapper>
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
