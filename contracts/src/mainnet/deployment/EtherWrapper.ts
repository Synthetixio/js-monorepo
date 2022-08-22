// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'EtherWrapper';
export const address = '0xC1AAE9d18bBe386B102435a8632C8063d31e747C';
export const source = 'EtherWrapper';
export const abi = [
  'constructor(address _owner, address _resolver, address _WETH)',
  'event Burned(address indexed account, uint256 principal, uint256 fee, uint256 amountIn)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event Minted(address indexed account, uint256 principal, uint256 fee, uint256 amountIn)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event PauseChanged(bool isPaused)',
  'function acceptOwnership()',
  'function burn(uint256 amountIn)',
  'function burnFeeRate() view returns (uint256)',
  'function calculateBurnFee(uint256 amount) view returns (uint256)',
  'function calculateMintFee(uint256 amount) view returns (uint256)',
  'function capacity() view returns (uint256 _capacity)',
  'function distributeFees()',
  'function feesEscrowed() view returns (uint256)',
  'function getReserves() view returns (uint256)',
  'function isResolverCached() view returns (bool)',
  'function lastPauseTime() view returns (uint256)',
  'function maxETH() view returns (uint256)',
  'function mint(uint256 amountIn)',
  'function mintFeeRate() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function paused() view returns (bool)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function sETHIssued() view returns (uint256)',
  'function sUSDIssued() view returns (uint256)',
  'function setPaused(bool _paused)',
  'function totalIssuedSynths() view returns (uint256)',
  'function weth() view returns (address)',
];
