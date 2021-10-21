import clone from 'lodash/clone';
import partial from 'lodash/partial';

import ethers from 'ethers';
import { QueryContext, SubgraphEndpoints } from './context';

import { synthetix, NetworkId } from '@synthetixio/contracts-interface';

import { UseQueryResult } from 'react-query';

export * as exchanges from '../generated/exchangesSubgraphQueries';
export * as exchanger from '../generated/exchangerSubgraphQueries';
export * as issuance from '../generated/issuanceSubgraphQueries';

import FUNCS from '../generated/queryFuncs';
import React from 'react';

import { DEFAULT_SUBGRAPH_ENDPOINTS } from './constants';

export * from './types';

type SynthetixQueryContextContent = { context: QueryContext; queries: SynthetixQueries };

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
	signer,
	subgraphEndpoints,
}: {
	networkId: NetworkId | null;
	provider?: ethers.providers.Provider;
	signer?: ethers.Signer;
	subgraphEndpoints: SubgraphEndpoints;
}): SynthetixQueryContextContent {
	const ctx: QueryContext = {
		networkId,
		provider: null,
		signer: null,
		snxjs: null,
		subgraphEndpoints: subgraphEndpoints || DEFAULT_SUBGRAPH_ENDPOINTS[1],
	};

	if (networkId) {
		ctx.snxjs = synthetix({ networkId, signer, provider });

		// snag the resultant provider from snxjs
		ctx.signer = ctx.snxjs.contracts.Synthetix.signer;
		ctx.provider = ctx.snxjs.contracts.Synthetix.provider;

		if (!subgraphEndpoints) {
			ctx.subgraphEndpoints = DEFAULT_SUBGRAPH_ENDPOINTS[networkId];
		}
	}

	const modFuncs: { [i: string]: unknown } = clone(FUNCS);

	for (const f in modFuncs) {
		modFuncs[f] = partial(modFuncs[f] as UseQueryFunction, ctx);
	}

	const allFuncs = modFuncs as SynthetixQueries;

	return { context: ctx, queries: allFuncs };
}

export const SynthetixQueryContext = React.createContext<SynthetixQueryContextContent | null>(null);
export const SynthetixQueryContextProvider = SynthetixQueryContext.Provider;

export default function useSynthetixQueries(): SynthetixQueries {
	const ctx = React.useContext(SynthetixQueryContext);
	if (!ctx) {
		throw new Error('No QueryClient set, use QueryClientProvider to set one');
	}

	return ctx.queries;
}
