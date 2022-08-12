---
sidebar_position: 1
---

# Creating Synths

Anyone can create a synth market on Synthetix. Synths are ERC-20 tokens which can be purchased and sold from their market at the price provided by the price feed contract (subject to fees after an adjustment based on the amount of collateral backing the market). Each synth market has the following properties:

- Name - This will be returned by the `name` function of the synth.
- Symbol - This will be returned by the `symbol` function of the synth.
- Price Feed - The address of a contract (which implements the `IPrice` interface) that provides the current price of this asset.
- Icon URI _(optional)_ - This will be displayed by the Synthetix app.
- Category _(optional)_ - This will be used for tagging and filtering in the Synthetix app.
- Fees _(optional)_ - This is an array of contract addresses (which implement the `IFee` interface) that determine the fees to apply consecutively on exchange.

## Fee Collection

By default, fees reduce the amount of the asset provided in an exchange with the market. This effectively distributes the value of the fee pro-rata among the stakers backing this asset. Fee contracts may also specify a recipient for the value of the fee applied, distributed as sUSD.

## Upgrading Synth Markets

The synth market creator has the ability to upgrade the configurations listed above. Ownership can be transferred to the zero address to prevent future changes.
