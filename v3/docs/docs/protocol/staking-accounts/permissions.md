---
sidebar_position: 2
---

# Permissions

Accounts can delegate permissions to addresses other than the owner. This is useful to improve security (by owning the account with a hardware wallet and using a software wallet with reduced permissions for more common activities, like claiming rewards) or for collaboratively managing staking positions.

- `ADMIN` - Admin roles have permission to do everything that the account owner can (including granting and revoking permissions for other addresses) except for transferring account ownership.
- `STAKE` - Addresses with this permission may call the [`stake` function](/protocol/technical-reference/smart-contracts#stake).
- `UNSTAKE` - Addresses with this permission may call the [`unstake` function](/protocol/technical-reference/smart-contracts#unstake).
- `CLAIM` - Addresses with this permission may call the [`claimRewards` function](/protocol/technical-reference/smart-contracts#claimrewards).
- `MINT` - Addresses with this permission may call the [`mintUSD` function](/protocol/technical-reference/smart-contracts#mintusd).
- `BURN` - Addresses with this permission may call the [`burnUSD` function](/protocol/technical-reference/smart-contracts#burnusd).
- `DELEGATE` - Addresses with this permission may call the [`delegateCollateral` function](/protocol/technical-reference/smart-contracts#delegatecollateral).

Permissions are handled by the [Account Module](/protocol/technical-reference/smart-contracts#account-module), exposed at the [main Synthetix address](/protocol/technical-reference/deployment-addresses). Each permission listed above is referred to as a _role_ in the smart contracts and should be encoded/decoded as `bytes32` when making requests.

The [`hasRole` function](/protocol/technical-reference/smart-contracts#hasrole) returns whether an address has a particular permission for a given account. The [`getAccountPermissions` function](/protocol/technical-reference/smart-contracts#getaccountpermissions) returns all of the addresses and their respective permissions for a given account. The account owner (and addresses with the `ADMIN` permission) may call the [`grantRole`](/protocol/technical-reference/smart-contracts#grantrole) and [`revokeRole`](/protocol/technical-reference/smart-contracts#revokerole) functions. An address may also revoke its own permissions with the [`renounceRole`](/protocol/technical-reference/smart-contracts#renouncerole) function.

**Relevant SIPs:** [301](https://sips.synthetix.io/sips/sip-301/)
