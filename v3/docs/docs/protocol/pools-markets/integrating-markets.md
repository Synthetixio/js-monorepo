---
sidebar_position: 4
---

# Integrating Markets

Markets can be integrated with the Synthetix protocol to access liquidity provided by stakers. Markets report a balance of debt, may deposit snxUSD, and withdraw snxUSD depending on the amount of liquidity delegated to them by pools.

## Registering Markets

Before a market can interact with the protocol, it must be registered using the [`registerMarket` function](/protocol/technical-reference/smart-contracts#registermarket). This function accepts the address of a market, which will be able to deposit and withdraw snxUSD using the ID returned by the function.

Markets must conform to the [`IMarket` interface](https://github.com/Synthetixio/synthetix-v3/blob/main/packages/synthetix-main/contracts/interfaces/external/IMarket.sol). This consists of:

- `function name(uint128 marketId) external view returns (string memory);` - A function which should return a human-readable name for the given market.
- `function reportedDebt(uint129 marketId) external view returns (uint);` - A function which should return the total value of debt issued by the market (to be collateralized by the assets in the pools backing it), denominated with 18 decimals places.
- `function locked(uint128 marketId) external view returns (uint);` - A function which returns the amount of credit under which pools cannot rescind credit delegated to the market. This value is dollar-denominated, with 18 decimals places. If the market implementation does not lock collateral, this function can just `return 0;`.

## Managing Credit & Debt

When a market receives snxUSD (e.g. by selling a synthetic asset), it should deposit them into the market manager using the [`depositMarketUsd` function](/protocol/technical-reference/smart-contracts#depositmarketusd). This effectively credits all of the pools (and relevant staking positions) backing this market, pro-rata.

When a market needs to pay out snxUSD (e.g. when a synthetic asset is sold to the market), it may withdraw snxUSD from the market manager using the [`withdrawMarketUsd` function](/protocol/technical-reference/smart-contracts#withdrawmarketusd). This increases debt among all of the pools (and relevant staking positions) backing this market, pro-rata. A market can withdraw no more than the amount returned by the [`getWithdrawableUsd` function](/protocol/technical-reference/smart-contracts#getwithdrawableusd).

The amount of snxUSD withdrawn by the market minus the amount deposited can be retrieved using the [`getMarketIssuance` function](/protocol/technical-reference/smart-contracts#getmarketissuance). (Note that this value can be negative.) This, plus the [`getMarketReportedBalance`](/protocol/technical-reference/smart-contracts#getmarketreportedbalance), results in the [`getMarketTotalBalance`](/protocol/technical-reference/smart-contracts#getmarkettotalbalance). The amount of collateral backing the market can be retrieved with the [`getMarketCollateral` function](/protocol/technical-reference/smart-contracts#getmarketcollateral).

## Examples

Review the [market implementations in the Synthetix V3 repository](https://github.com/Synthetixio/synthetix-v3/tree/main/markets) on GitHub.
