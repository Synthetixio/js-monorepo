import { useQuery, UseQueryOptions } from 'react-query';
import { ethers } from 'ethers';

import { CurrencyKey } from '../../currency';
import { QueryContext } from '../../context';
import { SynthSuspended, SynthSuspensionReason } from '../../types';

/*
	Suspension Reasons:

	1: "System Upgrade"
	2: "Market Closure"
	3: "Circuit Breaker"
	55: "Circuit Breaker (Phase one)"
	65: "Decentralized Circuit Breaker (Phase two)"
	99999: "Emergency"
*/

const getReasonFromCode = (reasonCode: number): SynthSuspensionReason => {
	switch (reasonCode) {
		case 1:
			return 'system-upgrade';
		case 2:
			return 'market-closure';
		case 3:
		case 55:
		case 65:
			return 'circuit-breaker';
		case 99999:
			return 'emergency';
		default:
			return 'market-closure';
	}
};

const useSynthSuspensionQuery = (
	ctx: QueryContext,
	currencyKey: CurrencyKey | null,
	options?: UseQueryOptions<SynthSuspended>
) => {
	return useQuery<SynthSuspended>(
		['synth', 'suspension', ctx.networkId, currencyKey],
		async () => {
			const [
				isSuspended,
				reason,
			] = (await ctx.snxjs!.contracts.SystemStatus.synthExchangeSuspension(
				ethers.utils.formatBytes32String(currencyKey!)
			)) as [boolean, ethers.BigNumber];

			const reasonCode = Number(reason);
			return {
				isSuspended,
				reasonCode,
				reason: isSuspended ? getReasonFromCode(reasonCode) : null,
			};
		},
		{
			enabled: !!ctx.snxjs && currencyKey != null,
			...options,
		}
	);
};

export default useSynthSuspensionQuery;
