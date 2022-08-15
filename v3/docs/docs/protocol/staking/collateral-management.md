---
sidebar_position: 2
---

# Collateral Management

Accounts stake collateral in the Synthetix system to back synthetic assets. The collateral staked by account determines how much votig power it controls. Accounts have granular control over how their collateral can be used in the system. Optionally, specified amounts of collateral can be delegated to funds (with or without leverage) and locked for additional voting power.

## Accepted Collateral

Governance determines which types of collateral are accepted. Each type of accepted collateral must specify each of the following:

- Token - The address of an ERC-20 contract for this asset.
- Price Feed - The address of a contract (which implements the `IPrice` interface) that provides the current price of this asset.
- Minimum Collateralization Ratio - The minimum collateralzation ratio required for this type of collateral, as a percentage.
- Minting Buffer - How close to the minimum can you get to the MCR by minting sUSD.
- Leverage Cap -
- Voting Power Modifier - A multiplier applied to voting power derived from staking this asset.

## Funds

An account’s collateral can be delegated to a fund. Funds determine a staking position (the markets this collateral backs), which determines the debt exposure, fees, and rewards accrued by this account. Accounts can alter which funds they’ve delegated their collateral to at any time.

### Leverage

If an account’s collateral is delegated to a fund, it can have leverage applied. Increased leverage results in proportionally greater debt exposure, fees, and rewards accrued by the account.

## Locking

Accounts can accrue additional voting power by locking their collateral. The increase is proprotional to duration of the lock. Locked collateral cannot be unstaked.

### Unlocking

Accounts can unlock collateral early, but they incur a penalty. The penalty, determined by governance, is a percentage of locked collateral which is instanteously liquidated.

## Voting Power

The voting power provided to an account is determined by adding together the following value across all types and configurations of collateral staked by the account: `collateralValue*collateralModifier*lockModifier`
