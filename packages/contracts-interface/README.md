# Synthetix JS

### The official Javascript library for interacting with Synthetix protocol contracts.

This library can be used in 2 different environments:

1. Common-js module for node environments
2. UMD module for browser environments

#### Installation

```

// For node environments:
const { synthetix } = require('@synthetixio/contracts-interface');

// For single page applications:
import { synthetix } from '@synthetixio/contracts-interface';

// For browser environments:
// after running npm build take the index.browser.js file and put it in a script tag
// then you can access synthetix on the window object:
const { synthetix } = window;


const snxjs = synthetix({ network: 'mainnet' });


// Note for typescript applications:
import { synthetix, Network } from '@synthetixio/contracts-interface';
const snxjs = synthetix({ network: Network.Mainnet });
```

#### Usage

```
// this instance exposes props for the given network: synths, sources, targets, users, etc... as well as helper function toBytes32 - as per synthetix: https://github.com/Synthetixio/synthetix/blob/develop/index.js#L199.
const snxjs = synthetix({ network: 'mainnet' });

// If you want to interact with a contract, simply follow the convention:
// await snxjs[contractName].methodName(arguments)
// many arguments require being formatted toBytes32, which we also provide with the library
// Note can optionally pass in a { blockTag: someBlockNumber } to get data from a specific block instead of {}
E.g:
const unformattedSnxPrice = await snxjs.contracts.ExchangeRates.rateForCurrency(snxjs.toBytes32('SNX'), {});
const unformattedTotalSupply = await snxjs.contracts.SynthsUSD.totalSupply({});

// We also expose ethers utils which provides handy methods for formatting responses to queries.
const { formatEther } = snxjs.utils;

const snxPrice = formatEther(unformattedSnxPrice);
const totalSupply = formatEther(unformattedTotalSupply);

```

See the examples folder for more usage details
