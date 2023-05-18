---
sidebar_position: 3
---

# Liquidations

When the collateralization ratio of a particular liquidity position drops below the minimum collateralization ratio for its corresponding collateral type, the position may be liquidated. When this occurs, the collateral and debt associated with the position are distributed among all of the other liquidity position participating in the pool (after a fixed amount of the collateral is provided to the liquidator as an incentive).

Anyone can check if a liquidity position can be liquidated with the [`isLiquidatable` function](/technical-reference/smart-contracts#isliquidatable). If this function returns `true`, then the position may be liquidated with the [`liquidate` function](/technical-reference/smart-contracts#liquidate). The address calling the function will receive `liquidationReward` per the [`getCollateralType` function](/technical-reference/smart-contracts#getcollateraltype) (or all of the position’s collateral if it is less than this amount). This instantaneously distributes the liquidity position's debt and remaining collateral among the other liquidity positions in the pool, pro-rata.
