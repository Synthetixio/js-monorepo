import { ethers } from 'ethers';
import { ExchangeEntrySettled } from '../../generated/graphql';

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
	amount: ethers.utils.formatEther(amount),
	dest,
	reclaim: ethers.utils.formatEther(reclaim),
	rebate: ethers.utils.formatEther(rebate),
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
