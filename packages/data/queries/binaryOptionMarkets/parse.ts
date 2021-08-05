import { ethers } from 'ethers';
import { Market as OptionMarket } from '../../generated/graphql';
import { FormattedOptionsMarket } from '../../src/types';
import { formatTimestamp, hexToAscii } from '../../src/utils';

export const parseBinaryOptionMarkets = ({
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
}: OptionMarket): FormattedOptionsMarket => ({
	address: id,
	timestamp: formatTimestamp(timestamp),
	creator,
	currencyKey: hexToAscii(currencyKey),
	strikePrice: ethers.utils.formatEther(strikePrice),
	biddingEndDate: formatTimestamp(biddingEndDate),
	maturityDate: formatTimestamp(maturityDate),
	expiryDate: formatTimestamp(expiryDate),
	isOpen,
	longPrice: ethers.utils.formatEther(longPrice),
	shortPrice: ethers.utils.formatEther(shortPrice),
	poolSize: ethers.utils.formatEther(poolSize),
	result: result !== null ? (result === 0 ? 'long' : 'short') : null,
});
