export const address = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6';
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
