import { DailyTotal } from '../../generated/graphql';
import { ExchangeTotals } from '../../src/types';
import { formatEther } from '../../src/utils';

export const parseExchangeTotals = ({
	id,
	trades,
	exchangers,
	exchangeUSDTally,
	totalFeesGeneratedInUSD,
}: DailyTotal): ExchangeTotals => ({
	id: Number(id),
	trades: Number(trades),
	exchangers: Number(exchangers),
	exchangeUSDTally: Number(formatEther(exchangeUSDTally)),
	totalFeesGeneratedInUSD: Number(formatEther(totalFeesGeneratedInUSD)),
});
