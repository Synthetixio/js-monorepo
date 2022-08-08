export const address = '0x5Fc11944eED8715Ef6EB14420d6e24C76eA6f5D0';
export const abi = [
	'error AlreadyInitialized()',
	'error NotInitialized()',
	'error Unauthorized(address addr)',
	'event USDTokenCreated(address snxAddress)',
	'function getUSDTokenAddress() view returns (address)',
	'function getUSDTokenModuleSatellites() view returns (tuple(bytes32 name, bytes32 contractName, address deployedAddress)[])',
	'function initializeUSDTokenModule()',
	'function isUSDTokenModuleInitialized() view returns (bool)',
	'function upgradeUSDImplementation(address newUSDTokenImplementation)',
];
