// !!! DO NOT EDIT !!! Automatically generated file

export const address = '0x632e7008Fe2DF46DEDd1Fe01580764868C0264A8';
export const abi = [
  'error AlreadyInitialized()',
  'error ImplementationIsSterile(address implementation)',
  'error NoChange()',
  'error NotAContract(address contr)',
  'error NotNominated(address addr)',
  'error Unauthorized(address addr)',
  'error UpgradeSimulationFailed()',
  'error ZeroAddress()',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event Upgraded(address indexed self, address implementation)',
  'function acceptOwnership()',
  'function getImplementation() view returns (address)',
  'function initializeOwnerModule(address initialOwner)',
  'function isOwnerModuleInitialized() view returns (bool)',
  'function nominateNewOwner(address newNominatedOwner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function renounceNomination()',
  'function simulateUpgradeTo(address newImplementation)',
  'function upgradeTo(address newImplementation)',
  'error NodeNotRegistered(bytes32 nodeId)',
  'error UnsupportedNodeType(uint256 nodeType)',
  'error UnsupportedOperation(uint256 operation)',
  'event NodeRegistered(bytes32 nodeId, bytes32[] parents, uint8 nodeType, bytes parameters)',
  'function getNode(bytes32 nodeId) pure returns (tuple(bytes32[] parents, uint8 nodeType, bytes parameters))',
  'function getNodeId(bytes32[] parents, uint8 nodeType, bytes parameters) pure returns (bytes32)',
  'function process(bytes32 nodeId) view returns (tuple(int256 price, uint256 timestamp, uint256 volatilityScore, uint256 liquidityScore))',
  'function registerNode(bytes32[] parents, uint8 nodeType, bytes parameters) returns (bytes32)',
];
export const name = 'Router';
export const source = 'contracts/routers/chain-420/Router.sol';
