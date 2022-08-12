---
sidebar_position: 4
---

# Funds

Funds serve as an intermediary between accounts and debt pools. Funds track the value of the collateral delegated to them by accounts. They also hold a balance due to changes of value in the markets included in their staking positions.

## Staking Positions

Primarily, funds control staking positions. Staking positions are represented by a series of debt pools and corresponding weights. For instance, a fund may have a weight of 1 associated with a debt pool for an sBTC market and a weight of 2 associated with a debt pool for an sEUR market. In this case, one third of the collateral it controls backs the sBTC market and two thirds of the collateral backs the sEUR market.

## Balances

When accounts delegate collateral to an account, they notify the debt pool in it’s staking position that the amount of collateral backing them has increased. The initial balance of the fund when joining the fund is associated with the account and the appropriate share of the change in the balance going forward is tracked.

## Creating Funds

Funds can be created by anyone. This allows you to control your own staking position, and manage the staking position for others. Funds owners can modify the staking position of the fund and nominate new owners. Nominated owners can accept ownership of a fund.

## Debt Pools

Markets are built on debt pools. You only need to concern yourself with the distinction between a debt pool and a market when you're creating them.

Technically, this is a base contract which is inherited by the markets to manage their balance sheets. See Creating Synths and Creating Futures for more information on markets.
