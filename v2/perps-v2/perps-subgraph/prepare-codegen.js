const fs = require('fs');
const prettier = require('prettier');
const prettierOptions = JSON.parse(fs.readFileSync('../../../.prettierrc', 'utf8'));

const futuresMarketJSON = JSON.parse(
  fs.readFileSync('../../contracts/src/mainnet-ovm/deployment/json/FuturesMarketETH.json', 'utf-8')
);
const perpsV2DelayedOrderETHPERP = JSON.parse(
  fs.readFileSync(
    '../../contracts/src/mainnet-ovm/deployment/json/PerpsV2DelayedOrderETHPERP.json',
    'utf-8'
  )
);
const futuresMarket = JSON.parse(
  fs.readFileSync(
    '../../contracts/src/mainnet-ovm/deployment/json/FuturesMarketManager.json',
    'utf-8'
  )
);

if (!fs.existsSync('./abis')) {
  fs.mkdirSync('./abis');
}
fs.writeFileSync(
  './abis/PerpsV2Proxy.json',
  prettier.format(
    JSON.stringify(
      futuresMarketJSON.concat(...perpsV2DelayedOrderETHPERP).concat(...futuresMarket)
    ),
    {
      parser: 'json',
      ...prettierOptions,
    }
  ),
  'utf-8'
);
