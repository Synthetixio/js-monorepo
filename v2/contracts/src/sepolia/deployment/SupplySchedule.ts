// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'SupplySchedule';
export const address = '0xAda12611B34a992b1c01cB3Bbc9C43Fa5B46a6c7';
export const source = 'SupplySchedule';
export const abi = [
  'constructor(address _owner, uint256 _lastMintEvent, uint256 _currentWeek)',
  'event InflationAmountUpdated(uint256 newInflationAmount)',
  'event MaxInflationAmountUpdated(uint256 newInflationAmount)',
  'event MinterRewardUpdated(uint256 newRewardAmount)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event SupplyMinted(uint256 supplyMinted, uint256 numberOfWeeksIssued, uint256 lastMintEvent, uint256 timestamp)',
  'event SynthetixProxyUpdated(address newAddress)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function INFLATION_START_DATE() view returns (uint256)',
  'function MAX_MINTER_REWARD() view returns (uint256)',
  'function MINT_BUFFER() view returns (uint256)',
  'function MINT_PERIOD_DURATION() view returns (uint256)',
  'function acceptOwnership()',
  'function inflationAmount() view returns (uint256)',
  'function isMintable() view returns (bool)',
  'function lastMintEvent() view returns (uint256)',
  'function maxInflationAmount() view returns (uint256)',
  'function mintableSupply() view returns (uint256)',
  'function minterReward() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function recordMintEvent(uint256 supplyMinted) returns (uint256)',
  'function setInflationAmount(uint256 amount)',
  'function setMaxInflationAmount(uint256 amount)',
  'function setMinterReward(uint256 amount)',
  'function setSynthetixProxy(address _synthetixProxy)',
  'function synthetixProxy() view returns (address)',
  'function weekCounter() view returns (uint256)',
  'function weeksSinceLastIssuance() view returns (uint256)',
];
