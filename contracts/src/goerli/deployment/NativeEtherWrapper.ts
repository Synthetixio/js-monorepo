// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'NativeEtherWrapper';
export const address = '0x3b820F825088DB6cD6E118C0c9B39755859932a9';
export const source = 'NativeEtherWrapper';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event Burned(address indexed account, uint256 amount)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event Minted(address indexed account, uint256 amount)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function burn(uint256 amount)',
  'function isResolverCached() view returns (bool)',
  'function mint() payable',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
];
