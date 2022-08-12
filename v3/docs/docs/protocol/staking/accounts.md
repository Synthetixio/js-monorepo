---
sidebar_position: 1
---

# Accounts

Stakers create accounts in the Synthetix system. Accounts are represented as ERC-721 tokens, such that they can be transferred between wallets using any app with support for NFTs.

Each accounts has collateral and debt associated with it. The collateral consists of all the tokens staked by the account. The debt is the sum of the sUSD taken out by the account as a loan (or _minted_) and the debt inflation accrued from the funds it is participating in.

## Collateralization Ratio

An account’s collateralziation ratio (or _C-Ratio_) represents the value of the collateral staked by the account relative to the amount of debt it’s responsible for.

This is represented as a percentage and calculated using the following formula:  
`collateralValue / (sUsdDebt + fundDebt)`

- `collateralValue` - This current value of all the collateral staked by the account.
- `sUsdDebt` - This is amount of sUSD that has been minted by this account.
- `fundDebt` - This is the amount of debt delegated to this account by the funds it is participating in.

## Minimum Collateralization Ratio

If an account’s C-Ratio falls below its minimum collateralization ratio (or _MCR_), the account is subject to liquidation.

Each type of collateral has its own minimum collateralization ratio, as determined by governance. An account’s MCR is an average of its collaterals’ MCRs, weighted by amount.

For example, let's take a scenario where the MCR of SNX is configured to 400% and the MCR of ETH is configured to 300%. If an account is staking $2,500 of ETH and $7,500 of SNX, this account’s MCR would be 375%.

## Permissions

Accounts can delegate permissions to other wallets than the owner. The account owner and any wallet with the _Modify Permissions_ can grant and revoke the following permissions to any wallet.

- Stake
- Unstake
- Claim Rewards
- Mint sUSD
- Burn Synths
- Modify Staking Position
- Modify Permissions

:::caution

Any wallet with the **Modify Permissions** permission can grant and revoke any permissions to wallet (including its own) except the account owner.

:::
