import { FC } from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { LineSpacer } from '@snx-v1/styles';
import TransactionsContainer from 'sections/history/TransactionsContainer';
import StatsSection from 'components/StatsSection';

import StatBox from 'components/StatBox';
import { StakingTransactionType } from 'sections/history/types';
import sortBy from 'lodash/sortBy';

import useSynthetixQueries from '@synthetixio/queries';
import Connector from 'containers/Connector';
import { useFeesClaimed } from '@snx-v2/useFeesClaimed';
import { Flex, Link } from '@chakra-ui/react';
import { ArrowTopRight } from '@snx-v2/icons';

const HistoryPage: FC = () => {
  const { t } = useTranslation();

  const { walletAddress } = Connector.useContainer();

  const { subgraph } = useSynthetixQueries();

  const issues = subgraph.useGetIssueds(
    {
      first: 1000,
      orderBy: 'timestamp',
      orderDirection: 'desc',
      where: { account: walletAddress?.toLowerCase() },
    },
    { id: true, timestamp: true, value: true }
  );

  const burns = subgraph.useGetBurneds(
    {
      first: 1000,
      orderBy: 'timestamp',
      orderDirection: 'desc',
      where: { account: walletAddress?.toLowerCase() },
    },
    { id: true, timestamp: true, value: true }
  );

  const feeClaims = useFeesClaimed();

  const isLoaded = issues.isSuccess && burns.isSuccess && feeClaims.isSuccess;

  const history = isLoaded
    ? sortBy(
        [
          issues.data!.map((d) => ({
            type: StakingTransactionType.Issued,
            hash: d.id.split('-')[0],
            ...d,
          })),
          burns.data!.map((d) => ({
            type: StakingTransactionType.Burned,
            hash: d.id.split('-')[0],
            ...d,
          })),
          feeClaims.data!.map((d) => ({
            type: StakingTransactionType.FeesClaimed,
            hash: d.id.split('-')[0],
            ...d,
          })),
        ].flat(),
        (d) => -d.timestamp.toNumber()
      )
    : [];

  const txCount = history.length;
  return (
    <>
      <Head>
        <title>{t('history.page-title')}</title>
      </Head>
      <StatsSection>
        <div />
        <TxCount title={t('common.stat-box.tx-count')} value={txCount} size="lg" />
        <div />
      </StatsSection>
      <Flex justifyContent="end">
        <Link
          href={`https://dune.com/synthetix_community/fee-burn?address_t29bb9=${walletAddress}`}
          target="_blank"
          color="cyan.500"
          fontSize="12px"
          fontFamily="heading"
        >
          Fee Burn Information <ArrowTopRight ml={1} mb="1px" />
        </Link>
      </Flex>
      <LineSpacer />
      <LineSpacer />
      <LineSpacer />

      <TransactionsContainer history={history} isLoaded={isLoaded} />
    </>
  );
};

const TxCount = styled(StatBox)`
  .value {
    text-shadow: ${(props) => props.theme.colors.blueTextShadow};
    color: ${(props) => props.theme.colors.black};
  }
`;

export default HistoryPage;
