import React, { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';
import { routes, RouteType } from './pages/routes';
import { Route, Router, Routes } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';

export const Synthetix: React.FC = () => {
	const renderRoutesTree = (routes: Readonly<RouteType[]>) =>
		routes.map((route, index) => {
			if (route.routes?.length) {
				return (
					<Route key={index} {...route}>
						{renderRoutesTree(route.routes)}
					</Route>
				);
			} else {
				return <Route key={index} {...route} />;
			}
		});

	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				<Route element={<DefaultLayout />}>{renderRoutesTree(routes)}</Route>
			</Routes>
		</Suspense>
	);
};
