import { Container, Flex } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const DefaultLayout: React.FC = () => {
	return (
		<Flex minHeight="100vh" bg="#161616" flex="1">
			<Container maxW="container.sm" py="8">
				<Outlet />
			</Container>
		</Flex>
	);
};
