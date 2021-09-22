import { ExchangeEntrySettled } from '../../generated/graphql';
import { formatEther } from '../../src/utils';

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
	amount: formatEther(amount),
	dest,
	reclaim: formatEther(reclaim),
	rebate: formatEther(rebate),
	srcRoundIdAtPeriodEnd,
	destRoundIdAtPeriodEnd,
	exchangeTimestamp: Number(exchangeTimestamp),
});

export const parseExchangeEntrySettledsKovan = ({
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
	amount,
	dest,
	reclaim,
	rebate,
	srcRoundIdAtPeriodEnd,
	destRoundIdAtPeriodEnd,
	exchangeTimestamp: Number(exchangeTimestamp),
});
