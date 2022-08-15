import clone from 'lodash/clone';
import partial from 'lodash/partial';

import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';
import { QueryContext, SubgraphEndpoints } from './context';

import { NetworkId, SynthetixJS } from '@synthetixio/contracts-interface';

import { UseQueryOptions, UseQueryResult } from 'react-query';

import * as exchanges from '../generated/exchangesSubgraphQueries';
import * as exchanger from '../generated/exchangerSubgraphQueries';
import * as issuance from '../generated/issuanceSubgraphQueries';
import * as subgraph from '../generated/mainSubgraphQueries';

import * as FUNCS from '../generated/queryFuncs';
import { createContext, useContext } from 'react';

import { DEFAULT_SUBGRAPH_ENDPOINTS } from './constants';

export * from './types';

type SynthetixQueryContextContent = { context: QueryContext; queries: SynthetixQueries };

// all functions exported by submodules must follow this format
type UseQueryFunction = (ctx: QueryContext, ...args: any) => UseQueryResult;
type UseSubgraphFunction = (subgraphUrl: string, ...args: any) => UseQueryResult;

// compute the type of this library so that typescript can do full analysis of arguments and available functions
type RawSynthetixQueries = typeof FUNCS;
type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

type SubgraphQueryFunction<F> = F extends (
  u: string,
  o: subgraph.MultiQueryOptions<infer A, infer B>,
  args: infer C
) => infer R
  ? (
      options: subgraph.MultiQueryOptions<A, B>,
      args: Partial<C>,
      queryOptions?: UseQueryOptions<R>
    ) => R
  : F extends (u: string, o: subgraph.SingleQueryOptions, args: infer A) => infer P
  ? (options: subgraph.SingleQueryOptions, args: Partial<A>, queryOptions?: UseQueryOptions<P>) => P
  : never;

type SubgraphQueries<T> = {
  [Property in keyof T]: SubgraphQueryFunction<T[Property]>;
};

type Queries<T> = {
  [Property in keyof T]: OmitFirstArg<T[Property]>;
};

export type SynthetixQueries = {
  exchanges: SubgraphQueries<typeof exchanges>;
  exchanger: SubgraphQueries<typeof exchanger>;
  issuance: SubgraphQueries<typeof issuance>;
  subgraph: SubgraphQueries<typeof subgraph>;
} & Queries<RawSynthetixQueries>;

export function createQueryContext({
  synthetixjs,
  networkId,
  provider,
  signer,
  subgraphEndpoints,
}: {
  synthetixjs: SynthetixJS | null;
  networkId: NetworkId | null;
  provider?: Provider;
  signer?: Signer;
  subgraphEndpoints?: SubgraphEndpoints;
}): SynthetixQueryContextContent {
  const ctx: QueryContext = {
    networkId,
    provider: null,
    signer: null,
    snxjs: null,
    subgraphEndpoints: subgraphEndpoints || DEFAULT_SUBGRAPH_ENDPOINTS[1],
  };

  if (networkId && synthetixjs && signer && provider) {
    ctx.snxjs = synthetixjs;

    ctx.signer = signer;
    ctx.provider = provider;

    if (!subgraphEndpoints) {
      ctx.subgraphEndpoints = DEFAULT_SUBGRAPH_ENDPOINTS[networkId];
    }
  }

  const modFuncs: { [i: string]: unknown } = clone(FUNCS);

  for (const f in modFuncs) {
    modFuncs[f] = partial(modFuncs[f] as UseQueryFunction, ctx);
  }

  modFuncs.exchanges = {};
  for (const f in exchanges) {
    (modFuncs.exchanges as any)[f] = partial(
      (exchanges as any)[f] as UseSubgraphFunction,
      ctx.subgraphEndpoints.exchanges
    );
  }

  modFuncs.exchanger = {};
  for (const f in exchanger) {
    (modFuncs.exchanger as any)[f] = partial(
      (exchanger as any)[f] as UseSubgraphFunction,
      ctx.subgraphEndpoints.exchanger
    );
  }

  modFuncs.issuance = {};
  for (const f in issuance) {
    (modFuncs.issuance as any)[f] = partial(
      (issuance as any)[f] as UseSubgraphFunction,
      ctx.subgraphEndpoints.issuance
    );
  }

  modFuncs.subgraph = {};
  for (const f in subgraph) {
    (modFuncs.subgraph as any)[f] = partial(
      (subgraph as any)[f] as UseSubgraphFunction,
      ctx.subgraphEndpoints.subgraph
    );
  }

  const allFuncs = modFuncs as SynthetixQueries;

  return { context: ctx, queries: allFuncs };
}

export const SynthetixQueryContext = createContext<SynthetixQueryContextContent | null>(null);
export const SynthetixQueryContextProvider = SynthetixQueryContext.Provider;

export default function useSynthetixQueries(): SynthetixQueries {
  const ctx = useContext(SynthetixQueryContext);
  if (!ctx) {
    throw new Error('No QueryClient set, use QueryClientProvider to set one');
  }

  return ctx.queries;
}
