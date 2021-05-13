/// <reference types="../src/missing-types" />
const ethers = require('ethers');
const { synthetix } = require('../src/index.ts');

(async () => {
	const provider = ethers.providers.getDefaultProvider('kovan');
	const signer = new ethers.Wallet(
		// just a dummy kovan wallet with a little keth from the faucet
		'0xa0d951c494421559c63089093b020cf2f7aac003c916967dc36e989bc695222e'
	);
	const snxjs = synthetix({ network: 'kovan', signer, provider });

	console.log(
		'Total Issued Synths:',
		await snxjs.contracts.Synthetix.totalIssuedSynths(snxjs.toBytes32('sUSD'), {})
	);
})();
