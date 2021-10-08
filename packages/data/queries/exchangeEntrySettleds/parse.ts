import { ExchangeEntrySettled } from '../../generated/graphql';
import { formatTimestamp } from '../../src/utils';

export const parseExchangeEntrySettleds = ({
	id,
	from,
	src,
	amount,
	dest,
	reclaim,
	rebate,
	srcRoundIdAtPeriodEnd,
	destRoundIdAtPeriodEnd,
	exchangeTimestamp,
}: ExchangeEntrySettled): ExchangeEntrySettled => ({
	id,
	from,
	src,
	amount: Number(amount),
	dest,
	reclaim: Number(reclaim),
	rebate: Number(rebate),
	srcRoundIdAtPeriodEnd,
	destRoundIdAtPeriodEnd,
	exchangeTimestamp: formatTimestamp(exchangeTimestamp),
});
