import { FC, useMemo } from 'react';
import Wei from '@synthetixio/wei';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import ROUTES from 'constants/routes';
import { CryptoCurrency } from 'constants/currency';
import media from '@snx-v1/media';
import useFeePeriodTimeAndProgress from 'hooks/useFeePeriodTimeAndProgress';
import IncentivesTable, { NOT_APPLICABLE } from './IncentivesTable';
import ClaimTab from './ClaimTab';
import LiquidationTab from './LiquidationTab';
import { Tab } from './types';
import { DesktopOrTabletView } from 'components/Media';
import Connector from 'containers/Connector';
import { useGetTVL } from 'hooks/useGetTVL';

type IncentivesProps = {
  tradingRewards: Wei;
  stakingRewards: Wei;
  totalRewards: Wei;
  liquidationRewards: Wei;
  stakingAPR: Wei;
  stakedAmount: Wei;
  hasClaimed: boolean;
  refetchAllRewards: () => void;
};

const VALID_TABS = Object.values(Tab);

const Incentives: FC<IncentivesProps> = ({
  tradingRewards,
  stakingRewards,
  totalRewards,
  stakingAPR,
  stakedAmount,
  hasClaimed,
  liquidationRewards,
  refetchAllRewards,
}) => {
  const { t } = useTranslation();

  const { isWalletConnected } = Connector.useContainer();
  const tvlQuery = useGetTVL();

  const { nextFeePeriodStarts, currentFeePeriodStarted } = useFeePeriodTimeAndProgress();

  const now = useMemo(() => new Date().getTime(), []);

  const { pool } = useParams();
  const activeTab = isWalletConnected && VALID_TABS.includes(pool as Tab) ? (pool as Tab) : null;

  const incentives = useMemo(
    () =>
      isWalletConnected
        ? [
            {
              title: t('earn.incentives.options.snx.title'),
              subtitle: t('earn.incentives.options.snx.subtitle'),
              apr: stakingAPR,
              tvl: tvlQuery.data,
              staked: {
                balance: stakedAmount,
                asset: CryptoCurrency.SNX,
                ticker: CryptoCurrency.SNX,
              },
              rewards: stakingRewards,
              periodStarted: currentFeePeriodStarted.getTime(),
              periodFinish: nextFeePeriodStarts.getTime(),
              claimed: hasClaimed,
              now,
              tab: Tab.Claim,
              route: ROUTES.Earn.Claim,
            },
            {
              title: t('earn.incentives.options.liquidations.title'),
              subtitle: t('earn.incentives.options.liquidations.subtitle'),
              apr: undefined,
              tvl: tvlQuery.data,
              staked: {
                balance: stakedAmount,
                asset: CryptoCurrency.SNX,
                ticker: CryptoCurrency.SNX,
              },
              rewards: liquidationRewards,
              periodStarted: 0,
              periodFinish: Number.MAX_SAFE_INTEGER, // trick it to never expire
              claimed: NOT_APPLICABLE,
              now,
              route: ROUTES.Earn.LIQUIDATION_REWARDS,
              tab: Tab.LIQUIDATION_REWARDS,
              neverExpires: true,
            },
          ]
        : [],
    [
      isWalletConnected,
      t,
      stakingAPR,
      tvlQuery.data,
      stakedAmount,
      stakingRewards,
      currentFeePeriodStarted,
      nextFeePeriodStarts,
      hasClaimed,
      now,
      liquidationRewards,
    ]
  );

  const incentivesTable = (
    <IncentivesTable activeTab={activeTab} data={incentives} isLoaded={true} />
  );

  return activeTab === null ? (
    <>{incentivesTable}</>
  ) : (
    <Container>
      <DesktopOrTabletView>{incentivesTable}</DesktopOrTabletView>
      <TabContainer>
        {activeTab === Tab.Claim && (
          <ClaimTab
            tradingRewards={tradingRewards}
            stakingRewards={stakingRewards}
            totalRewards={totalRewards}
            refetchAllRewards={refetchAllRewards}
            hasClaimed={hasClaimed}
          />
        )}
        {activeTab === Tab.LIQUIDATION_REWARDS && (
          <LiquidationTab
            liquidationRewards={liquidationRewards}
            refetchAllRewards={refetchAllRewards}
          />
        )}
      </TabContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.navy};
  display: grid;
  ${media.greaterThan('md')`
    display: grid;
    grid-template-columns: 1fr 2fr;
  `}
`;

const TabContainer = styled.div`
  background-color: ${(props) => props.theme.colors.navy};
  min-height: 380px;
`;

export default Incentives;
