---
sidebar_position: 3
---

# Rewards

The protocol allow for pools to be connected to _reward distributors_ by the pool’s owner using the _rewards manager_. This allows a token distribution to be provided across staking positions participating in the pool’s vaults (instantaneously or over time) pro-rata based on their amount of shares in the corresponding vault.

## Rewards Distributor

Reward distributors must conform to the `IRewardDistributor` interface. This only consists of `function payout(uint poolId, address token, address to, uint amount) external returns (bool);`. When called, it should mint and/or transfer `amount` of `token` to the `to` address. **For security reasons, this function should revert unless `msg.sender` is equal to Synthetix’s main proxy address.**

## Rewards Manager

A pool owner can then connect a rewards distributor to their pool with the [`distributeRewards` function](/protocol/technical-reference/smart-contracts#distributerewards). The `poolId` and `collateralType` parameters identify the relevant vault. The `index` serves as an identifier for this distributor in relation to this vault. `distributor` specifies the address of the contract which implements the `IRewardDistributor` interface. `amount` indicates the total amount of tokens to be distributed starting at the `start` timestamp over `duration` seconds.

Note that `duration` may be set to 0, such that the rewards are distributed instantaneously based on the pro-rata distribution at `start`. Also, this function can be called again for the pool owner or from the address of the relevant distributor to update the parameters.

Anyone can call the [`getAvailableRewards` function](/protocol/technical-reference/smart-contracts#getavailablerewards) to see what a particular account ID can claim from the distributors attached to a given vault. Then, an address than owns (or has relevant permissions on) that account can call the [`claimRewards` function](/protocol/technical-reference/smart-contracts#claimrewards). This, in turn, calls the `payout()` function on the rewards distributor with the appropriate amount.

**Note that due to gas considerations, no more than 10 rewards distributors may be connected to a given vault at time.**
