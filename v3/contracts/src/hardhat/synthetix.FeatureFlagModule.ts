export const address = '0xF14392aaddb188775048538C4f9bB1ffFb2f2B4e';
export const abi = [
  'error Unauthorized(address addr)',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'event FeatureFlagAllowAllSet(bytes32 feature, bool allowAll)',
  'event FeatureFlagAllowlistAdded(bytes32 feature, address account)',
  'event FeatureFlagAllowlistRemoved(bytes32 feature, address account)',
  'function addToFeatureFlagAllowlist(bytes32 feature, address account)',
  'function getFeatureFlagAllowAll(bytes32 feature) view returns (bool)',
  'function getFeatureFlagAllowlist(bytes32 feature) view returns (address[])',
  'function isFeatureAllowed(bytes32 feature, address account) view returns (bool)',
  'function removeFromFeatureFlagAllowlist(bytes32 feature, address account)',
  'function setFeatureFlagAllowAll(bytes32 feature, bool allowAll)',
];
