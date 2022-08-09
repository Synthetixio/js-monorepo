import { BigNumber } from 'ethers';
import { CollateralType } from '../../../utils/types';

export type StakingPositionOnChainType = {
  accountId: BigNumber;
  collateralType: string;
  fundId: BigNumber;
  collateralAmount: BigNumber;
  shares: BigNumber;
  initialDebt: BigNumber;
  leverage: BigNumber;
};

// This is a view of each LiquidityItem (https://github.com/Synthetixio/synthetix-v3/blob/feature-v3-mvp/packages/synthetix-main/contracts/interfaces/IFundModuleStorage.sol)
// (We should consider consistent naming for this and the front-end.)
// All LiquidityItems associated with the account can be retrieved by calling "getAccountLiquidityItems(accountId)" (Other related views are available: https://github.com/Synthetixio/synthetix-v3/blob/feature-v3-mvp/packages/synthetix-main/contracts/modules/FundModule.sol#L634)
export type StakingPositionType = {
  // This is the ID on of the LiquidityItem struct. (I think this needs to be added? Seems good to have.)
  id?: number;

  // This is the fundId on the LiquidityItem struct
  fundId: BigNumber;

  // This would be retrieved from recoil most likely. We'll probably want a similar set up to CollateralTypes for the Preferred/Approved funds.
  fundName: string;

  // This is the collateralAmount on the LiquidityItem struct
  collateralAmount: BigNumber;

  // This is retrieved from recoil collateralType storage.
  collateralType: CollateralType;

  // This is the amount of debt accrued from minting/burning sUSD from this fund. This could be negative. (I think this needs to be added?)
  loanDebt?: number;

  // This is a function of "shares" and "initialDebt" (initialDebt could be negative) from the LiquidityItem struct and the fund's total debt and total debt shares. The latter will probably be made available in recoil, per above.
  marketDebt?: number;
};
