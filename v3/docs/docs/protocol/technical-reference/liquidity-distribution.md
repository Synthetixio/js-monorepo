---
sidebar_position: 1
---

# Liquidity Distribution Overview

This is a work-in-progress document that contains a technical explanation of how credit and debt is propagated through the Synthetix protocol.

## Chain Nodes

- Market
  - `poolsDebtDistribution` (dynamic, connects to distribution chain)
    - shares (usd denominated) = distribution[poolId]
    - valuePerShare = debt / liquidity
- Pool
  - `vaultsDebtDistribution` (dynamic, connects to debt distribution chain)
    - shares (usd liquidity) = distribution[vaultId]
    - valuePerShare = debt / liquidity
- Vault
  - `accountsIncomingDebtDistribution` (dynamic, connects to debt distribution chain)
    - shares (usd liquidity) = distribution[accountId]
    - valuePerShare = debt / liquidity
  - `accountsConsolidatedDebtDistribution` (static)
    - _t.c._
  - `accountsCollateralDistribution` (static)
    - _t.c._

## Example Liquidity Flows

This outlines how debt is propagated from a market, through pools, to accounts' positions in vaults.

- For each of its configured markets…
  - Get `acumMarketDebt` from the market (external to distribution chain)
  - Market to Pool
    - Pass the debt to all associated pools with `market.poolsDebtDistribution.distributeValue(acumMarketDebt)`
    - Update the pool’s shares on `market.poolsDebtDistribution` by
      - `acumPoolDebt` = `market.poolsDebtDistribution.setActorShares(poolId, newLiquidity)`
  - Pool to Vault
    - Pass the debt to all associated vaults `pool.vaultsDebtDistribtion.distributeValue(acumPoolDebt)`
    - Update the vault’s shares on `pool.vaultsDebtDistribution` by
      - `acumVaultDebt` = `pool.vaultsDebtDistribution.setActorShares(vaultId, newLiquidity)`
  - Vault to Account
    - Pass the debt to all associated accounts `vault.accountsDebtDistribtion.distributeValue(acumVaultDebt)`
    - Update the account’s shares on `vault.accountsDebtDistribution` by
      - `acumAccountDebt` = `vault.accountsDebtDistribution.setActorShares(accountId, newLiquidity)`
  - Account to Consolidated debt of the account
    - `vault.consolidatedDebtDistribution.setActorValue(acumAccountDebt + prevAccountDebt)`

## Objects

- Pool
  - `distributeDebtToVaults()`
    - calls `Market.rebalance()`, which returns a change in value
    - Accumulates each market’s change in value in `cumulativeDebtChange`
    - Bakes `cumulativeDebtChange` into `pool.vaultsDebtDistribution.distributeValue(cumulativeDebtChange)`
- Market
  - `rebalancePools()`
    - calls `distributeDebtToPools()` - i.e. inflates the debt for all pools
    - calls `adjustPoolShares()`, which returns a change in value
    - returns the change in value
  - `adjustPoolShares()`
    - Updates the shares of each pool by calling `poolsDebtDistribution.setActorShares(poolId, newLiquidity)`
    - Returns the change in value
  - `distributeDebtToPools()`
    - Rolls external market debt to `poolsDebtDistribution` by inflating all of them with `poolsDebtDistribution.distributeValue(acumMarketDebt)`
