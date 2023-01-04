import { BigNumber } from 'ethers';

export type CollateralType = {
  depositingEnabled: boolean;
  issuanceRatioD18: BigNumber;
  liquidationRatioD18: BigNumber;
  liquidationRewardD18: BigNumber;
  minDelegationD18: BigNumber;
  oracleNodeId: string;
  tokenAddress: `0x${string}`;
  symbol: string;
  price?: BigNumber;
  logo: string;
};

export type LiquidityPositionType = {
  id: string;
  accountId: string;
  poolId: string;
  poolName: string;
  collateralAmount: BigNumber;
  collateralType: CollateralType;
  cRatio: BigNumber;
  debt: BigNumber;
};
