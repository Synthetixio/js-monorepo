export const address = '0xdF9289ba12d1eAF594a911Fd2Cfe8428C2090523';
export const abi = [
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error Unauthorized(address addr)',
  'event AssociatedSystemSet(bytes32 indexed kind, bytes32 indexed id, address proxy, address impl)',
  'function getAssociatedSystem(bytes32 id) view returns (address proxy, bytes32 kind)',
  'function initOrUpgradeNft(bytes32 id, string name, string symbol, string uri, address impl)',
  'function initOrUpgradeToken(bytes32 id, string name, string symbol, uint8 decimals, address impl)',
  'function registerUnmanagedSystem(bytes32 id, address endpoint)',
];
