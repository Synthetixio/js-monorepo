---
sidebar_position: 1
---

# Account Tokens

To stake collateral in the Synthetix protocol, users must first create an account. Accounts are represented as ERC-721 compliant tokens. They can be transferred between wallets using any app with support for NFTs.

Anyone can mint an account token by calling the [`createAccount()` function](/technical-reference/smart-contracts#createaccount) on the [main Synthetix address](/technical-reference/deployment-addresses). Other than gas fees, there is no cost to mint an account token. When creating an account, the caller must provide a `requestedAccountId` that isn't already in use.

The account token's ERC-721 compliant interface is exposed at the [Account Token address](/technical-reference/deployment-addresses). All other logic pertaining to accounts, including the `createAccount` function, is contained in the [Account Module](/technical-reference/smart-contracts#account-module) exposed at the [main Synthetix address](/technical-reference/deployment-addresses)
