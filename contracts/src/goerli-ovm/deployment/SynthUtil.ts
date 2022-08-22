export const name = 'SynthUtil';
export const address = '0xC647DecC9c4f9162dBF77E4367199F5ED0950355';
export const source = 'SynthUtil';
export const abi = [
  'constructor(address resolver)',
  'function addressResolverProxy() view returns (address)',
  'function synthsBalances(address account) view returns (bytes32[], uint256[], uint256[])',
  'function synthsRates() view returns (bytes32[], uint256[])',
  'function synthsTotalSupplies() view returns (bytes32[], uint256[], uint256[])',
  'function totalSynthsInKey(address account, bytes32 currencyKey) view returns (uint256 total)',
];
