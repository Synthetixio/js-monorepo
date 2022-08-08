import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useContractRead } from 'wagmi';

export const TestWagmi: React.FC = () => {
	const file = require('../ts-deployments/goerli/synthetix.Proxy');
	const { isLoading, data } = useContractRead({
		addressOrName: file.address,
		contractInterface: file.abi,
		functionName: 'getCollateralTypes',
		args: [true],
	});

	return (
		<Box p={4} background="#161616" height="100vh">
			<Button>Hi Chakra</Button>
		</Box>
	);
};
