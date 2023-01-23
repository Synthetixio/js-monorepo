#!/usr/bin/env node

const fs = require('fs');

const [networkName] = process.argv.slice(2);

const networks = JSON.parse(fs.readFileSync('./networks.json', 'utf8'));
networks[networkName].CoreProxy.address =
  require(`@synthetixio/v3-contracts/deployments/${networkName}/CoreProxy.json`).address;
// TODO: startBlock???

fs.writeFileSync('./networks.json', JSON.stringify(networks, null, 2), 'utf8');
