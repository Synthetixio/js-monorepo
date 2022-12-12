// !!! DO NOT EDIT !!! Automatically generated file

export const address = '0x74b62704a622Ae086D877F63ebA8Af741080860e';
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
export const name = 'OracleManagerModule';
export const source = 'contracts/modules/OracleManagerModule.sol';
