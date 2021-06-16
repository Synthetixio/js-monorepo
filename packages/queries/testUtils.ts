import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { QueryContext } from './src/context';

import { NetworkId, SynthetixJS } from '@synthetixio/contracts-interface';
import { ethers } from 'ethers';
import { SynthetixData } from '@synthetixio/data/build/node/src/types';

// simple query client wrapper which allows for testing of a
// query function hook, see https://react-query.tanstack.com/guides/testing
export function getWrapper(config?: any) {
	return ({ children }: { children: ReactNode[] }) =>
		QueryClientProvider({ client: new QueryClient(config), children });
}

// builds an incomplete query context which should generally pass
// blanket `enabled` sections. just mock the functions/data you need
export function getFakeQueryContext(): QueryContext {
	return {
		networkId: NetworkId.Mainnet,
		provider: {} as ethers.providers.Provider,
		snxData: {} as SynthetixData,
		snxjs: {} as SynthetixJS,
	};
}
