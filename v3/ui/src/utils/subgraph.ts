import { parseEther } from 'ethers/lib/utils';

export const getSubgraphUrl = (networkName = 'goerli') =>
  `https://api.thegraph.com/subgraphs/name/snx-v3/${networkName}`;
export const formatGraphBigDecimal = parseEther;
