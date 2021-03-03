/// <reference types="../src/missing-types" />
const { synthetix } = require('../src/index.ts');

(async () => {
	// this instance exposes props for the given network: synths, sources, targets, users, as well as helper function toBytes32 - as per synthetix: https://github.com/Synthetixio/synthetix/blob/develop/index.js#L199.
	const snxjs = synthetix({ network: 'mainnet' });

	const { formatEther } = snxjs.utils;

	const synths = snxjs.synths.map(({ name }) => name);
	const fromBlock = 10260987;
	const blockOptions = fromBlock ? { blockTag: Number(fromBlock) } : {};

	let totalInUSD = 0;

	const unformattedSnxPrice = await snxjs.contracts.ExchangeRates.rateForCurrency(
		snxjs.toBytes32('SNX'),
		blockOptions
	); // note blockOptions must be passed to `ethers.Contract` as the final parameter (and fails if no archive node)
	const snxPrice = formatEther(unformattedSnxPrice);
	console.log('snxPrice', snxPrice);
	synths.map(async (synth, index) => {
		const totalAmount = await snxjs.contracts[`Synth${synth}`].totalSupply(blockOptions);

		const totalSupply = formatEther(totalAmount);
		console.log('synth', synth);
		console.log('totalSupply', totalSupply);
		const rateForSynth = formatEther(
			await snxjs.contracts.ExchangeRates.rateForCurrency(snxjs.toBytes32(synth), blockOptions)
		);
		const totalSupplyInUSD = rateForSynth * totalSupply;
		totalInUSD += totalSupplyInUSD;
		if (index === synths.length - 1) {
			console.log('totalInUSD', totalInUSD);
		}

		const rateIsFrozen = await snxjs.contracts.ExchangeRates.rateIsFrozen(
			snxjs.toBytes32(synth),
			blockOptions
		);

		return { synth, totalAmount, totalSupply, rateForSynth, totalSupplyInUSD, rateIsFrozen };
	});
})().catch((e) => {
	console.log('error', e);
});
