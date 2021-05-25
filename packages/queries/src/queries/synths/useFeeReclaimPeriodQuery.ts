import { useQuery, UseQueryOptions } from 'react-query';
import { ethers } from 'ethers';

import { CurrencyKey } from '../../currency';
import { QueryContext } from '../../context';

const useFeeReclaimPeriodQuery = (
	ctx: QueryContext,
	currencyKey: CurrencyKey | null,
	walletAddress: string | null,
	options?: UseQueryOptions<number>
) => {
	return useQuery<number>(
		['synths', 'feeReclaimPeriod', ctx.networkId, currencyKey],
		async () => {
			const maxSecsLeftInWaitingPeriod =
				(await ctx.snxjs!.contracts.Exchanger.maxSecsLeftInWaitingPeriod(
					walletAddress,
					ethers.utils.formatBytes32String(currencyKey!)
				)) as ethers.BigNumberish;

			return Number(maxSecsLeftInWaitingPeriod);
		},
		{
			enabled: !!ctx.snxjs && currencyKey != null && !!walletAddress,
			...options,
		}
	);
};

export default useFeeReclaimPeriodQuery;
