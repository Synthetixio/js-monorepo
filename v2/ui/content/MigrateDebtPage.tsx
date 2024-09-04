import { FC } from 'react';
import Head from 'react-helmet';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { DEFAULT_SUBGRAPH_ENDPOINTS, useGetSNXHolderById } from '@synthetixio/queries';
import Main from 'sections/migrate-debt/migrate';
import StatBox from 'components/StatBox';
import { LineSpacer } from '@snx-v1/styles';
import StatsSection from 'components/StatsSection';
import { useDebtData } from '@snx-v2/useDebtData';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { formatCryptoCurrency } from 'utils/formatters/number';
import Connector from 'containers/Connector';
import { DeprecationBanner } from '../../components/DeprecationBanner/DeprecationBanner';
import { Box } from '@chakra-ui/react';

const TEN_MINUTES_MS = 1000 * 10 * 60;
const SNX_HEADER_DECIMALS = 2;

const L2MigrateDebtPage: FC = () => {
  const { isL2, walletAddress } = Connector.useContainer();
  const subgraphWalletAddress = walletAddress?.toLowerCase() ?? '';

  const { t } = useTranslation();

  const { data: debtData } = useDebtData();

  const subgraphHolderQuery = useGetSNXHolderById(
    DEFAULT_SUBGRAPH_ENDPOINTS[NetworkIdByName['mainnet-ovm']].subgraph,
    { id: subgraphWalletAddress },
    { id: true, collateral: true },
    {
      queryKey: ['getSNXHolder', subgraphWalletAddress],
      enabled: !isL2 && !!subgraphWalletAddress,
      staleTime: TEN_MINUTES_MS,
      cacheTime: TEN_MINUTES_MS,
    }
  );

  return (
    <>
      <Head>
        <title>{t('migrate-debt.actions.migrate.title')}</title>
      </Head>

      <DeprecationBanner action="Debt Migration" />

      <Box position="relative">
        <Box
          background="navy.900"
          opacity="50%"
          position="absolute"
          width="100%"
          height="100%"
        />
        <StatsSection>
          <Collateral
            title={t('common.stat-box.collateral-l1')}
            value={formatCryptoCurrency(debtData?.collateral ?? 0, {
              minDecimals: SNX_HEADER_DECIMALS,
              maxDecimals: SNX_HEADER_DECIMALS,
            })}
          />
          <DebtBalance
            title={t('common.stat-box.active-debt')}
            value={formatCryptoCurrency(debtData?.debtBalance ?? 0, {
              minDecimals: SNX_HEADER_DECIMALS,
              maxDecimals: SNX_HEADER_DECIMALS,
              sign: '$',
            })}
            size="lg"
          />
          <Collateral
            title={t('common.stat-box.collateral-l2')}
            value={formatCryptoCurrency(subgraphHolderQuery.data?.collateral ?? 0, {
              minDecimals: SNX_HEADER_DECIMALS,
              maxDecimals: SNX_HEADER_DECIMALS,
            })}
          />
        </StatsSection>
        <LineSpacer />
        <Main />
      </Box>
    </>
  );
};

const Collateral = styled(StatBox)`
  .title {
    color: ${(props) => props.theme.colors.green};
  }
`;

const DebtBalance = styled(StatBox)`
  .title {
    color: ${(props) => props.theme.colors.green};
  }
  .value {
    text-shadow: ${(props) => props.theme.colors.greenTextShadow};
    color: #073124;
  }
`;

export default L2MigrateDebtPage;
