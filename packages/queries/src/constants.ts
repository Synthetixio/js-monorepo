import { SubgraphEndpoints } from './context';

export const timeSeriesEntityMap = { '1d': 'dailySNXPrices', '15m': 'fifteenMinuteSNXPrices' };

export const GQL_RESPONSE_LIMIT = 999;

export enum Period {
  ONE_HOUR = 'ONE_HOUR',
  FOUR_HOURS = 'FOUR_HOURS',
  ONE_DAY = 'ONE_DAY',
  ONE_WEEK = 'ONE_WEEK',
  ONE_MONTH = 'ONE_MONTH',
}

export const PERIOD_IN_HOURS: Record<Period, number> = {
  ONE_HOUR: 1,
  FOUR_HOURS: 4,
  ONE_DAY: 24,
  ONE_MONTH: 672,
  ONE_WEEK: 168,
};

export type PeriodLabel = {
  period: Period;
  value: number;
  i18nLabel: string;
};

export const PERIOD_LABELS_MAP: Record<Period, PeriodLabel> = {
  ONE_HOUR: {
    period: Period.ONE_HOUR,
    value: PERIOD_IN_HOURS.ONE_HOUR,
    i18nLabel: 'common.chart-periods.1H',
  },
  FOUR_HOURS: {
    period: Period.FOUR_HOURS,
    value: PERIOD_IN_HOURS.FOUR_HOURS,
    i18nLabel: 'common.chart-periods.4H',
  },
  ONE_DAY: {
    period: Period.ONE_DAY,
    value: PERIOD_IN_HOURS.ONE_DAY,
    i18nLabel: 'common.chart-periods.1D',
  },
  ONE_WEEK: {
    period: Period.ONE_WEEK,
    value: PERIOD_IN_HOURS.ONE_WEEK,
    i18nLabel: 'common.chart-periods.1W',
  },
  ONE_MONTH: {
    period: Period.ONE_MONTH,
    value: PERIOD_IN_HOURS.ONE_MONTH,
    i18nLabel: 'common.chart-periods.1M',
  },
};

export const PERIOD_LABELS = Object.values(PERIOD_LABELS_MAP);

export const COUNCIL_NOMINATIONS_URL = 'https://';

export const DEFAULT_SUBGRAPH_ENDPOINTS: { [networkId: number]: SubgraphEndpoints } = {
  1: {
    exchanges: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-exchanges',
    exchanger: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-exchanger',
    issuance: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix',
    subgraph: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/mainnet-main',
  },

  10: {
    exchanges: 'https://api.thegraph.com/subgraphs/name/dbeal-eth/optimism-exchanges2',
    exchanger: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-exchanger',
    issuance: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-issuance',
    subgraph: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-main',
  },
  5: {
    // using main for everything since it includes exchanges, exchanger and issuance
    exchanges: 'https://api.thegraph.com/subgraphs/name/bachstatter/goerli-main',
    exchanger: 'https://api.thegraph.com/subgraphs/name/bachstatter/goerli-main',
    issuance: 'https://api.thegraph.com/subgraphs/name/bachstatter/goerli-main',
    subgraph: 'https://api.thegraph.com/subgraphs/name/bachstatter/goerli-main',
  },
  420: {
    // The graph doesn't support goerli-optimism (so just using goerli for now)
    exchanges: 'https://api.thegraph.com/subgraphs/name/bachstatter/goerli-main',
    exchanger: 'https://api.thegraph.com/subgraphs/name/bachstatter/goerli-main',
    issuance: 'https://api.thegraph.com/subgraphs/name/bachstatter/goerli-main',
    subgraph: 'https://api.thegraph.com/subgraphs/name/bachstatter/goerli-main',
  },

  42: {
    exchanges: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/kovan-exchanges',
    exchanger: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/kovan-exchanger',
    issuance: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/kovan-issuance',
    subgraph: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/kovan-main',
  },
  69: {
    exchanges: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-kovan-exchanges',
    exchanger: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-kovan-exchanger',
    issuance: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-kovan-issuance',
    subgraph: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-kovan-main',
  },
};

// test
