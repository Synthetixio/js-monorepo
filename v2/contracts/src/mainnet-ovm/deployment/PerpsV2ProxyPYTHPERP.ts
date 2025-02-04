// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'PerpsV2ProxyPYTHPERP';
export const address = '0x296286ae0b5c066CBcFe46cc4Ffb375bCCAFE640';
export const source = 'ProxyPerpsV2';
export const abi = [
  'constructor(address _owner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event RouteRemoved(bytes4 route)',
  'event RouteUpdated(bytes4 route, address implementation, bool isView)',
  'event TargetedRouteAdded(address targetedRoute)',
  'event TargetedRouteRemoved(address targetedRoute)',
  'function _emit(bytes callData, uint256 numTopics, bytes32 topic1, bytes32 topic2, bytes32 topic3, bytes32 topic4)',
  'function acceptOwnership()',
  'function addRoute(bytes4 selector, address implementation, bool isView)',
  'function getAllTargets() view returns (address[])',
  'function getRoute(bytes4 selector) view returns (tuple(bytes4 selector, address implementation, bool isView))',
  'function getRoutesLength() view returns (uint256)',
  'function getRoutesPage(uint256 index, uint256 pageSize) view returns (tuple(bytes4 selector, address implementation, bool isView)[])',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function removeRoute(bytes4 selector)',
];
