---
sidebar_position: 4
---

# Integrating Markets

Markets can be integrated with the Synthetix protocol to access liquidity provided by stakers. Markets report a balance of debt, may deposit snxUSD, and withdraw snxUSD based on their balance.

## Registering Markets

Before a market can interact with the protocol, it must be registered using the [`registerMarket` function](/protocol/technical-reference/smart-contracts#registermarket). This function accepts the address of a market, which will be able to deposit and withdraw snxUSD using the ID returned by the function.

Markets must conform to the `IMarket` interface. This only consists of `function balance() external view returns (uint);`, which should return the total value of debt issued by the market (to be collateralized by the assets in the pools backing it).

## Managing Credit & Debt

When a market receives snxUSD (e.g. by selling a synthetic asset), it should deposit them into the market manager using the [`depositUsd` function](/protocol/technical-reference/smart-contracts#depositusd). This effectively credits all of the pools (and relevant staking positions) backing this market, pro-rata.

When a market needs to pay out snxUSD (e.g. when buying back a synthetic asset), it may withdraw snxUSD from the market manager using the [`withdrawUsd` function](/protocol/technical-reference/smart-contracts#withdrawusd). This increases debt among all of the pools (and relevant staking positions) backing this market, pro-rata. A market can withdraw no more than the amount returned by the [`getwithdrawableUsd` function](/protocol/technical-reference/smart-contracts#getwithdrawableusd).

The amount of snxUSD withdrawn by the market minus the amount deposited can be retrieved using the [`getmarketIssuance` function](/protocol/technical-reference/smart-contracts#getmarketissuance). (Note that this value can be negative.) This, plus the [`getmarketReportedBalance`](/protocol/technical-reference/smart-contracts#getmarketreportedbalance), results in the [`getmarketTotalBalance`](/protocol/technical-reference/smart-contracts#getmarkettotalbalance). The amount of collateral backing the market can be retrieved with the [`getmarketCollateral` function](/protocol/technical-reference/smart-contracts#getmarketcollateral).
