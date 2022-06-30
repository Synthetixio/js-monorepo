import React from 'react';
import type { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { SynthetixJS, NetworkId } from '@synthetixio/contracts-interface';

export interface SubgraphEndpoints {
	exchanges: string;
	exchanger: string;
	issuance: string;
	subgraph: string;
}

export interface QueryContext {
	networkId: NetworkId | null;
	provider: Provider | null;
	signer: Signer | null;
	snxjs: SynthetixJS | null;
	subgraphEndpoints: SubgraphEndpoints;
}

export default React.createContext<QueryContext | null>(null);
