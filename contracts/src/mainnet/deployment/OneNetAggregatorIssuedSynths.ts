// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'OneNetAggregatorIssuedSynths';
export const address = '0xcf1405b18dBCEA2893Abe635c88359C75878B9e1';
export const source = 'OneNetAggregatorIssuedSynths';
export const abi = [
  'constructor(address _resolver)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event SetOverrideTimestamp(uint256 timestamp)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function decimals() view returns (uint8)',
  'function getAnswer(uint256 _roundId) view returns (int256 answer)',
  'function getRoundData(uint80) view returns (uint80, int256, uint256, uint256, uint80)',
  'function getTimestamp(uint256 _roundId) view returns (uint256 timestamp)',
  'function latestRound() view returns (uint256)',
  'function latestRoundData() view returns (uint80, int256, uint256, uint256, uint80)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function overrideTimestamp() view returns (uint256)',
  'function owner() view returns (address)',
  'function resolver() view returns (address)',
  'function setOverrideTimestamp(uint256 timestamp)',
];
