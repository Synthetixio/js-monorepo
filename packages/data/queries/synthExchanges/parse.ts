import { ethers } from 'ethers';
import { SynthExchange } from '../../generated/graphql';
import { formatTimestamp, hexToAscii } from '../../src/utils';

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
}: SynthExchange): SynthExchange => ({
	account,
	block: Number(block),
	feesInUSD: ethers.utils.formatEther(feesInUSD),
	from,
	fromAmount: ethers.utils.formatEther(fromAmount),
	fromAmountInUSD: ethers.utils.formatEther(fromAmountInUSD),
	fromCurrencyKey: hexToAscii(fromCurrencyKey),
	gasPrice,
	id,
	network,
	timestamp: formatTimestamp(timestamp),
	toAddress,
	toAmount: ethers.utils.formatEther(toAmount),
	toAmountInUSD: ethers.utils.formatEther(toAmountInUSD),
	toCurrencyKey: hexToAscii(toCurrencyKey),
});
