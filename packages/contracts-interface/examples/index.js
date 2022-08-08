/* eslint-disable no-console */

const { synthetix } = require('../src');
const ethers = require('ethers');

async function synths() {
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
  return await Promise.all(
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

      //		const rateIsFrozen = await snxjs.contracts.ExchangeRates.rateIsFrozen(
      //			snxjs.toBytes32(synth),
      //			blockOptions
      //		);
      const rateIsFrozen = 'NOT SUPPORTED';

      return { synth, totalAmount, totalSupply, rateForSynth, totalSupplyInUSD, rateIsFrozen };
    })
  );
}

async function signer() {
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
}

async function run() {
  console.log(await synths());
  await signer();
}

run();
