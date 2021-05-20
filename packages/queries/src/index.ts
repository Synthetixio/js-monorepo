import ethers from 'ethers';
import { QueryContext } from './context';

import { NetworkId } from '@synthetixio/contracts-interface';
import synthetixData from '@synthetixio/data';

//import { readdirSync, statSync } from 'fs';

import SynthetixJs from 'synthetix-js';
import { UseQueryResult } from 'react-query';

type UseQueryFunction = (ctx: QueryContext, ...args: any) => UseQueryResult;

// would like to use this function, but temp disabling for tests
/*function loadQueries(ctx: QueryContext, p: string): UseQueryFunction[] {
    // dynamically load modules

    const queries = [];

    for(const f of readdirSync(p)) {
        const sp = p + '/' + f;
        const s = statSync(sp);

        if (s.isDirectory()) {
            queries.push(...loadQueries(ctx, sp));
        }
        else if(f.endsWith('.js')) {
            queries.push(require(sp))
        }
    }

    return queries;
}*/

import useEthGasPriceQuery from './queries/network/useEthGasPriceQuery';
import useExchangeRatesQuery from './queries/rates/useExchangeRatesQuery';
import useHistoricalRatesQuery from './queries/rates/useHistoricalRatesQuery';
import useHistoricalVolumeQuery from './queries/rates/useHistoricalVolumeQuery';
import useSynthExchangesSinceQuery from './queries/rates/useSynthExchangesSinceQuery';
import useSynthMarketCapQuery from './queries/rates/useSynthMarketCapQuery';
import useExchangeFeeRateQuery from './queries/synths/useExchangeFeeRate';
import useFeeReclaimPeriodQuery from './queries/synths/useFeeReclaimPeriodQuery';
import useFrozenSynthsQuery from './queries/synths/useFrozenSynthsQuery';
import useSynthSuspensionQuery from './queries/synths/useSynthSuspensionQuery';
import useIsSystemOnMaintenance from './queries/systemStatus/useIsSystemOnMaintenance';
import useETHBalanceQuery from './queries/walletBalances/useETHBalanceQuery';
import useSynthsBalancesQuery from './queries/walletBalances/useSynthsBalancesQuery';
import useTokensBalancesQuery from './queries/walletBalances/useTokensBalancesQuery';
import _ from 'lodash';

const FUNCS = {
    useEthGasPriceQuery,
    useExchangeRatesQuery,
    useHistoricalRatesQuery,
    useHistoricalVolumeQuery,
    useSynthExchangesSinceQuery,
    useSynthMarketCapQuery,
    useExchangeFeeRateQuery,
    useFeeReclaimPeriodQuery,
    useFrozenSynthsQuery,
    useSynthSuspensionQuery,
    useIsSystemOnMaintenance,
    useETHBalanceQuery,
    useSynthsBalancesQuery,
    useTokensBalancesQuery
};

type RawSynthetixQueries = typeof FUNCS;

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

export type SynthetixQueries = {
    [Property in keyof RawSynthetixQueries]: OmitFirstArg<RawSynthetixQueries[Property]>;
};

export default function useSynthetixQueries({ networkId, provider }: { networkId: NetworkId|null, provider: ethers.providers.Provider|null }): SynthetixQueries {

    const ctx: QueryContext = {
        networkId,
        provider,
        snxData: networkId && synthetixData({ networkId }),
        snxjs: networkId && new SynthetixJs({
            provider,
            networkId
        })
    };

    const modFuncs: {[i: string]: Function } = _.clone(FUNCS);

    for(const f in modFuncs) {
        modFuncs[f] = _.partial(modFuncs[f] as UseQueryFunction, ctx);
    }

    return modFuncs as SynthetixQueries;
}