import { ethers } from 'ethers';

import { RevertReasonParams, GetCodeParams } from './types';

const isKovan = (networkId: number): boolean => networkId === 42;

const getRevertReason = async ({
	txHash,
	networkId,
	blockNumber,
	provider,
}: RevertReasonParams): Promise<string> => {
	await validateInputPreProvider(txHash);

	await validateInputPostProvider({ txHash, networkId, blockNumber, provider });

	try {
		const tx = await provider.getTransaction(txHash);
		console.log('heeeere', tx);
		const code = await getCode({ tx, networkId, blockNumber, provider });
		return decodeMessage(code, networkId);
	} catch (err) {
		throw new Error('Unable to decode revert reason.');
	}
};

const validateInputPreProvider = (txHash: string) => {
	if (!/^0x([A-Fa-f0-9]{64})$/.test(txHash) || txHash.substring(0, 2) !== '0x') {
		throw new Error('Invalid transaction hash');
	}
};

async function validateInputPostProvider({
	txHash,
	networkId,
	blockNumber,
	provider,
}: RevertReasonParams) {
	if (isKovan(networkId)) {
		try {
			const tx = await provider.getTransaction(txHash);
			getCode({ tx, networkId, blockNumber, provider });
		} catch (err) {
			throw new Error(
				'Please use a provider that exposes the Parity trace methods to decode the revert reason.'
			);
		}
	}

	if (typeof blockNumber === 'number') {
		const currentBlockNumber = await provider.getBlockNumber();
		blockNumber = Number(blockNumber);

		if (blockNumber >= currentBlockNumber) {
			throw new Error('You cannot use a block number that has not yet happened.');
		}

		// A block older than 128 blocks needs access to an archive node
		if (blockNumber < currentBlockNumber - 128)
			throw new Error(
				'You cannot use a block number that is older than 128 blocks. Please use a provider that uses a full archival node.'
			);
	}
}

function decodeMessage(code: string, networkId: number) {
	// NOTE: `code` may end with 0's which will return a text string with empty whitespace characters
	// This will truncate all 0s and set up the hex string as expected
	// NOTE: Parity (Kovan) returns in a different format than other clients
	let codeString;
	const fnSelectorByteLength = 4;
	const dataOffsetByteLength = 32;
	const strLengthByteLength = 32;
	const strLengthStartPos = 2 + (fnSelectorByteLength + dataOffsetByteLength) * 2;
	const strDataStartPos =
		2 + (fnSelectorByteLength + dataOffsetByteLength + strLengthByteLength) * 2;

	//eslint-disable-next-line
	console.log('heeeeere', isKovan(networkId), networkId);
	if (isKovan(networkId)) {
		const strLengthHex = code.slice(strLengthStartPos).slice(0, strLengthByteLength * 2);
		const strLengthInt = parseInt(`0x${strLengthHex}`, 16);
		const strDataEndPos = strDataStartPos + strLengthInt * 2;
		if (codeString === '0x') return '';
		codeString = `0x${code.slice(strDataStartPos, strDataEndPos)}`;
	} else {
		codeString = `0x${code.substr(138)}`.replace(/0+$/, '');
	}

	// If the codeString is an odd number of characters, add a trailing 0
	if (codeString.length % 2 === 1) {
		codeString += '0';
	}

	return ethers.utils.toUtf8String(codeString);
}

async function getCode({ tx, networkId, blockNumber, provider }: GetCodeParams) {
	console.log('he sdlfkj sf', networkId, isKovan(networkId));
	if (isKovan(networkId)) {
		try {
			return await provider.call(tx, blockNumber);
		} catch (err) {
			console.log('EERORRRRRR', err);
			return JSON.parse(err.responseText).error.data.substr(9);
		}
	} else {
		return provider.call(tx, blockNumber);
	}
}
export default getRevertReason;
