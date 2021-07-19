import ethers from 'ethers';
import { QueryContext } from './context';

import { synthetix, NetworkId } from '@synthetixio/contracts-interface';
import synthetixData from '@synthetixio/data';

import { UseQueryResult } from 'react-query';

export * from './types';

// all functions exported by submodules must follow this format
type UseQueryFunction = (ctx: QueryContext, ...args: any) => UseQueryResult;

// if there is any way, in the future, to not have to do these imports, that would be great. but typescript probably necessitates it
import useEthGasPriceQuery from './queries/network/useEthGasPriceQuery';
import useExchangeRatesQuery from './queries/rates/useExchangeRatesQuery';
import useHistoricalRatesQuery from './queries/rates/useHistoricalRatesQuery';
import useHistoricalVolumeQuery from './queries/rates/useHistoricalVolumeQuery';
import useSNX24hrPricesQuery from './queries/rates/useSNX24hrPricesQuery';
import useSynthExchangesSinceQuery from './queries/rates/useSynthExchangesSinceQuery';
import useSynthMarketCapQuery from './queries/rates/useSynthMarketCapQuery';
import useExchangeFeeRateQuery from './queries/synths/useExchangeFeeRate';
import useFeeReclaimPeriodQuery from './queries/synths/useFeeReclaimPeriodQuery';
import useFrozenSynthsQuery from './queries/synths/useFrozenSynthsQuery';
import useSynthsTotalSupplyQuery from './queries/synths/useSynthsTotalSupplyQuery';
import useSynthSuspensionQuery from './queries/synths/useSynthSuspensionQuery';
import useTotalIssuedSynthsExcludingEtherQuery from './queries/synths/useTotalIssuedSynthsExcludingEtherQuery';
import useIsSystemOnMaintenance from './queries/systemStatus/useIsSystemOnMaintenance';
import useETHBalanceQuery from './queries/walletBalances/useETHBalanceQuery';
import useSynthsBalancesQuery from './queries/walletBalances/useSynthsBalancesQuery';
import useTokensBalancesQuery from './queries/walletBalances/useTokensBalancesQuery';
import _ from 'lodash';
import React from 'react';

const FUNCS = {
	useEthGasPriceQuery,
	useExchangeRatesQuery,
	useHistoricalRatesQuery,
	useHistoricalVolumeQuery,
	useSNX24hrPricesQuery,
	useSynthExchangesSinceQuery,
	useSynthMarketCapQuery,
	useExchangeFeeRateQuery,
	useFeeReclaimPeriodQuery,
	useFrozenSynthsQuery,
	useSynthsTotalSupplyQuery,
	useSynthSuspensionQuery,
	useTotalIssuedSynthsExcludingEtherQuery,
	useIsSystemOnMaintenance,
	useETHBalanceQuery,
	useSynthsBalancesQuery,
	useTokensBalancesQuery,
};

// compute the type of this library so that typescript can do full analysis of arguments and available functions
type RawSynthetixQueries = typeof FUNCS;
type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;
export type SynthetixQueries = {
	[Property in keyof RawSynthetixQueries]: OmitFirstArg<RawSynthetixQueries[Property]>;
};

export function createQueryContext({
	networkId,
	provider,
	signer,
}: {
	networkId: NetworkId | null;
	provider: ethers.providers.Provider | null;
	signer: ethers.Signer | null;
}): QueryContext {
	const ctx: QueryContext = {
		networkId,
		provider,
		snxData: null,
		snxjs: null,
	};

	ctx.snxjs = synthetix({ networkId, provider, signer });

	// snag the resultant provider from snxjs
	ctx.provider = ctx.snxjs.contracts.Synthetix.provider;

	ctx.snxData = synthetixData({ networkId });
	ctx.updateQueryContext = ({
		updateNetworkId,
		updateProvider,
		updateSigner,
	}: {
		updateNetworkId: NetworkId | null;
		updateProvider: ethers.providers.Provider | null;
		updateSigner: ethers.Signer | null;
	}) => {
		ctx.snxjs = synthetix({
			networkId: updateNetworkId,
			provider: updateProvider,
			signer: updateSigner,
		});

		// snag the resultant provider from snxjs
		ctx.provider = ctx.snxjs.contracts.Synthetix.provider;

		ctx.snxData = synthetixData({ networkId: updateNetworkId });
	};

	return ctx;
}

export const SynthetixQueryContext = React.createContext<QueryContext | null>(null);

export default function useSynthetixQueries(): SynthetixQueries {
	const ctx = React.useContext(SynthetixQueryContext);
	if (!ctx) {
		throw new Error('No QueryClient set, use QueryClientProvider to set one');
	}

	const modFuncs: { [i: string]: any } = _.clone(FUNCS);

	for (const f in modFuncs) {
		modFuncs[f] = _.partial(modFuncs[f] as UseQueryFunction, ctx);
	}

	return modFuncs as SynthetixQueries;
}
