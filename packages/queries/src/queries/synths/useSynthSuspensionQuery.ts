import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { formatBytes32String } from '@ethersproject/strings';
import { BigNumber } from '@ethersproject/bignumber';

import { CurrencyKey } from '@synthetixio/contracts-interface';
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
      if (!ctx.snxjs) {
        // This should never happen since the query is not enabled when ctx.snxjs is undefined
        throw Error('ctx.snxjs is undefined');
      }
      const [isSuspended, reason] = (await ctx.snxjs.contracts.SystemStatus.synthExchangeSuspension(
        formatBytes32String(currencyKey!)
      )) as [boolean, BigNumber];

      const reasonCode = Number(reason);
      return {
        isSuspended,
        reasonCode,
        reason: isSuspended ? getReasonFromCode(reasonCode) : null,
      };
    },
    {
      enabled: !!ctx.snxjs && currencyKey !== null,
      ...options,
    }
  );
};

export default useSynthSuspensionQuery;
