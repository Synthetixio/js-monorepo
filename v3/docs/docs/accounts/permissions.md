---
sidebar_position: 2
---

# Permissions

Accounts can delegate permissions to addresses other than the owner. This is useful to improve security (by owning the account with a hardware wallet and using a software wallet with reduced permissions for more common activities, like claiming rewards) or for collaboratively managing staking positions.

- `ADMIN` - Admins have permission to do everything that the account owner can (including granting and revoking permissions for other addresses) except for transferring account ownership.
- `WITHDRAW` - Addresses with this permission may call the [`withdraw` function](/technical-reference/smart-contracts#withdraw)) on behalf of the account.
- `REWARDS` - Addresses with this permission may call the [`claimRewards` function](/technical-reference/smart-contracts#claimrewards) on behalf of the account.
- `MINT` - Addresses with this permission may call the [`mintUSD` function](/technical-reference/smart-contracts#mintusd) on behalf of the account.
- `DELEGATE` - Addresses with this permission may call the [`delegateCollateral` function](/technical-reference/smart-contracts#delegatecollateral) on behalf of the account.

Permissions are handled by the [Account Module](/technical-reference/smart-contracts#account-module), exposed at the [main Synthetix address](/technical-reference/deployment-addresses). Each permission listed above should be encoded/decoded as `bytes32` when making requests.

The [`hasPermission` function](/technical-reference/smart-contracts#haspermission) returns whether an address has a particular permission for a given account. The [`getAccountPermissions` function](/technical-reference/smart-contracts#getaccountpermissions) returns all of the addresses and their respective permissions for a given account. The account owner (and addresses with the `ADMIN` permission) may call the [`grantPermission`](/technical-reference/smart-contracts#grantpermission) and [`revokePermission`](/technical-reference/smart-contracts#revokepermission) functions. An address may also revoke its own permissions with the [`renouncePermission`](/technical-reference/smart-contracts#renouncepermission) function.
