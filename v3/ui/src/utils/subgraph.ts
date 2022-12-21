import { wei } from '@synthetixio/wei';

export const getSubgraphUrl = (networkName = 'goerli') =>
  `https://api.thegraph.com/subgraphs/name/snx-v3/${networkName}`;
export const formatGraphBigDecimal = wei;
