export const ERRORS = {
	badNetworkArg:
		'unsupported network or network id passed. Please check SynthetixJS.supportedNetworks for a list of supported networks and ids',
	noMatch: (type: string, value: string): string => `no contracts match ${type}: ${value}`,
};
