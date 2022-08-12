---
sidebar_position: 1
---

# Overview

Synthetix enables the creation of synthetic assets on the blockchain. The protocol is currently deployed on Ethereum and Optimism.

## Staking

Stakers are incentivized to provide collateral to back synth and futures markets with exchange fees and rewards. Stakers must maintain their collateralzation ratio to avoid liquidations.

## Trading

Synthetix supports two types of assets: Spot Synths and Perpetual Futures.

### Spot Synths

Synths are ERC-20 compatible tokens which can always be exchanges with a market in the Synthetix system for a price specified by a smart contract, after fees. Synths are great for composability and gaining long-term exposure to assets on-chain.

Stakers who are providing collateral to back synth markets are effectively taking a short position on these assets. They can hedge by taking a long position on assets with equivalent price action, such that they are not exposed to the price action of the asset but still can collect fees and rewards.

### Perpetual Futures

Futures allows traders to take positions in markets (represented by ERC-721 tokens) that are either long or short, and with optional leverage. Futures are great for active trading.

Futures also reduce risk and improve collateral efficiency for stakers. Stakers provide open interest to the market (essentially just capital necessary for the difference between the long and short contracts) and a fee (called the funding rate) help incentive the traders themselves to balance the market. This means that over a sufficient time horizon, stakers should theoretically be taking a market neutral position on the asset and not need to hedge.

## Voting

Anyone can participate in governance. Stakers elect representatives to a variety of DAOs/councils. The Spartan Council, one of the DAOs, votes on configuration changes and upgrades to the protocol.
