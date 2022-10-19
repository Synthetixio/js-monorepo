import { BigNumber } from 'ethers';
import { chains } from './constants';

export type CollateralType = {
  address: string;
  symbol: string;
  logoURI: string;
  decimals: number;
  targetCRatio?: BigNumber;
  minimumCRatio?: BigNumber;
  price?: BigNumber;
  priceDecimals?: number;
  priceFeed?: string;
};

export type ChainName = keyof typeof chains;

export type StakingPositionType = {
  id: string;
  accountId: string;
  poolId: string;
  poolName: string;
  collateralAmount: BigNumber;
  collateralType: CollateralType;
  cRatio: BigNumber;
  debt: BigNumber;
};
