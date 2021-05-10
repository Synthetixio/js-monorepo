import { ethers } from 'ethers';
import { SynthExchange } from '../../generated/graphql';
import { SynthExchangeExpanded } from '../../src/types';
import { formatTimestamp, getHashFromId, hexToAscii } from '../../src/utils';

export const parseSynthExchanges = ({
	account,
	block,
	feesInUSD,
	from,
	fromAmount,
	fromAmountInUSD,
	fromCurrencyKey,
	gasPrice,
	id,
	network,
	timestamp,
	toAddress,
	toAmount,
	toAmountInUSD,
	toCurrencyKey,
}: SynthExchange): SynthExchangeExpanded => ({
	account,
	block: Number(block),
	feesInUSD: parseFloat(feesInUSD).toFixed(2),
	from,
	fromAmount,
	fromAmountInUSD: parseFloat(fromAmountInUSD).toFixed(2),
	fromCurrencyKey: hexToAscii(fromCurrencyKey),
	gasPrice,
	id,
	network,
	timestamp: formatTimestamp(timestamp),
	toAddress,
	toAmount,
	toAmountInUSD: parseFloat(toAmountInUSD).toFixed(2),
	toCurrencyKey: hexToAscii(toCurrencyKey),
    hash: getHashFromId(id),
});
