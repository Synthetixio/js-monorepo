---
sidebar_position: 1
---

# Delegating Credit & Debt

Pools consolidate liquidity from stakers and markets' credit and debt. Every pool has a vault for each of the accepted collateral types. Pools may also have an owner, which can decide which markets will be backed by the collateral delegated to the pool.

Credit and debt is propagated between staking positions and pools, and between pools and markets with the [Shares Library](/protocol/peripheral/shares-library), taking into account the pool's configuration.

## Creating Pools

Anyone can create a pool using the [`createPool` function](/protocol/technical-reference/smart-contracts#createpool). Ownership can then be transferred with the [`nominatePoolOwner`](/protocol/technical-reference/smart-contracts#nominatepoolowner) and [`acceptPoolOwnership`](/protocol/technical-reference/smart-contracts#acceptpoolownership) functions.

Optionally, pools have human-readable names stored on-chain, which can be set by the owner using the [`setPoolName` function](/protocol/technical-reference/smart-contracts#setpoolname) and retrieved with the [`getPoolName` function](/protocol/technical-reference/smart-contracts#getpoolname).

## Pool Configuration

The owner of a pool may choose the markets to back (with their corresponding **weights** and **maximum debt per dollar of collateral**) with the [`setPoolConfiguration` function](/protocol/technical-reference/smart-contracts#setpoolconfiguration).

Fundamentally, this configuration effects a `marketCollateral` and `amountWithdrawable` value for each market. This determines how much debt the pool is willing to assume from market, and how to limit the amount of snxUSD that markets can withdraw.

### Weights

Weights determine what proportion of the liquidity in a particular pool should be allocated to each market. For example, if a pool has $500,000 of liquidity with a weight of 3 assigned to an sBTC market and a weight 1 assigned to an sEUR market, the `marketCollateral` for the markets would be $375,000 and $125,000, respectively.

### Maximum debt per dollar of collateral

The maximum debt per dollar of collateral determines the maximum debt the stakers in a pool are willing to assume from a given market. The **maximum debt** is calculated by multiplying the maximum debt per dollar of collateral by `marketCollateral`. For example, a pool may have $100 of `marketCollateral` and a maximum debt per dollar of collateral of $0.5. This would mean the maximum debt from this pool would be $50.

## Minimum Liquidity Ratio

The Minimum Liquidity Ratio is a global value (configured by SCCP) which is functionally similar to the Target C-Ratio. This creates another **maximum debt** value. For example, if a market has $100 of `marketCollateral` from a pool and the Minimum Liquidity Ratio is set to 400%, the maximum debt from this pool would be $25.

## Calculating `amountWithdrawable`

To calculate the `amountWithdrawable` of a given market, the protocol takes the lesser of the two **maximum debt** values described above across each pool delegating to a given market and returns the sum.
