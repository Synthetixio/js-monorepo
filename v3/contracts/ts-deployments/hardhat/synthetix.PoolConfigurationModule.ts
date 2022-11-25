export const address = '0x48CD4461BCdA44255bf1f70715Ceb9bBcFf6DcB2';
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
