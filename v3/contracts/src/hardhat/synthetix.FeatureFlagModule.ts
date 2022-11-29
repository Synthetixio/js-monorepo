export const address = '0x7E3b3e1faE6A4cCcF87E184647c900438E04A81F';
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
