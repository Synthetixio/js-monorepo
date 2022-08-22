// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'DappMaintenance';
export const address = '0xAb0B2f1Cf979cdbF4676251F35353eC5AF2732Dd';
export const source = 'DappMaintenance';
export const abi = [
  'constructor(address _owner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event SXMaintenance(bool isPaused)',
  'event StakingMaintenance(bool isPaused)',
  'function acceptOwnership()',
  'function isPausedSX() view returns (bool)',
  'function isPausedStaking() view returns (bool)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function setMaintenanceModeAll(bool isPaused)',
  'function setMaintenanceModeSX(bool isPaused)',
  'function setMaintenanceModeStaking(bool isPaused)',
];
