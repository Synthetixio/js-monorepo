export const address = '0xffa6bBfA097e109D63379d1E1DE96D38B8a009f0';
export const abi = [
  'error Unauthorized(address addr)',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'event FeatureFlagAllowAllSet(bytes32 feature, bool value)',
  'event FeatureFlagAllowlistAdded(bytes32 feature, address account)',
  'event FeatureFlagAllowlistRemoved(bytes32 feature, address account)',
  'function addToFeatureFlagAllowlist(bytes32 feature, address permissioned)',
  'function getFeatureFlagAllowAll(bytes32 feature) view returns (bool)',
  'function getFeatureFlagAllowlist(bytes32 feature) view returns (address[])',
  'function isFeatureAllowed(bytes32 feature, address addressToCheck) view returns (bool)',
  'function removeFromFeatureFlagAllowlist(bytes32 feature, address permissioned)',
  'function setFeatureFlagAllowAll(bytes32 feature, bool allowAll)',
];
