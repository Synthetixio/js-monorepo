import { DailyTotal } from '../../generated/graphql';
import { ExchangeTotals } from '../../src/types';

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
	exchangeUSDTally: Number(exchangeUSDTally),
	totalFeesGeneratedInUSD: Number(totalFeesGeneratedInUSD),
});
