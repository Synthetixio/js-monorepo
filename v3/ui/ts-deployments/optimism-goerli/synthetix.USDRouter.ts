export const address = '0xB2425E573179BEA89E9Be55efb82a451a482782B';
export const abi = [
  'error AlreadyInitialized()',
  'error NoChange()',
  'error NotNominated(address addr)',
  'error Unauthorized(address addr)',
  'error ZeroAddress()',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function initializeOwnerModule(address initialOwner)',
  'function isOwnerModuleInitialized() view returns (bool)',
  'function nominateNewOwner(address newNominatedOwner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function renounceNomination()',
  'error ImplementationIsSterile(address implementation)',
  'error NotAContract(address contr)',
  'error UpgradeSimulationFailed()',
  'event Upgraded(address indexed self, address implementation)',
  'function getImplementation() view returns (address)',
  'function simulateUpgradeTo(address newImplementation)',
  'function upgradeTo(address newImplementation)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'event AssociatedSystemSet(bytes32 indexed kind, bytes32 indexed id, address proxy, address impl)',
  'function getAssociatedSystem(bytes32 id) view returns (address proxy, bytes32 kind)',
  'function initOrUpgradeNft(bytes32 id, string name, string symbol, string uri, address impl)',
  'function initOrUpgradeToken(bytes32 id, string name, string symbol, uint8 decimals, address impl)',
  'function registerUnmanagedSystem(bytes32 id, address endpoint)',
  'error InsufficientAllowance(uint256 required, uint256 existing)',
  'error InsufficientBalance(uint256 required, uint256 existing)',
  'event Approval(address indexed owner, address indexed spender, uint256 amount)',
  'event Transfer(address indexed from, address indexed to, uint256 amount)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function balanceOf(address owner) view returns (uint256)',
  'function burn(address target, uint256 amount)',
  'function burnWithAllowance(address from, address spender, uint256 amount)',
  'function decimals() view returns (uint8)',
  'function initialize(string tokenName, string tokenSymbol, uint8 tokenDecimals)',
  'function isInitialized() view returns (bool)',
  'function mint(address target, uint256 amount)',
  'function name() view returns (string)',
  'function setAllowance(address from, address spender, uint256 amount)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function transferCrossChain(uint256 destChainId, address, uint256 amount) returns (uint256 feesPaid)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
];
