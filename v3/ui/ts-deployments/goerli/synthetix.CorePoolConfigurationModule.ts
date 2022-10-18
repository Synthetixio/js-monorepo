export const address = '0x0988aAA4b7469d5E7B173Ed8701C961832C4a132';
export const abi = [
  'error PoolNotFound(uint128 poolId)',
  'error Unauthorized(address addr)',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'event PoolApprovedAdded(uint256 poolId)',
  'event PoolApprovedRemoved(uint256 poolId)',
  'event PreferredPoolSet(uint256 poolId)',
  'function addApprovedPool(uint128 poolId)',
  'function getApprovedPools() view returns (uint256[])',
  'function getPreferredPool() view returns (uint256)',
  'function removeApprovedPool(uint128 poolId)',
  'function setPreferredPool(uint128 poolId)',
];
