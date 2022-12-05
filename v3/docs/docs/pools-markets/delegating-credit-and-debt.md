---
sidebar_position: 1
---

# Delegating Credit & Debt

Pools distribute credit and debt between stakers and markets. Every pool has a vault for each of the accepted collateral types. A pool's owner can decide which market to provide with liquidity.

## Creating Pools

Pools may be created using the [`createPool` function](/technical-reference/smart-contracts#createpool). Ownership can then be transferred with the [`nominatePoolOwner`](/technical-reference/smart-contracts#nominatepoolowner) and [`acceptPoolOwnership`](/technical-reference/smart-contracts#acceptpoolownership) functions. Ownership may also be renounced with the [`renouncePoolNomination`](/technical-reference/smart-contracts#renouncepoolnomination), effectively locking the pool's configuration.

Pools may also have human-readable names stored on-chain, which can be set by the owner using the [`setPoolName` function](/technical-reference/smart-contracts#setpoolname) and retrieved with the [`getPoolName` function](/technical-reference/smart-contracts#getpoolname).

## Configuring Pools

The owner of a pool may choose the markets to back (with their corresponding **weights** and **maximum debt share value**) using the [`setPoolConfiguration` function](/technical-reference/smart-contracts#setpoolconfiguration).

Fundamentally, this configuration effects the credit capacity provided to each market. This determines how much debt the pool is willing to assume from markets and how to limit the amount of stablecoins that markets can withdraw.

### Calculating Credit Capacity

**Weights** determine what proportion of the liquidity in a particular pool should be allocated to each market. For example, if a pool has $500,000 of liquidity with a weight of 3 assigned to an sBTC market and a weight 1 assigned to an sEUR market, the credit capacity provided to these markets would be $375,000 and $125,000, respectively.

The credit capacity is then reduced based on the **maximum debt share value**. For instance, if the credit capacity derived from the weights is $100 and the maximum debt share value is set to $0.75, the actual credit capacity provided to the market would be $75.

Note that the maximum debt share value will not be greater than a maximum debt share value calculated based on a global **minimum liquidity ratio**. For instance, if the credit capacity derived from the weights is $100 and the minimum liquidity ratio is set to 400%, the actual credit capacity provided to the market would never be greater than $25 (regardless of the maximum debt share value specified by the pool owner).

### Available Credit

The credit available to a market is calculated by taking the total credit capacity provided to it across all pools, subtracting its amount of `reportedDebt()` and its net issuance (i.e. the amount of stablecoins it has minted minus the amount it has burned). This is the maximum amount of stablecoins it is allowed to withdraw. If it begins to report debt such that its available credit drops below 0, the market becomes insolvent and positions which are backing this market no longer accrue debt.

_See the [liquidity distribution overview](/technical-reference/liquidity-distribution) for more technical details on the how delegation is calculated._
