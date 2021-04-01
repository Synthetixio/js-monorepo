import { ethers } from 'ethers';

import { RevertReasonParams } from './types';

const isKovan = (networkId: number): boolean => networkId === 42;

const getRevertReason = async ({
	txHash,
	networkId,
	blockNumber,
	provider,
}: RevertReasonParams): Promise<string> => {
	// Since we are using Infura, we cannot decode Kovan revert reasons
	if (isKovan(networkId)) return 'Unable to decode revert reason';
	await validateInputPreProvider(txHash);

	await validateInputPostProvider({ txHash, networkId, blockNumber, provider });

	try {
		const tx = await provider.getTransaction(txHash);
		const code = await provider.call(tx, blockNumber);
		return decodeMessage(code);
	} catch (err) {
		return 'Unable to decode revert reason';
	}
};

const validateInputPreProvider = (txHash: string) => {
	if (!/^0x([A-Fa-f0-9]{64})$/.test(txHash) || txHash.substring(0, 2) !== '0x') {
		throw new Error('Invalid transaction hash');
	}
};

async function validateInputPostProvider({ blockNumber, provider }: RevertReasonParams) {
	if (typeof blockNumber === 'number') {
		const currentBlockNumber = await provider.getBlockNumber();
		blockNumber = Number(blockNumber);

		if (blockNumber > currentBlockNumber) {
			throw new Error('You cannot use a block number that has not yet happened.');
		}

		// A block older than 128 blocks needs access to an archive node
		if (blockNumber < currentBlockNumber - 128)
			throw new Error(
				'You cannot use a block number that is older than 128 blocks. Please use a provider that uses a full archival node.'
			);
	}
}

function decodeMessage(code: string) {
	let codeString = `0x${code.substr(138)}`.replace(/0+$/, '');

	// If the codeString is an odd number of characters, add a trailing 0
	if (codeString.length % 2 === 1) {
		codeString += '0';
	}

	return ethers.utils.toUtf8String(codeString);
}

export default getRevertReason;
