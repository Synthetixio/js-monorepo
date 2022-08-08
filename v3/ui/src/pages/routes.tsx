import React from 'react';
import { IndexRouteProps, LayoutRouteProps, PathRouteProps } from 'react-router-dom';

const Index = React.lazy(() => import('./index'));

export type RouteType =
	| (PathRouteProps & { routes?: undefined; isPrivate?: boolean })
	| (IndexRouteProps & { routes?: undefined; isPrivate?: boolean; path?: undefined })
	| (LayoutRouteProps & { routes: RouteType[]; isPrivate?: boolean; path?: string });

export const routes: Readonly<RouteType[]> = [
	{
		index: true,
		element: <Index />,
	},
	// {
	// 	path: paths.test,
	// 	element: <TestWagmi />,
	// },
];
