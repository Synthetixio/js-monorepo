import ethers from 'ethers';
import { QueryContext } from './context';

import synthetixData from '@synthetixio/data';

import { readdirSync, statSync } from 'fs';

import SynthetixJs from 'synthetix-js';

function loadQueries(ctx: QueryContext, p: string) {
    // dynamically load modules

    const queries = [];

    for(const f of readdirSync(p)) {
        const sp = p + '/' + f;
        const s = statSync(sp);

        if (s.isDirectory()) {
            queries.push(...loadQueries(ctx, sp));
        }
        else {
            queries.push(require(sp))
        }
    }
}

export default async function synthetixQueries({ provider }: { provider: ethers.providers.Provider }) {

    const network = await provider.getNetwork();

    const ctx: QueryContext = {
        provider,
        network: network.name,
        snxData: synthetixData(network),
        snxjs: new SynthetixJs({
            provider,
            network
        })
    };

    return loadQueries(ctx, __dirname + '/' + 'queries');
}