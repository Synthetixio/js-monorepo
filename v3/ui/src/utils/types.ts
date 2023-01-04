import { CollateralType } from '@snx-v3/useCollateralTypes';
import { BigNumber } from 'ethers';

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
