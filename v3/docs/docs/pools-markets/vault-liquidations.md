---
sidebar_position: 2
---

# Vault Liquidations

It is possible for an entire vault to be liquidated. This may occur when the ratio of the value of all the collateral it contains relative to the value of all of the debt it’s responsible for drops below the Minimum C-Ratio for it's corresponding collateral type. This is a scenario where sequentially performing a standard [liquidation](/liquidity-positions/liquidations) on each of the liquidity positions would result in the last remaining position still having a collateralization ratio below the minimum.

In this case, anyone can wind down this vault by repaying some or all of its debt with snxUSD and receiving a proportional share of the collateral held in the vault. Because this can occur the moment the vault's C-Ratio drops below the minimum while still above 100%, liquidators are incentivized to restore the health of the system by receiving collateral worth more than the debt they are repaying. The liquidated collateral is seized from all of the liquidity positions in the vault pro-rata.

To perform a vault liquidation, anyone can call the [`liquidateVault` function](/technical-reference/smart-contracts#liquidatevault). The `poolId` and `collateralType` parameters specify the vault to liquidate. The `liquidateAsAccountId` parameter specifies an account which should receive the collateral. (It can then be delegated to a pool, or retrieved from the system using the [`withdrawCollateral()` function](/technical-reference/smart-contracts#withdrawcollateral).) The `maxUsd` parameter specifies the maximum amount of snxUSD that will be transferred from `msg.sender` to perform the liquidation. If `maxUsd` is less than the total debt carried by the vault, a partial liquidation will occur.
