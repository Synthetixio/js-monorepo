import { ethers } from 'ethers';

import { SynthetixJS, NetworkId } from '@synthetixio/contracts-interface';

export interface SubgraphEndpoints {
	main: string;
}

export interface QueryContext {
	networkId: NetworkId | null;
	provider: ethers.providers.Provider | null;
	signer: ethers.Signer | null;
	snxjs: SynthetixJS | null;
	subgraphEndpoints: SubgraphEndpoints;
}
