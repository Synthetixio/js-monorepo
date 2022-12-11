import { BigNumber } from 'ethers';

export const calculateMarketPnl = (netIssuance: BigNumber, reportedDebt: BigNumber) =>
  reportedDebt.add(netIssuance).mul(-1);
