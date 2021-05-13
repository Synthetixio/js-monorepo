/// <reference types="../src/missing-types" />
const ethers = require('ethers');
const { synthetix } = require('../src/index.ts');

(async () => {
	const provider = ethers.providers.getDefaultProvider('kovan');
	const signer = new ethers.Wallet(
		// just a dummy kovan wallet with a little keth from the faucet
		'0xa0d951c494421559c63089093b020cf2f7aac003c916967dc36e989bc695222e',
		provider
	);
	const snxjs = synthetix({ network: 'kovan', signer, provider });
	const { formatEther, parseEther, parseUnits } = snxjs.utils;

	console.log(
		'Remaining ETH capacity in the EtherWrapper (kovan):',
		formatEther(await snxjs.contracts.EtherWrapper.capacity())
	);

	console.log('Engaging the native ether wrapper to mint sETH');
	const response = await snxjs.contracts.NativeEtherWrapper.mint({
		value: parseEther('0.01'),
		gasPrice: parseUnits('2', 'gwei'),
		gasLimit: 500e3,
	});
	console.log('Submitted', response.hash);
	await response.wait();
	console.log('Mined', `https://kovan.etherscan.io/tx/${response.hash}`);
})();
