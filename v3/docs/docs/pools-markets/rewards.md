---
sidebar_position: 3
---

# Rewards

The protocol allow for vaults to be connected to **reward distributors** by the pool’s owner using the **rewards manager**. This allows rewards (typically tokens) to be provided across liquidity positions participating in a pool’s vault (instantaneously or over time) pro-rata based on their amount of shares in the corresponding vault.

## Rewards Distributor

Reward distributors must conform to the [`IRewardDistributor`](https://github.com/Synthetixio/synthetix-v3/blob/main/packages/synthetix-main/contracts/interfaces/external/IRewardDistributor.sol) interface. This consists of:

- `function payout(uint128 accountId, uint128 poolId, address collateralType, address sender, uint amount) external returns (bool);` - A function which should transfer `amount` of rewards to the `sender` address.

:::caution
For security reasons, the payout function should revert unless `msg.sender` is equal to [Synthetix’s Core System address](/technical-reference/deployment-addresses).
:::

## Rewards Manager

A pool owner can then connect a rewards distributor to a vault with the [`registerRewardsDistributor` function](/technical-reference/smart-contracts#registerrewardsdistributor). **Note that due to gas considerations, no more than 10 rewards distributors may be connected to a given vault at time.** To remove a rewards distributor, the pool owner can call [`removeRewardsDistributor` function](/technical-reference/smart-contracts#removerewardsdistributor).

A registered rewards distributor can call the [`distributeRewards` function](/technical-reference/smart-contracts#distributerewards). The `poolId` and `collateralType` parameters identify the relevant vault. `amount` indicates the total amount of tokens to be distributed starting at the `start` timestamp over `duration` seconds. Note that `duration` may be set to 0, such that the rewards are distributed instantaneously based on the pro-rata distribution at `start`. A rewards distributor can call the `distributeRewards` function multiple times, adding to the rewards already distributed to those paricipating in the vault.

Anyone can call the [`getAvailableRewards` function](/technical-reference/smart-contracts#getavailablerewards) to see what an account ID can claim from a distributor registered to a specified vault, accounting for amounts previously claimed. Then, an address than owns (or has relevant permissions on) that account can call the [`claimRewards` function](/technical-reference/smart-contracts#claimrewards). This, in turn, calls the `payout()` function on the rewards distributor with the appropriate amount.
