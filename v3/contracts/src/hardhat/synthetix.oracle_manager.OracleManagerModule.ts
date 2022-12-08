export const address = '0x3F55D386293C3f4488955F8D417628dCbd4b5CD7';
export const abi = [
  'error NodeNotRegistered(bytes32 nodeId)',
  'error UnsupportedNodeType(uint256 nodeType)',
  'error UnsupportedOperation(uint256 operation)',
  'event NodeRegistered(bytes32 nodeId, bytes32[] parents, uint8 nodeType, bytes parameters)',
  'function getNode(bytes32 nodeId) pure returns (tuple(bytes32[] parents, uint8 nodeType, bytes parameters))',
  'function getNodeId(bytes32[] parents, uint8 nodeType, bytes parameters) pure returns (bytes32)',
  'function process(bytes32 nodeId) view returns (tuple(int256 price, uint256 timestamp, uint256 volatilityScore, uint256 liquidityScore))',
  'function registerNode(bytes32[] parents, uint8 nodeType, bytes parameters) returns (bytes32)',
];
