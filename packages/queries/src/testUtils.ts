import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { QueryContext } from './context';

import { NetworkIdByName, SynthetixJS, NetworkId } from '@synthetixio/contracts-interface';
import { Provider } from '@ethersproject/providers';
import { Signer } from '@ethersproject/abstract-signer';

// simple query client wrapper which allows for testing of a
// query function hook, see https://react-query.tanstack.com/guides/testing
export function getWrapper(config?: any) {
  return ({ children }: { children: ReactNode[] }) =>
    React.createElement(QueryClientProvider, { client: new QueryClient(config) }, children);
}

// builds an incomplete query context which should generally pass
// blanket `enabled` sections. just mock the functions/data you need
export function getFakeQueryContext(networkId: NetworkId = NetworkIdByName.mainnet): QueryContext {
  return {
    networkId,
    subgraphEndpoints: { exchanger: '', issuance: '', exchanges: '', subgraph: '' },
    signer: {} as Signer,
    provider: {} as Provider,
    snxjs: {} as SynthetixJS,
  };
}
