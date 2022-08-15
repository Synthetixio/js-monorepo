---
sidebar_position: 1
---

# Trading Synths

You can use uUSD to buy a synth from a market or sell that synth to its corresponding market for sUSD.

## Price Feed

First, we take the price feed from the price feed contract associated with the market.

## Supply Target Adjustment

If the value of the circulating supply of a synth exceeds the amount of collateral backing them, we apply a supply target adjustment.

This is effectively a fee that ensures that the market will only allow debt to be issued when it's fully backed. This fee is caluclated using the following formula:

When buying an synth in this case: A fee is applied to disincentivize this.

When selling an synth in this case: Multiply the price by `1 - supplyTarget/circulatingSupply`

## Fees

Finally, each of the fees associated with the contract are applied.
