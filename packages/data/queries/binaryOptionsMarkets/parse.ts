import { Market as UnformattedOptionMarket } from '../../generated/graphql';
import { OptionsMarket } from '../../src/types';
import { formatTimestamp, hexToAscii, formatEther } from '../../src/utils';

export const parseBinaryOptionsMarkets = ({
	id,
	timestamp,
	creator,
	currencyKey,
	strikePrice,
	biddingEndDate,
	maturityDate,
	expiryDate,
	isOpen,
	longPrice,
	shortPrice,
	poolSize,
	result,
}: UnformattedOptionMarket): OptionsMarket => ({
	address: id,
	timestamp: formatTimestamp(timestamp),
	creator,
	currencyKey: hexToAscii(currencyKey),
	strikePrice: formatEther(strikePrice),
	biddingEndDate: formatTimestamp(biddingEndDate),
	maturityDate: formatTimestamp(maturityDate),
	expiryDate: formatTimestamp(expiryDate),
	isOpen,
	longPrice: formatEther(longPrice),
	shortPrice: formatEther(shortPrice),
	poolSize: formatEther(poolSize),
	result: result !== null ? (result === 0 ? 'long' : 'short') : null,
});
