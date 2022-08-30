---
sidebar_position: 1
---

# Staking Collateral

## Opening Staking Positions

Users may stake any of the accepted collateral types into the protocol by depositing collateral and then delegating it to a pool of their choice. This creates a **staking position**.

This staking position will start to assume debt and credit from the markets backed by the pool. Users may also mint and burn snxUSD, increasing and decreasing the debt associated with their staking position. Additional collateral may also be assigned to the staking position by delegating more collateral of the same type to the same pool.

Retrieve information about the accepted collateral types with the [`getCollateralTypes() function`](/protocol/technical-reference/smart-contracts#getcollateraltypes). Users can deposit collateral into their accounts with the [`depositCollateral()` function](/protocol/technical-reference/smart-contracts#depositcollateral). Once collateral has been deposited, users can create a staking position by delegating their collateral to a pool with the [`delegateCollateral()` function](/protocol/technical-reference/smart-contracts#depositcollateral).

_Depositing collateral without delegating it only moves the assets into the protocol._ Deposit and delegate are typically called together using the [Multicall Module](/protocol/technical-reference/smart-contracts#multicall-module).

## Closing Staking Positions

To close (or reduce) a staking position, users must decrease the amount they’ve delegated to a pool. Note that the delegated collateral may only be reduced depending on the debt carried by the position. See [Managing Debt](./managing-debt) for more information.

The [`delegateCollateral()` function](/protocol/technical-reference/smart-contracts#depositcollateral) can be used to decrease the amount of collateral delegated. This will increase the value returned by the [`getAccountAvailableCollateral()` function](/protocol/technical-reference/smart-contracts#getaccountavailablecollateral). This is the maximum amount that can be retrieved from the protocol with the [`withdrawCollateral()` function](/protocol/technical-reference/smart-contracts#withdrawcollateral) or delegating again to another pool.

## Pools

Pools are specified with an integer ID. Every pool has a vault for each of the accepted collateral types. Pools may also have an owner, which can decide which markets will be backed by the collateral delegated to the pool.

### Stablecoin-only Pool

A pool exists at ID `0` which backs no markets and never will (because it has no owner). Staking collateral with this pool is similar to using a standard CDP protocol, where the only functionality is minting and burning snxUSD.

### Preferred Pool

The Spartan Council specifies a _preferred pool_ with an ID that can be retrieved with the [`getPreferredPool()` function](/protocol/technical-reference/smart-contracts#getpreferredpool). This is expected to be a pool owned by the Spartan Council and may receive rewards.

### Approved Pools

The Spartan Council also specifies _approved pools_ with IDs that can be retrieved with the [`getApprovedPools()` function](/protocol/technical-reference/smart-contracts#getapprovedpools). This is expected to be a series of pools owned by the Spartan Council with exposure to different combinations of markets.

### Custom Pools

Pools may be created by anyone. (See [Creating Pools](../pools-vaults/creating-pools).) You may specify a custom pool’s ID when delegating your collateral.

:::caution

Any staking position delegated to a pool could be indirectly liquidated by the owner of the pool. There is always risk, but be especially cautious when using pools that aren’t approved by the Spartan Council.

:::
