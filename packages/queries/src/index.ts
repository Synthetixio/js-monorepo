import clone from 'lodash/clone';
import partial from 'lodash/partial';

import ethers from 'ethers';
import { QueryContext } from './context';

import { synthetix, NetworkId } from '@synthetixio/contracts-interface';
import synthetixData from '@synthetixio/data';

import { UseQueryResult } from 'react-query';

import FUNCS from '../generated/queryFuncs';
import React from 'react';

export * from './types';

// all functions exported by submodules must follow this format
type UseQueryFunction = (ctx: QueryContext, ...args: any) => UseQueryResult;

// compute the type of this library so that typescript can do full analysis of arguments and available functions
type RawSynthetixQueries = typeof FUNCS;
type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;
export type SynthetixQueries = {
	[Property in keyof RawSynthetixQueries]: OmitFirstArg<RawSynthetixQueries[Property]>;
};

export function createQueryContext({
	networkId,
	provider,
}: {
	networkId: NetworkId | null;
	provider?: ethers.providers.Provider;
}): QueryContext {
	const ctx: QueryContext = {
		networkId,
		provider: null,
		snxData: null,
		snxjs: null,
	};

	if (networkId) {
		ctx.snxjs = synthetix({ networkId, provider });

		// snag the resultant provider from snxjs
		ctx.provider = ctx.snxjs.contracts.Synthetix.provider;

		ctx.snxData = synthetixData({ networkId });
	}

	return ctx;
}

const SynthetixQueryContext = React.createContext<QueryContext | null>(null);
export const SynthetixQueryContextProvider = SynthetixQueryContext.Provider;

export default function useSynthetixQueries(): SynthetixQueries {
	const ctx = React.useContext(SynthetixQueryContext);
	if (!ctx) {
		throw new Error('No QueryClient set, use QueryClientProvider to set one');
	}

	const modFuncs: { [i: string]: any } = clone(FUNCS);

	for (const f in modFuncs) {
		modFuncs[f] = partial(modFuncs[f] as UseQueryFunction, ctx);
	}

	return modFuncs as SynthetixQueries;
}
