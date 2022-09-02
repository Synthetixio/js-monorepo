export const address = '0x0c26c0978870193f43656029e1F02A78EcbaA1A8';
export const abi = [
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error Unauthorized(address addr)',
  'event AssociatedSystemSet(bytes32 indexed kind, bytes32 indexed id, address proxy, address impl)',
  'function getAssociatedSystem(bytes32 id) view returns (address proxy, bytes32 kind)',
  'function initOrUpgradeNft(bytes32 id, string name, string symbol, string uri, address impl)',
  'function initOrUpgradeToken(bytes32 id, string name, string symbol, uint8 decimals, address impl)',
  'function registerUnmanagedSystem(bytes32 id, address endpoint)',
];
