import { ethers } from "ethers";

import type { SynthetixData } from '@synthetixio/data/build/node/src/types';

type SynthetixJs = any;

export interface QueryContext {
    network: string;
    provider: ethers.providers.Provider;
    snxData: SynthetixData,
    snxjs: SynthetixJs
}