import { ethers } from "ethers";

import type { SynthetixData } from '@synthetixio/data/build/node/src/types';
import { NetworkId } from "@synthetixio/contracts-interface";

type SynthetixJs = any;

export interface QueryContext {
    networkId: NetworkId|null;
    provider: ethers.providers.Provider|null;
    snxData: SynthetixData|null,
    snxjs: SynthetixJs|null
}