import { ethers } from 'ethers';
import { OptionTransaction as UnformattedOptionTransaction } from '../../generated/graphql';
import { OptionsTransaction } from '../../src/types';
import { formatTimestamp, getHashFromId, hexToAscii } from '../../src/utils';

export const parseBinaryOptionTransactions = ({
	id,
	timestamp,
	type,
	account,
	currencyKey,
	side,
	amount,
	market,
	fee,
}: UnformattedOptionTransaction): OptionsTransaction => ({
	hash: getHashFromId(id),
	timestamp: formatTimestamp(timestamp),
	type,
	account,
	currencyKey: currencyKey ? hexToAscii(currencyKey) : null,
	side: side === 0 ? 'long' : 'short',
	amount: ethers.utils.formatEther(amount),
	market,
	fee: fee ? ethers.utils.formatEther(fee) : null,
});
