---
sidebar_position: 2
---

# Managing Debt

## Collateralization Ratio

Each staking position has a collateralization ratio (or _C-Ratio_). This represents the relationship between the value of the collateral associated with the staking position and the amount of the debt it’s backing. This is represented as a percentage. For example, a C-Ratio of 200% means that the value of the collateral is double the amount of debt it’s backing.

The value of the collateral is calculated based on the price of the collateral reported by an oracle. The value of the debt is the amount of snxUSD minted with this staking position, minus the amount of snxUSD burned with this position, plus/minus the debt/credit it is responsible for by participating in a pool.

**If a staking position’s collateralization ratio falls below its minimum collateralization, the position can be [liquidated](/protocol/staking-positions/liquidations).** To reduce risk of liquidation, collateralization ratios can be increased by staking additional collateral or burning snxUSD.

A position’s collateral, debt, and resulting C-Ratio can be retrieved with the [`getPositionCollateral`](/protocol/technical-reference/smart-contracts#getpositioncollateral), [`getPositionDebt`](/protocol/technical-reference/smart-contracts#getpositiondebt), and [`getPositionCollateralizationRatio`](/protocol/technical-reference/smart-contracts#getpositioncollateralizationratio) functions, respectively.

The [`getPositionCollateralizationRatio` function](/protocol/technical-reference/smart-contracts#getpositioncollateralizationratio) returns the C-Ratio of the specified staking position. (If the position has more credit than debt, this function returns `0`.) The minimum C-Ratio of a given collateral type can be retrieved with the [`getCollateralType` function](/protocol/technical-reference/smart-contracts#getcollateraltype). All of these values are represented as an integer with 18 decimal places.

All of the functions which reference a position’s debt (such as `getPositionDebt` and `getPositionCollateralizationRatio`) may update cached values in the system, so they are not declared as `view` functions. To use them as such, they can be queried using [`callStatic`](https://docs.ethers.io/v5/single-page/#/v5/api/contract/contract/-%23-contract-callStatic). All values returned by the system will be accurate regardless of the recency of a cache update.

## Mint and Burn snxUSD

Stakers can mint snxUSD, a fully decentralized stablecoin backed by the collateral they’ve deposited. This is effectively taking out an interest-free loan, where each minted snxUSD token increases the debt of the position by $1. snxUSD is a fully compliant ERC-20 token which can be exchanged freely and used with markets backed by the Synthetix protocol. snxUSD is minted by calling the [`mintUsd` function](/protocol/technical-reference/smart-contracts#mintusd).

Stakers may not mint snxUSD such that their position’s collateralization ratio drops below the _Target C-Ratio_. (The Target C-Ratio of a given collateral type can be retrieved with the [`getCollateralType` function](/protocol/technical-reference/smart-contracts#getcollateraltype), represented as an integer with 18 decimal places.)

snxUSD can also be repaid to the protocol by burning it. This decreases the debt of a position by $1 per snxUSD burned, regardless of whether this debt was accrued from minting sUSD or from debt delegated by a pool. snxUSD is burned by calling the [`burnUsd` function](/protocol/technical-reference/smart-contracts#burnusd).
