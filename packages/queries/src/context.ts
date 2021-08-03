import { ethers } from 'ethers';

import type { SynthetixData } from '@synthetixio/data';
import { SynthetixJS, NetworkId } from '@synthetixio/contracts-interface';

export interface QueryContext {
	networkId: NetworkId | null;
	provider: ethers.providers.Provider | null;
	snxData: SynthetixData | null;
	snxjs: SynthetixJS | null;
}
