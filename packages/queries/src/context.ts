import { ethers } from "ethers";

import { SynthetixData } from '@synthetixio/data';

export interface QueryContext {
    network: string;
    provider: ethers.providers.Provider;
    snxData: SynthetixData,
    snxjs: SynthetixJs
}